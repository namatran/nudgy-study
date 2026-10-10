// Run a measurement snippet at many viewport widths (for finding breakpoints).
// Usage: node scripts/sweep.mjs <url> <snippet.js> <w1,w2,...>
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const [url, snippetPath, widthsArg] = process.argv.slice(2);
const snippet = readFileSync(snippetPath, "utf8");
const widths = widthsArg.split(",").map(Number);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: widths[0], height: 900 } });
await page.goto(url, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(400);
  const result = await page.evaluate(`(async () => { ${snippet} })()`);
  console.log(`--- ${width}px`);
  console.log(typeof result === "string" ? result : JSON.stringify(result));
}
await browser.close();
