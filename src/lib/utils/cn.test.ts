import { describe, expect, it } from 'vitest';
import { cn } from './cn';
describe('cn', () => {
  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
  it('supports conditional classes', () => {
    expect(cn('base', { active: true, hidden: false })).toBe('base active');
  });
});
