// Full-page comparison screenshots at the three study widths.
// Usage: node scripts/shoot.mjs <url> <outDir> [width,width,...]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [url, outDir, widthsArg] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("usage: node scripts/shoot.mjs <url> <outDir> [widths]");
  process.exit(1);
}

const SIZES = { 1440: 900, 768: 1024, 375: 812 };
const widths = widthsArg ? widthsArg.split(",").map(Number) : [1440, 768, 375];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const width of widths) {
  const height = SIZES[width] ?? 900;
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(width / 2, height / 2);

  // Wheel down the page so scroll-triggered reveals fire (works with smooth-scroll libs).
  let last = -1;
  for (let i = 0; i < 400; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(60);
    const y = await page.evaluate(() => Math.round(scrollY + innerHeight));
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    if (y >= total - 2 && y === last) break;
    last = y;
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, -100000);
  await page.waitForTimeout(1500);

  const file = `${outDir}/full-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log("saved", file);
  await page.close();
}
await browser.close();
