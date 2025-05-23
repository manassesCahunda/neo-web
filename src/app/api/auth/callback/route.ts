import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'TOKEN is required' }, { status: 400 });
  }

  const redirectUrl = process.env.WEB
    ? `${process.env.WEB}/chat`
    : new URL('/chat', req.url).toString();

  const cookieStore = cookies();

  console.log(`Token length: ${token.length}`);

  cookieStore.set('token', token, {
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
  

 return NextResponse.redirect(redirectUrl, 302);
}
