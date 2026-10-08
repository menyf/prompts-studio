import { describe, expect, it } from 'vitest';
import { dictionaries, resolveLocale } from './dictionaries';
describe('UI languages', () => {
  it('defaults unsupported and missing languages to English', () => {
    expect(resolveLocale(undefined)).toBe('en');
    expect(resolveLocale('fr')).toBe('en');
  });
  it('selects Simplified Chinese', () => {
    expect(resolveLocale('zh-CN')).toBe('zh-CN');
  });
  it('keeps complete, nonempty translations for both languages', () => {
    expect(Object.keys(dictionaries['zh-CN']).sort()).toEqual(
      Object.keys(dictionaries.en).sort(),
    );
    for (const dictionary of Object.values(dictionaries)) {
      for (const value of Object.values(dictionary))
        expect(value.trim().length).toBeGreaterThan(0);
    }
  });
});
