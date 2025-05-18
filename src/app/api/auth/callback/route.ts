import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'TOKEN is required' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    httpOnly: false, // ⚠️ Agora o cookie é visível em document.cooki
    sameSite: 'lax',
  });

  return response;
}
