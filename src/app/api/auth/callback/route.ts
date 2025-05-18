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
    httpOnly: true,  // Melhor prática: true para segurança
    secure: true,    // true para HTTPS
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return NextResponse.json(
    { message: 'Token set successfully', redirectUrl },
    { status: 200 }
  );
}

  
//   return NextResponse.json(
//     { message: 'Token set successfully' },
//     {
//       status: 200,
//       headers: {
//         'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
//       }} )
// }
