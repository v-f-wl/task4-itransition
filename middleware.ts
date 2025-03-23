import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }
  return NextResponse.next()
}


export const config = {
  matcher: ["/"],
}
