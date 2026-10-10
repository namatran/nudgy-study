// Viewport screenshots taken while wheeling down the page, so sticky and
// scroll-driven sections are captured in the state a visitor actually sees.
// Usage: node scripts/frames.mjs <url> <outDir> <width> [step] [startY] [endY]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [url, outDir, widthArg, stepArg, startArg, endArg] = process.argv.slice(2);
const SIZES = { 1440: 900, 768: 1024, 375: 812 };
const width = Number(widthArg ?? 1440);
const height = SIZES[width] ?? 900;
const step = Number(stepArg ?? height);
const startY = Number(startArg ?? 0);
const endY = endArg ? Number(endArg) : Infinity;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.mouse.move(width / 2, height / 2);
await page.waitForTimeout(2500);

// Wheel in small ticks so smooth-scroll libraries and scroll observers keep up.
const scrollTo = async (target) => {
  for (let i = 0; i < 200; i++) {
    const y = await page.evaluate(() => scrollY);
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const goal = Math.min(target, max);
    if (Math.abs(goal - y) < 4) return y;
    await page.mouse.wheel(0, Math.max(-250, Math.min(250, goal - y)));
    await page.waitForTimeout(40);
  }
  return page.evaluate(() => scrollY);
};

let n = 0;
for (let target = startY; target <= endY; target += step) {
  const y = await scrollTo(target);
  await page.waitForTimeout(1200);
  const file = `${outDir}/w${width}-${String(n).padStart(2, "0")}-y${Math.round(y)}.png`;
  await page.screenshot({ path: file });
  console.log("saved", file);
  n++;
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (y >= max - 4) break;
}
await browser.close();
