import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname.startsWith('/dashboard')) {
      url.pathname = '/auth';
      return NextResponse.redirect(url);
    }
  } else {
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Reemplaza con tu clave secreta
      if (!decoded.roles.includes('ADMINISTRADOR')) {
        url.pathname = '/auth';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      url.pathname = '/auth';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
