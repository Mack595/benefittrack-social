const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('cal', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="cal-cam" style="position:absolute;inset:0">' +
      '<div class="cal-glow" style="position:absolute;left:190px;top:700px;width:700px;height:700px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 28%, transparent), transparent)"></div>' +
      '<div class="glass t-green cal-card" style="left:280px;top:760px;width:520px;height:600px;overflow:hidden;padding:0;background:color-mix(in srgb, var(--ink) 86%, transparent)">' +
        '<div style="height:130px;background:var(--main);display:flex;align-items:center;justify-content:center;font-family:Geist-Black;font-size:58px;letter-spacing:8px;color:var(--ground)">DEC</div>' +
        '<div class="cal-num" style="text-align:center;font-family:Geist-Black;font-size:330px;line-height:1;letter-spacing:-12px;margin-top:40px">31</div>' +
      '</div></div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line cal-line">Year end is coming.</h2><p class="sub cal-sub">Some categories may reset on Dec 31.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.cal-cam'), card: q('.cal-card'), glow: q('.cal-glow'), line: q('.cal-line'), sub: q('.cal-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 3.2))) + ')';
    const k = seg(t, 0.2, 0.9);
    this.card.style.opacity = Math.min(1, eo(k) * 1.6);
    this.card.style.transform = 'translateY(' + (lerp(80, 0, eob(k, 1.4)) + 4 * Math.sin(t * 1.4)).toFixed(1) + 'px) scale(' + lerp(0.9, 1, eo(k)).toFixed(3) + ')';
    this.glow.style.opacity = (eo(seg(t, 0.6, 1.4)) * (0.8 + 0.2 * Math.sin(t * 1.6))).toFixed(3);
    TextFx.fadeFromRight(this.line, t, 0);
    this.sub.style.opacity = eo(seg(t, 0.8, 1.3));
  },
});
