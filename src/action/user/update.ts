'use server';

import { cookies } from 'next/headers';
import Axios from 'axios';
import { sessionStore } from '@/lib/session';

export async function action(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const rawNumber = formData.get('remoteJid')?.toString().trim();
  const aiType = formData.get("aiType")?.toString().trim()
  const aiPrompt = formData.get("aiPrompt")?.toString().trim()
  const cleanedNumber = rawNumber?.trim().replace(/[^\d]/g, '');
  const remoteJid = cleanedNumber;
  
  if (!aiType || !aiPrompt  || !remoteJid) {
    throw new Error('MISSING FIELDS');
  }

  const tokenCookie = (await cookies()).get('token');
  const token = tokenCookie?.value;

  if (!token) {
    throw new Error('NO TOKEN IN COOKIE');
  }

  const user = await sessionStore({ tokenCookie: token });

  const userSchema = {
    prompt: `${aiPrompt}`,
    type: aiType,
    remoteJid,
  };

  try {
    const response = await Axios.put(`${process.env.URL_SERVER}/user`, {
      userId: user?.id,
      userSchema}, {
      headers: { Authorization: `Bearer ${token}` },
    });

   return { success: true, message: response.data };

  } catch (error) {
    console.error(error.message);
    if (error.response) {
      console.error('Detalhes da resposta:', error.response.data);
    }

    return { success: false, message: error.message };
  }
}
