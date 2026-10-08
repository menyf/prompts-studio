import Link from 'next/link';
import { ArrowUpRight, Layers3, Sparkles } from 'lucide-react';
import { cookies } from 'next/headers';
import { dictionaries, resolveLocale } from '@/i18n/dictionaries';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
export default async function Home() {
  const locale = resolveLocale((await cookies()).get('ui-language')?.value);
  const copy = dictionaries[locale];
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-5 py-7">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          prompts.yifan.men
        </Link>
        <LanguageSwitcher locale={locale} label={copy.language} />
      </header>
      <main className="flex-1 py-16 sm:py-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700">
          <span className="h-2 w-2 rounded-full bg-amber-600" />
          {copy.status}
        </div>
        <h1 className="max-w-3xl text-5xl leading-[1.08] font-semibold tracking-tight sm:text-7xl">
          {copy.headline}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600">
          {copy.description}
        </p>
        <section
          aria-labelledby="workflow-heading"
          className="mt-16 max-w-2xl rounded-3xl border border-stone-300 bg-white p-7 sm:p-9"
        >
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-600">
            <Sparkles size={16} aria-hidden="true" />
            {copy.eyebrow}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Layers3 className="text-stone-700" size={26} aria-hidden="true" />
            <h2
              id="workflow-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              {copy.workflow}
            </h2>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              {copy.soon}
            </span>
          </div>
          <p className="mt-4 leading-7 text-stone-600">
            {copy.workflowDescription}
          </p>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-300 py-7 text-sm text-stone-600">
        <p>{copy.footer}</p>
        <a
          href="https://github.com/menyf/prompts-studio"
          className="inline-flex items-center gap-1 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
        >
          {copy.github}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
