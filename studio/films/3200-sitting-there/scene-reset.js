const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('reset', {
  init(kit) {
    const card = (cls, tone, name, reset, amt) => '<div class="glass ' + tone + ' ' + cls + '" style="left:80px;top:0;width:860px;padding:26px 34px;display:flex;align-items:center;justify-content:space-between;gap:20px"><div style="display:flex;flex-direction:column;gap:6px"><div class="card-title">' + name + '</div><div class="card-sub">' + reset + '</div></div><div style="position:relative"><div class="amt">' + amt + '</div><div class="reset-strike" style="position:absolute;left:-8px;right:-8px;top:50%;height:6px;margin-top:-3px;border-radius:3px;background:var(--second);transform-origin:0 50%"></div></div>' +
      '<div class="reset-tag" style="position:absolute;right:30px;top:-24px;padding:8px 20px;border-radius:30px;background:var(--second);color:var(--ground);font-family:Geist-Bold;font-size:28px">Reset</div></div>';
    kit.stage.append(kit.h(W.ground('<div class="reset-cam" style="position:absolute;inset:0">' +
      card('reset-a', 't-green', 'Massage therapy', 'Resets Dec 31', '$500 left') +
      card('reset-b', 't-blue', 'Physiotherapy', 'Resets Dec 31', '$400 left') +
      card('reset-c', 't-teal', 'Vision care', 'Resets Jun 30', '$250 left') +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line reset-line">Then it resets.</h2><p class="sub reset-sub">Categories reset on different schedules.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    // Vision resets first (Jun 30), then massage and physio together (Dec 31).
    this.cards = [['.reset-c', 1.55], ['.reset-a', 2.25], ['.reset-b', 2.35]].map(([s, d], i) => {
      const el = q(s);
      return { el, y: 720 + i * 200, at: 0.3 + i * 0.2, dim: d, strike: el.querySelector('.reset-strike'), tag: el.querySelector('.reset-tag') };
    });
    Object.assign(this, { cam: q('.reset-cam'), line: q('.reset-line'), sub: q('.reset-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    for (const c of this.cards) {
      const k = seg(t, c.at, c.at + 0.6), e = eob(k, 1.4);
      const d = eo(seg(t, c.dim, c.dim + 0.35));
      c.el.style.transform = 'translateY(' + (lerp(c.y + 80, c.y, e) + 3 * Math.sin(t * 1.5 + c.y)).toFixed(1) + 'px) scale(' + (1 - 0.03 * d).toFixed(3) + ')';
      c.el.style.opacity = (Math.min(1, eo(k) * 1.6) * (1 - 0.55 * d)).toFixed(3);
      c.el.style.filter = 'saturate(' + (1 - 0.9 * d).toFixed(2) + ')';
      c.strike.style.transform = 'scaleX(' + d.toFixed(3) + ')';
      c.tag.style.opacity = d;
      c.tag.style.transform = 'scale(' + lerp(0.6, 1, eob(seg(t, c.dim, c.dim + 0.35), 1.6)).toFixed(3) + ')';
    }
    TextFx.fadeFromRight(this.line, t, -0.2);
    this.sub.style.opacity = eo(seg(t, 0.4, 0.9));
  },
});
