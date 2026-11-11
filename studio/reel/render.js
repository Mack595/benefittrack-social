#!/usr/bin/env node
// Render an animated reel from a film folder to MP4 (1080x1920, 30 fps, H.264 + AAC).
// Usage: node studio/reel/render.js <film-dir> <out.mp4> [--fps 30] [--still t=2.5,out.png]
// A film folder holds scenes.json, base.css, shared.js, scene-<id>.js and music.json.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const filmDir = path.resolve(args[0]);
const out = path.resolve(args[1]);
const fps = +(args.includes('--fps') ? args[args.indexOf('--fps') + 1] : 30);
const stills = args.includes('--still') ? args[args.indexOf('--still') + 1].split(';') : [];
const STUDIO = path.resolve(__dirname, '..');
const plan = JSON.parse(fs.readFileSync(path.join(filmDir, 'scenes.json'), 'utf8'));
const W = plan.width || 1080, H = plan.height || 1920;

function page() {
  const f = (n) => 'file://' + path.join(STUDIO, 'assets/fonts', n);
  const read = (n) => (fs.existsSync(path.join(filmDir, n)) ? fs.readFileSync(path.join(filmDir, n), 'utf8') : '');
  const scenesJs = plan.scenes.map((s) => read('scene-' + s.id + '.js')).map((src) => '(function(kit){' + src + '\n})(window.kit);').join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Geist-Black";src:url(${f('Geist-Black.ttf')})}
@font-face{font-family:"Geist-Bold";src:url(${f('Geist-Bold.ttf')})}
@font-face{font-family:"Geist-SemiBold";src:url(${f('Geist-SemiBold.ttf')})}
@font-face{font-family:"Geist-Medium";src:url(${f('Geist-Medium.ttf')})}
@font-face{font-family:Geist;font-weight:900;src:url(${f('Geist-Black.ttf')})}
@font-face{font-family:Geist;font-weight:700;src:url(${f('Geist-Bold.ttf')})}
@font-face{font-family:Geist;font-weight:600;src:url(${f('Geist-SemiBold.ttf')})}
@font-face{font-family:Geist;font-weight:500;src:url(${f('Geist-Medium.ttf')})}
html,body{margin:0;background:${plan.background || '#0F1729'}}
#stage{position:relative;width:${W}px;height:${H}px;overflow:hidden}
.layer{position:absolute;inset:0}
${read('base.css')}
</style></head><body><div id="stage"></div>
<script>window.__ASSET_BASE=${JSON.stringify('file://' + path.join(STUDIO, 'assets/img') + '/')};</script>
<script>${fs.readFileSync(path.join(__dirname, 'kit.js'), 'utf8')}</script>
<script>${read('shared.js')}</script>
<script>${scenesJs}</script></body></html>`;
}

(async () => {
  const tmp = path.join(path.dirname(out), '.render_' + path.basename(filmDir) + '.html');
  fs.writeFileSync(tmp, page());
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: W, height: H } });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(String(e)));
  await pg.goto('file://' + tmp);
  await pg.evaluate(() => document.fonts.ready);
  if (errs.length) throw new Error(errs.join('\n'));
  const total = await pg.evaluate((p) => window.__build(p), plan);
  await pg.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r))))));
  for (const s of stills) {
    const [t, file] = s.split(',');
    await pg.evaluate((t) => window.__seek(t), +t);
    await pg.screenshot({ path: path.resolve(file) });
  }
  if (out.endsWith('.mp4')) {
    const silent = out.replace(/\.mp4$/, '.video.mp4');
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent]);
    const n = Math.round(total * fps);
    for (let i = 0; i < n; i++) {
      await pg.evaluate((t) => window.__seek(t), i / fps);
      const buf = await pg.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % (fps * 2) === 0) process.stdout.write(`frame ${i}/${n}\n`);
    }
    ff.stdin.end();
    await new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
    const music = path.join(filmDir, 'music.json');
    if (fs.existsSync(music)) {
      const wav = out.replace(/\.mp4$/, '.wav');
      execFileSync('python3', [path.join(__dirname, 'music.py'), music, wav, String(total)], { stdio: 'inherit' });
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out]);
      fs.unlinkSync(wav); fs.unlinkSync(silent);
    } else fs.renameSync(silent, out);
    console.log(`done ${out} (${total.toFixed(2)} s)`);
  }
  await browser.close();
  fs.unlinkSync(tmp);
})().catch((e) => { console.error(e); process.exit(1); });
