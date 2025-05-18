import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionStore } from "@/lib/session";
import { select } from "@/action/user/select";

export async function middleware(req: NextRequest) {
  const session = await sessionStore({req}); 
  const publicRoutes = ['/login'];
  // const result = await select();
  // if (!session && !publicRoutes.includes(req.nextUrl.pathname))  return NextResponse.redirect(new URL("/login", req.url));
  // if (session) {
  //   if(publicRoutes.includes(req.nextUrl.pathname)) return NextResponse.redirect(new URL("/", req.url));
  //   if(result?.message?.prompt?.trim() === '' &&  req.nextUrl.pathname !== '/form' ) return NextResponse.redirect(new URL("/form", req.url)); 
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
