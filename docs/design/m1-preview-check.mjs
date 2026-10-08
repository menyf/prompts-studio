import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || '@playwright/test'
);
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  if (process.env.VERCEL_COOKIE_JAR) {
    const cookies = fs
      .readFileSync(process.env.VERCEL_COOKIE_JAR, 'utf8')
      .split('\n')
      .filter(
        (line) =>
          line && (!line.startsWith('#') || line.startsWith('#HttpOnly_')),
      )
      .map((line) => {
        const [domain, , path, secure, expires, name, value] = line
          .replace(/^#HttpOnly_/, '')
          .split('\t');
        return {
          domain,
          path,
          secure: secure === 'TRUE',
          expires: Number(expires) || -1,
          name,
          value,
          httpOnly: line.startsWith('#HttpOnly_'),
        };
      });
    await context.addCookies(cookies);
  }
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(process.argv[2], { waitUntil: 'networkidle' });
  assert.match(await page.title(), /v0.4/);
  assert.equal(await page.locator('#copy-all').isDisabled(), true);
  await page
    .locator('#goal')
    .fill(
      'Add a filter <script>window.injected=true</script>\nPreserve user choices.',
    );
  await page
    .locator('#context')
    .fill('No dependencies.\nKeep keyboard support.');
  assert.equal(await page.locator('.prompt-card').count(), 5);
  assert.equal(await page.locator('.prompt-body pre:visible').count(), 5);
  assert.equal(await page.evaluate(() => window.injected), undefined);
  const initial = await page.locator('#prompt-0 pre').textContent();
  await page.locator('#prompt-0 .card-actions button').first().click();
  await page
    .locator('#prompt-0 textarea')
    .fill('My manual edit\nKeep this exactly.');
  await page.locator('#prompt-0 .card-actions button').first().click();
  assert.match(
    await page.locator('#prompt-0 .edit-note').textContent(),
    /Edited/,
  );
  await page.locator('#goal').fill('Updated goal');
  assert.equal(
    await page.locator('#prompt-0 pre').textContent(),
    'My manual edit\nKeep this exactly.',
  );
  assert.match(
    await page.locator('#prompt-0 .edit-note').textContent(),
    /Source changed/,
  );
  assert.match(
    await page.locator('#prompt-1 pre').textContent(),
    /Updated goal/,
  );
  await page.locator('#prompt-0 .card-actions button').last().click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    'My manual edit\nKeep this exactly.',
  );
  await page.locator('#copy-all').click();
  assert.match(
    await page.evaluate(() => navigator.clipboard.readText()),
    /1\. Clarify Requirements\n\nMy manual edit/,
  );
  await page.locator('#output-lang').selectOption('zh');
  assert.equal(
    await page.locator('#prompt-0 pre').textContent(),
    'My manual edit\nKeep this exactly.',
  );
  assert.match(await page.locator('#prompt-1 pre').textContent(), /功能目标/);
  await page.locator('#ui-lang').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
  assert.equal(await page.locator('#output-lang').inputValue(), 'zh');
  await page.locator('[data-mode="refine"]').click();
  const original = '  Notes <b> & ${x}\n`````js\nline\n`````\n\n  ';
  await page.locator('#draft').fill(original);
  const suffix =
    "First, review my full message and any attached files, even if my thoughts are rough, fragmented, or unfiltered. Tell me what you think I'm actually trying to achieve, then propose a plan for me to review. Stop and wait for my approval before starting the task.";
  assert.equal(
    await page.locator('#prompt-0 pre').textContent(),
    '``````\n' + original + '\n``````\n\n' + suffix,
  );
  assert.equal(await page.locator('#output-lang').isVisible(), false);
  await page.locator('#copy-all').click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    '``````\n' + original + '\n``````\n\n' + suffix,
  );
  await page.locator('#draft').fill(' '.repeat(3) + '\n');
  assert.equal(
    await page.locator('#prompt-0 pre').textContent(),
    '```\n   \n\n```\n\n' + suffix,
  );
  await page.locator('#draft').fill('a'.repeat(13000));
  assert.equal((await page.locator('#draft').inputValue()).length, 13000);
  await page.locator('[data-mode="feature"]').click();
  assert.equal(
    await page.locator('#prompt-0 pre').textContent(),
    'My manual edit\nKeep this exactly.',
  );
  await page.locator('#prompt-0 .edit-note button').click();
  assert.match(
    await page.locator('#prompt-0 pre').textContent(),
    /Updated goal/,
  );
  assert.equal(await page.locator('#prompt-0 .edit-note').count(), 0);
  await page.locator('#ui-lang').click();
  assert.equal(await page.locator('#output-lang').inputValue(), 'zh');
  await page.locator('#sample').click();
  await page.locator('#sample').click();
  assert.equal(await page.locator('#goal').inputValue(), 'Updated goal');
  await page.locator('#output-lang').selectOption('en');
  await page
    .locator('#goal')
    .fill(
      'Add a filter <script>window.injected=true</script>\nPreserve user choices.',
    );
  assert.equal(await page.locator('#prompt-0 pre').textContent(), initial);
  await page.locator('#prompt-jumps a').last().click();
  assert.equal(await page.evaluate(() => location.hash), '#prompt-4');
  await page.screenshot({
    path: '/tmp/m1-preview-desktop.png',
    fullPage: true,
  });
  for (const width of [1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `overflow at ${width}`,
    );
    assert.equal(await page.locator('.nav-item:disabled:visible').count(), 4);
  }
  await page.screenshot({ path: '/tmp/m1-preview-mobile.png', fullPage: true });
  await page.locator('#clear').click();
  assert.equal(await page.locator('#copy-all').isDisabled(), true);
  await page.locator('#goal').fill('Clipboard failure');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Denied')) },
      configurable: true,
    });
  });
  await page.locator('#copy-all').click();
  await page.waitForFunction(() =>
    document.getElementById('copy-status').textContent.includes('unavailable'),
  );
  assert.deepEqual(errors, []);
  console.log(
    'PASS: live templates, exact refine wrapping, safe text, drafts, reset, languages, clipboard, example undo, empty states, jump links, desktop/tablet/mobile overflow, no page errors',
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
