import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'TOKEN is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const redirectUrl = process.env.WEB ? `${process.env.WEB}/chat` : '/';
  const response = NextResponse.redirect(redirectUrl);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
  };

  const cookieNeo = serialize('neo_', 'neo_', cookieOptions);
  const cookieToken = serialize('token', token, cookieOptions);
  response.headers.set('Set-Cookie', [cookieNeo, cookieToken].join(', '));

  return response;
}
