const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('renew', {
  init(kit) {
    const row = (cls, text) => '<div class="glass t-green ' + cls + '" style="left:80px;top:0;width:860px;padding:26px 34px;display:flex;align-items:center;gap:26px;background:color-mix(in srgb, var(--ink) 82%, transparent)"><div style="flex:none;width:72px;height:72px;border-radius:36px;background:var(--main);display:flex;align-items:center;justify-content:center"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F1729" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><div class="card-title">' + text + '</div></div>';
    kit.stage.append(kit.h(W.ground('<div class="renew-cam" style="position:absolute;inset:0">' +
      row('renew-a', 'Know what your plan covers') + row('renew-b', 'A reminder before each date') + row('renew-c', 'Use it before it resets') +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><p class="sub renew-eye" style="letter-spacing:5px;font-size:32px;font-family:Geist-Bold">WITH BENEFITTRACK</p><h2 class="line renew-line">A better year end for you.</h2></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.rows = ['.renew-a', '.renew-b', '.renew-c'].map((s, i) => ({ el: q(s), y: 860 + i * 170, at: 0.45 + i * 0.3 }));
    Object.assign(this, { cam: q('.renew-cam'), eye: q('.renew-eye'), line: q('.renew-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    for (const r of this.rows) {
      const k = seg(t, r.at, r.at + 0.55);
      r.el.style.opacity = Math.min(1, eo(k) * 1.6);
      r.el.style.transform = 'translateX(' + lerp(80, 0, eob(k, 1.3)).toFixed(1) + 'px) translateY(' + r.y + 'px)';
    }
    this.eye.style.opacity = eo(seg(t, -0.3, 0.2));
    TextFx.fadeFromRight(this.line, t, -0.1);
  },
});
