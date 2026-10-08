'use server';
import { cookies } from 'next/headers';
import { resolveLocale, type Locale } from './dictionaries';
export async function setUiLanguage(locale: Locale): Promise<void> {
  (await cookies()).set('ui-language', resolveLocale(locale), {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
}
