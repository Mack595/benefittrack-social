const { seg, eo, eob, eio, lerp, TextFx } = kit;
// Plain language comes out. The original booklet isn't stored.
kit.scene('plain', {
  init(kit) {
    const tick = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0F1729" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;background:#48BE5C;border-radius:22px;padding:5px;box-sizing:border-box"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    const rows = ["What's covered", "What's left", 'When it resets'].map((n) => '<div class="pl-row" style="display:flex;align-items:center;gap:22px;font-family:Geist-Bold;font-size:46px">' + tick + n + '</div>').join('');
    kit.stage.append(kit.h(W.ground('<div class="pl-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><h2 class="line pl-line">You get plain language.</h2></div>' +
      '<div class="glass t-blue pl-card" style="left:80px;top:620px;width:860px;padding:40px 44px;display:flex;flex-direction:column;gap:26px">' + rows + '</div>' +
      '<div class="pl-stamp" style="position:absolute;left:80px;top:1080px;width:860px;box-sizing:border-box;padding:30px 40px;border-radius:30px;border:3px solid var(--main);background:color-mix(in srgb, var(--main) 18%, transparent);box-shadow:0 0 60px color-mix(in srgb, var(--main) 30%, transparent);font-family:Geist-Black;font-size:60px;line-height:1.05;letter-spacing:-1.5px">The original booklet isn\'t <span style="color:var(--main)">stored</span>.</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.pl-cam'), line: q('.pl-line'), card: q('.pl-card'), stamp: q('.pl-stamp') });
    this.rows = [...kit.stage.querySelectorAll('.pl-row')];
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 2.6))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    const c = seg(t, -0.2, 0.3);
    this.card.style.opacity = eo(c).toFixed(3);
    this.rows.forEach((r, i) => { const k = seg(t, 0.05 + i * 0.18, 0.4 + i * 0.18); r.style.opacity = eo(k).toFixed(3); r.style.transform = 'translateX(' + lerp(40, 0, eo(k)).toFixed(1) + 'px)'; });
    const s = seg(t, 0.95, 1.35);
    this.stamp.style.opacity = Math.min(1, eo(s) * 1.5).toFixed(3);
    this.stamp.style.transform = 'scale(' + lerp(1.12, 1, eob(s, 1.3)).toFixed(3) + ')';
  },
});
