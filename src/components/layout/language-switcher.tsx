'use client';
import { setUiLanguage } from '@/i18n/actions';
import { useTransition } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/i18n/dictionaries';
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  function changeLanguage(next: Locale) {
    startTransition(async () => {
      await setUiLanguage(next);
    });
  }
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-1 rounded-full border border-stone-300 p-1"
    >
      {(['en', 'zh-CN'] as const).map((language) => (
        <button
          key={language}
          type="button"
          lang={language}
          aria-pressed={locale === language}
          disabled={pending}
          onClick={() => changeLanguage(language)}
          className={cn(
            'rounded-full px-3 py-1.5 text-sm transition-colors disabled:opacity-60',
            locale === language
              ? 'bg-stone-900 text-white'
              : 'text-stone-700 hover:bg-stone-200',
          )}
        >
          {language === 'en' ? 'English' : '中文'}
        </button>
      ))}
    </div>
  );
}
