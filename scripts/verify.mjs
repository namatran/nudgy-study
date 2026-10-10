// Behaviour checks for the study build: console errors, reduced motion,
// local-only waitlist, header hide/show, noindex.
// Usage: node scripts/verify.mjs [url]
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:4380/";
const browser = await chromium.launch();
const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);

// 1. normal motion
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(1500);

  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  check("robots noindex", /noindex/.test(robots ?? ""), robots ?? "missing");
  const disclaimer = await page.getByText("Unofficial design study of nudgy.run. Not affiliated.").count();
  check("footer disclaimer", disclaimer === 1);

  await page.mouse.move(720, 450);
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(700);
  const hidden = await page.locator("header").getAttribute("data-hidden");
  check("header hides on scroll down", hidden !== null);
  await page.mouse.wheel(0, -150);
  await page.waitForTimeout(700);
  const shownAgain = await page.locator("header").getAttribute("data-hidden");
  check("header returns on scroll up", shownAgain === null);

  const storyVisible = await page.evaluate(() => {
    const t = document.querySelector('[class*="PhoneStory-module__"][class*="track"]');
    return t ? getComputedStyle(t).display : "missing";
  });
  check("sticky story on at 1440", storyVisible === "block", storyVisible);

  // waitlist: no network request on submit
  const requests = [];
  page.on("request", (r) => {
    if (!/\/_next\/|__nextjs|webpack|hmr|\.woff2?$|favicon/.test(r.url())) requests.push(`${r.method()} ${r.url()}`);
  });
  await page.locator("#invite").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.locator('#invite input[type="email"]').fill("not-an-email");
  await page.locator('#invite button[type="submit"]').click();
  const invalid = await page.locator('#invite input[type="email"]').getAttribute("aria-invalid");
  check("waitlist rejects bad email", invalid === "true");
  await page.locator('#invite input[type="email"]').fill("test@example.com");
  await page.locator('#invite button[type="submit"]').click();
  await page.waitForTimeout(500);
  const thanks = await page.getByText("you're in the queue.").count();
  check("waitlist shows local thanks", thanks === 1);
  check("waitlist sent no requests", requests.length === 0, requests.join(", "));

  // FAQ
  const first = page.locator("#faq details").first();
  await first.locator("summary").click();
  check("faq opens", (await first.getAttribute("open")) !== null);

  check("no console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await page.close();
}

// 2. reduced motion
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const track = document.querySelector('[class*="PhoneStory-module__"][class*="track"]');
    const reveal = document.querySelector('[class*="Reveal-module__"]');
    const word = document.querySelector("[data-w]");
    const stack = document.querySelector('#what ol');
    const heroTitle = document.querySelector("#hero h1");
    return {
      story: track ? getComputedStyle(track).display : "missing",
      stack: stack ? getComputedStyle(stack).display : "missing",
      revealOpacity: reveal ? getComputedStyle(reveal).opacity : "missing",
      wordOpacity: word ? getComputedStyle(word).opacity : "missing",
      heroAnim: heroTitle ? getComputedStyle(heroTitle).animationName : "missing",
      lenis: document.documentElement.classList.contains("lenis"),
    };
  });
  check("reduced motion: sticky story off", r.story === "none", r.story);
  check("reduced motion: stacked story on", r.stack !== "none", r.stack);
  check("reduced motion: reveals visible", r.revealOpacity === "1", r.revealOpacity);
  check("reduced motion: words fully lit", r.wordOpacity === "1", r.wordOpacity);
  check("reduced motion: hero pop off", r.heroAnim === "none", r.heroAnim);
  check("reduced motion: lenis off", r.lenis === false);
  await ctx.close();
}

// 3. no horizontal overflow at the three widths
for (const [w, h] of [[1440, 900], [768, 1024], [375, 812]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  check(`no horizontal scroll at ${w}`, sw <= w, `scrollWidth ${sw}`);
  await page.close();
}

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
