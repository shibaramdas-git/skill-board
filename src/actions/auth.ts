'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
});

export async function login(_: any, formData: FormData) {
  const parsedData = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  const { username, password } = parsedData.data;

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30
      })
    });

    if (!response.ok) {
      return { error: 'Invalid credentials or server error' };
    }

    const data = await response.json();
    // Store authentication token securely in HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return { success: true };
  } catch (e) {
    return { error: 'Something went wrong , please try again!' };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('user'); // Clear stored token
  return { success: true };
}
