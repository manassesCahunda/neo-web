import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'TOKEN is required' }, { status: 400 });
  }

  const redirectUrl = process.env.WEB ? `${process.env.WEB}/chat` : '/';

  const response = NextResponse.redirect(redirectUrl);
  
  response.cookies.set({
    name: 'token',
    value: token,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: 'lax',
  });

  return response;
}
