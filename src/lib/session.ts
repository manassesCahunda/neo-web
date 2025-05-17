import { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";
import { parse } from "cookie";
import { SessionUser } from "@/type/type";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function sessionStore({
  req,
  tokenCookie,
}: {
  req?: NextRequest;
  tokenCookie?: string;
}): Promise<SessionUser | null> {
  try {
    const cookies = parse(req?.headers.get("cookie") || "");
    const token = tokenCookie || cookies.token;


    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      console.warn("Token ausente ou malformado.");
      return null;
    }


    const decodedToken = decodeJwt(token) as { exp?: number };
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decodedToken.exp || decodedToken.exp < currentTime) {
      console.warn("Token expirado.");
      return null;
    }

  
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

    if (!payload.user) {
      console.warn("Token sem payload de usuário.");
      return null;
    }

    return payload.user as SessionUser;
  } catch (err) {
    if (err) {
      console.error("TOKEN IS INVALID:", err?.message);
    } else {
      console.error("Erro ao verificar token:", err);
    }
    return null;
  }
}
