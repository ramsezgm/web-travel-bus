import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect('/auth');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user.roles.includes('ADMINISTRADOR')) {
      return NextResponse.redirect('/auth');
    }
  } catch (error) {
    return NextResponse.redirect('/auth');
  }

  return NextResponse.next();
}
