import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveLocale } from '@/i18n/dictionaries';
import './globals.css';
export const metadata: Metadata = {
  title: 'prompts.yifan.men — Guided Prompt Set Builder',
  description:
    'Think clearly. Build better prompts. An open-source guided prompt set builder.',
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = resolveLocale((await cookies()).get('ui-language')?.value);
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
