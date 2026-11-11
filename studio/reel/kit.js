// BenefitTrack reel runtime. Scene files call kit.scene(id, {init, render}).
// The renderer loads a film folder, then calls window.__seek(t) for each frame.
(function () {
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const lerp = (a, b, k) => a + (b - a) * k;
  const eo = (k) => 1 - Math.pow(1 - k, 3);
  const ei = (k) => k * k * k;
  const eio = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const eob = (k, s) => { s = s == null ? 1.70158 : s; const c3 = s + 1; return 1 + c3 * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2); };
  const TextFx = {
    // Fade in while sliding from the right, starting at `delay` seconds.
    fadeFromRight(el, t, delay) {
      const k = eo(seg(t, delay || 0, (delay || 0) + 0.55));
      el.style.opacity = k.toFixed(3);
      el.style.transform = 'translateX(' + lerp(70, 0, k).toFixed(1) + 'px)';
    },
  };
  const scenes = [];
  const kit = {
    seg, lerp, eo, ei, eio, eob, clamp, TextFx,
    breathe: (t, amp, period) => 1 + (amp || 0.01) * Math.sin((2 * Math.PI * t) / (period || 3)),
    rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
    h(html) { const tpl = document.createElement('template'); tpl.innerHTML = html.trim(); return tpl.content; },
    assets: { url: (name) => window.__ASSET_BASE + name },
    scene(id, def) { scenes.push({ id, def }); },
    stage: null,
  };
  window.kit = kit;

  // Called by the renderer once all scene files have run.
  window.__build = function (plan) {
    const root = document.getElementById('stage');
    let start = 0;
    window.__layers = plan.scenes.map((s) => {
      const sc = scenes.find((x) => x.id === s.id);
      if (!sc) throw new Error('missing scene ' + s.id);
      const layer = document.createElement('div');
      layer.className = 'layer';
      root.appendChild(layer);
      kit.stage = layer;
      const obj = Object.create(sc.def);
      obj.init(kit);
      const L = { obj, layer, start, dur: s.dur };
      start += s.dur;
      return L;
    });
    window.__total = start;
    return start;
  };
  // Draw the film at absolute time T. The next scene fades in over the last 0.5 s
  // of the previous one, while running its own pre-roll (negative local time).
  window.__seek = function (T) {
    const X = 0.5;
    for (const L of window.__layers) {
      const t = T - L.start;
      const visible = t >= -X && t < L.dur + X;
      L.layer.style.display = visible ? 'block' : 'none';
      if (!visible) continue;
      const last = L === window.__layers[window.__layers.length - 1];
      let o = t < 0 && L.start > 0 ? eio(seg(t, -X, 0)) : 1;
      if (!last && t > L.dur - X) o *= 1 - eio(seg(t, L.dur - X, L.dur));
      L.layer.style.opacity = o.toFixed(3);
      L.obj.render(Math.max(t, L.start > 0 ? -X : 0));
    }
  };
})();
