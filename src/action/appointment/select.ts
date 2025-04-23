'use server';

import { cookies } from 'next/headers';
import Axios from 'axios';
import { sessionStore } from '@/lib/session';

export async function select() {
  const tokenCookie = (await cookies()).get('token');
  const token = tokenCookie?.value;

  if (!token) throw new Error('NO TOKEN IN COOKIE');

  try {
    const user = await sessionStore({ tokenCookie: token });
    const userId = user?.id;

    if (!userId) throw new Error('USER ID NOT FOUND');

    const response = await Axios.get(`${process.env.URL_SERVER}/appointment/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data.data);

    return { success: true, message: response.data.data || [] };
  } catch (error: unknown) {
    if (Axios.isAxiosError(error)) {
      if (error.response?.data) {
        console.error('Response details:', error.response.data);
        return { success: false, message: error.response.data };
      } else {
        console.error('Empty response from server');
        return { success: false, message: 'Empty error response from server' };
      }
    }
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }

    return { success: false, message: "Unexpected error occurred" };
  }
}
