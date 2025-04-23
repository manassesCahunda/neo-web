'use server';

import { cookies } from 'next/headers';
import Axios from 'axios';
import { sessionStore } from '@/lib/session';

export async function select() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  const token = tokenCookie?.value;

  if (!token) return;

  const user = await sessionStore({ tokenCookie: token });
  const userId = user?.id;

  try {
    const response = await Axios.get(`${process.env.URL_SERVER}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true, message: response.data.data };

  } catch (error: any) {
    console.error(error.message);

    if (error.response) {
      console.error('Detalhes da resposta:', error.response.data);
        cookieStore.delete('token');
        console.log('Token removido devido a falha de autenticação');
      }
    }

    return { success: false, message: "USER NOT FOUND" };
  }
