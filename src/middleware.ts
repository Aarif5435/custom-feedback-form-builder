import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from 'jose';

interface JwtPayload {
    userId: string; 
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);



export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userIdMatch = pathname;
  if (pathname === '/login') {
    return NextResponse.next();
  }
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === '/login' || pathname === '/signup' || pathname === "/faq" || pathname === "/pricing" || pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return NextResponse.next(); 
  }

  if (userIdMatch) {
    
    // const token = localStorage.getItem('accessTokenFD')
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      const { payload } = await jwtVerify(token, secret);

      const userIdFromUrl = userIdMatch[1];
      const userIdFromToken = payload.userId;

      console.log('User ID from Token:', userIdFromToken);

      if (userIdFromUrl !== String(userIdFromToken)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.log("JWT verification failed", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: '/:userId/:path*',
};