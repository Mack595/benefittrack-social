#!/usr/bin/env node
// Render BenefitTrack design HTML files to PNG.
// Usage: node studio/tools/render_png.js <file.html> [more.html ...]  -> writes <file>.png next to each.
// In the HTML, write asset paths as ASSET:fonts/Geist-Black.ttf or ASSET:img/shield.png,
// and give the canvas size with <meta name="size" content="1080x1350">.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ASSETS = path.resolve(__dirname, '../assets');
(async () => {
  const b = await chromium.launch();
  for (const f of process.argv.slice(2)) {
    let h = fs.readFileSync(f, 'utf8');
    const m = h.match(/<meta name="size" content="(\d+)x(\d+)">/);
    if (!m) throw new Error(f + ': missing <meta name="size">');
    const W = +m[1], H = +m[2];
    h = h.replace(/ASSET:/g, 'file://' + ASSETS + '/');
    const tmp = path.join(path.dirname(path.resolve(f)), '.tmp_' + path.basename(f));
    fs.writeFileSync(tmp, h);
    const pg = await b.newPage({ viewport: { width: W, height: H } });
    const errs = []; pg.on('pageerror', (e) => errs.push(String(e)));
    pg.on('requestfailed', (r) => errs.push('missing ' + r.url()));
    await pg.goto('file://' + tmp);
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(150);
    // Flag text that spills outside the canvas.
    const spill = await pg.evaluate(([W, H]) => [...document.querySelectorAll('body *')].filter((e) => {
      const r = e.getBoundingClientRect(); return r.width && (r.right > W + 1 || r.bottom > H + 1 || e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow === 'visible' && e.children.length === 0);
    }).map((e) => e.tagName + ':' + (e.textContent || '').trim().slice(0, 40)), [W, H]);
    const out = f.replace(/\.html$/, '.png');
    await pg.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
    await pg.close(); fs.unlinkSync(tmp);
    console.log(out, W + 'x' + H, errs.length ? 'ERRORS ' + errs.join('; ') : '', spill.length ? 'OVERFLOW ' + spill.join(' | ') : '');
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
