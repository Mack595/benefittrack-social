const { seg, eo, eio, lerp } = kit;
// Hook: the full statement is on screen from frame 0. At 0.4 s "Dec 31" turns green and a green underline
// sweeps under it; at 1.5 s the approved fact lands underneath.
kit.scene('hook', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="hk-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:300px;width:860px;gap:40px"><p class="eyebrow">YOUR BENEFITS</p>' +
      '<h1 class="hook" style="font-size:132px">Not every benefit resets <span class="hk-date" style="position:relative;display:inline-block;white-space:nowrap">Dec 31.<span class="hk-bar" style="position:absolute;left:0;right:0;bottom:-14px;height:12px;border-radius:6px;background:var(--main);transform-origin:left center;transform:scaleX(0)"></span></span></h1>' +
      '<div class="glass t-teal hk-card" style="position:relative;margin-top:30px;width:860px;padding:34px 40px;display:flex;align-items:center;gap:26px;background:color-mix(in srgb, var(--ink) 84%, transparent)">' +
        '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#48BE5C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>' +
        '<div class="card-title" style="font-size:42px">Categories reset on different schedules.</div></div>' +
      '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.hk-cam'), date: q('.hk-date'), bar: q('.hk-bar'), card: q('.hk-card') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 2.8))) + ')';
    const on = t >= 0.4;
    this.date.style.color = on ? '#48BE5C' : '#FAFAF7';
    this.bar.style.transform = 'scaleX(' + eo(seg(t, 0.4, 0.8)).toFixed(3) + ')';
    const c = eo(seg(t, 1.4, 1.85));
    this.card.style.opacity = c.toFixed(3);
    this.card.style.transform = 'translateY(' + lerp(40, 0, c).toFixed(1) + 'px)';
  },
});
