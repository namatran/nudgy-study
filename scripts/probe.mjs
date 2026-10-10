// Run a measurement snippet against a page in headless Chromium and print the result.
// Usage: node scripts/probe.mjs <url> <width> <snippet.js> [scrollY]
// The snippet is the body of an async function; whatever it returns is printed as JSON.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const [url, widthArg, snippetPath, scrollArg] = process.argv.slice(2);
const SIZES = { 1440: 900, 768: 1024, 375: 812 };
const width = Number(widthArg ?? 1440);
const height = SIZES[width] ?? 900;
const snippet = readFileSync(snippetPath, "utf8");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.mouse.move(width / 2, height / 2);

if (scrollArg) {
  const target = Number(scrollArg);
  for (let i = 0; i < 300; i++) {
    const y = await page.evaluate(() => scrollY);
    if (Math.abs(target - y) < 4) break;
    await page.mouse.wheel(0, Math.max(-250, Math.min(250, target - y)));
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(600);
}

const result = await page.evaluate(`(async () => { ${snippet} })()`);
console.log(JSON.stringify(result, null, 2));
await browser.close();
