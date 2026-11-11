const { seg, eo, eio, lerp } = kit;
kit.scene('end', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="end-cam" style="position:absolute;inset:0"><div class="end-glow" style="position:absolute;left:190px;top:420px;width:700px;height:700px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 30%, transparent), transparent)"></div>' +
      '<img class="end-shield" src="' + kit.assets.url('shield.png') + '" alt="BenefitTrack" style="position:absolute;left:400px;top:560px;width:280px;height:320px;object-fit:contain">' +
      '<div class="words end-words" style="left:80px;right:80px;top:940px;align-items:center;text-align:center"><div class="end-wm" style="font-family:Geist-Medium;font-size:120px;letter-spacing:-2px">Benefit<span style="color:var(--main)">Track</span></div><p class="sub end-sub">Free for employees. Data never sold.</p><div class="end-pill" style="margin-top:18px;padding:22px 48px;border-radius:60px;border:3px solid var(--main);background:color-mix(in srgb, var(--main) 16%, transparent);font-family:Geist-Bold;font-size:46px">BenefitTrack.ca</div></div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.end-cam'), shield: q('.end-shield'), glow: q('.end-glow'), wm: q('.end-wm'), sub: q('.end-sub'), pill: q('.end-pill') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.02, eio(seg(t, 0, 3))) + ')';
    const a = eo(seg(t, -0.5, 0.4));
    this.shield.style.transform = 'translateY(' + lerp(40, 0, a).toFixed(1) + 'px) scale(' + (lerp(0.85, 1, a) * kit.breathe(t, 0.012, 3)).toFixed(3) + ')';
    this.shield.style.opacity = a;
    this.glow.style.opacity = 0.7 + 0.2 * Math.sin(t * 1.3);
    const w = eo(seg(t, 0.1, 0.6));
    this.wm.style.opacity = w; this.wm.style.transform = 'translateY(' + lerp(28, 0, w).toFixed(1) + 'px)';
    const s = eo(seg(t, 0.45, 0.95));
    this.sub.style.opacity = s; this.sub.style.transform = 'translateY(' + lerp(24, 0, s).toFixed(1) + 'px)';
    const p = eo(seg(t, 0.8, 1.3));
    this.pill.style.opacity = p; this.pill.style.transform = 'translateY(' + lerp(24, 0, p).toFixed(1) + 'px)';
  },
});
