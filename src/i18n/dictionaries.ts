export const locales = ['en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];
type Dictionary = {
  status: string;
  headline: string;
  description: string;
  eyebrow: string;
  workflow: string;
  workflowDescription: string;
  soon: string;
  footer: string;
  github: string;
  language: string;
};
export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    status: 'Under development',
    headline: 'Think clearly. Build better prompts.',
    description:
      'Turn your ideas into clear requirements and reusable prompt sets for ChatGPT, Claude Code, and Cursor.',
    eyebrow: 'Your next step, thoughtfully guided',
    workflow: 'Implement a Feature',
    workflowDescription:
      'Explore the right questions, review your requirements, and build a focused set of prompts. Our first guided workflow is coming soon.',
    soon: 'Coming soon',
    footer: 'Open source. Thoughtful by design.',
    github: 'View on GitHub',
    language: 'Interface language',
  },
  'zh-CN': {
    status: '开发中',
    headline: '理清思路，构建更好的提示词。',
    description:
      '将你的想法转化为清晰的需求，以及适用于 ChatGPT、Claude Code 和 Cursor 的可复用提示词集。',
    eyebrow: '循序渐进，明确下一步',
    workflow: '实现一个功能',
    workflowDescription:
      '通过结构化问题梳理需求，审阅关键决策，并构建有针对性的提示词集。我们的首个引导工作流即将上线。',
    soon: '即将上线',
    footer: '开源，用心设计。',
    github: '在 GitHub 上查看',
    language: '界面语言',
  },
};
export function resolveLocale(value: string | undefined): Locale {
  return value === 'zh-CN' ? 'zh-CN' : 'en';
}
