import { NextRequest } from "next/server"
import { jwtVerify, decodeJwt } from "jose"
import { parse, serialize } from "cookie"

const JWT_SECRET = process.env.JWT_SECRET!
import { SessionUser } from "@/type/type"

export async function sessionStore({req,tokenCookie}:{req?: NextRequest | undefined, tokenCookie?: string}): Promise<SessionUser | null> {
  const cookies = parse(req?.headers.get('cookie') || "")
  const token = cookies.token ||tokenCookie;
  if (!token) return null

  try {
    const decodedToken = decodeJwt(token ) as { exp: number }
    const currentTime = Math.floor(Date.now() / 1000)

    if (decodedToken.exp < currentTime) {
      console.log("TOKEN IS EXPIRED.")
      return null
    }
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload.user as SessionUser
  } catch (err) {
    console.error("TOKEN IS INVALID OR EXPIRED:", err)
    return null
  }
}
