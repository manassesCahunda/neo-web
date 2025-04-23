import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'TOKEN is required' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const response = NextResponse.redirect(`${process.env.WEB}/chat`);
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };

  response.headers.set('Set-Cookie', serialize('neo_', 'neo_', cookieOptions));
  response.headers.append('Set-Cookie', serialize('token', token, cookieOptions));

  return response;
}
