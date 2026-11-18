const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('dates', {
  init(kit) {
    const card = (cls, tone, name, reset) => '<div class="glass ' + tone + ' ' + cls + '" style="left:80px;top:0;width:860px;padding:30px 36px;display:flex;align-items:center;justify-content:space-between;gap:20px"><div class="card-title">' + name + '</div><div style="padding:12px 24px;border-radius:30px;background:color-mix(in srgb, var(--tone) 30%, transparent);font-family:Geist-Bold;font-size:32px">' + reset + '</div></div>';
    kit.stage.append(kit.h(W.ground('<div class="dates-cam" style="position:absolute;inset:0">' +
      card('dates-a', 't-green', 'Massage therapy', 'Resets Dec 31') +
      card('dates-b', 't-teal', 'Vision care', 'Resets Jun 30') +
      card('dates-c', 't-blue', 'Physiotherapy', 'Resets Dec 31') +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line dates-line">Not everything resets at once.</h2><p class="sub dates-sub">Categories reset on different schedules.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.cards = ['.dates-a', '.dates-b', '.dates-c'].map((s, i) => ({ el: q(s), y: 800 + i * 190, at: 0.4 + i * 0.3 }));
    Object.assign(this, { cam: q('.dates-cam'), line: q('.dates-line'), sub: q('.dates-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    for (const c of this.cards) {
      const k = seg(t, c.at, c.at + 0.6);
      c.el.style.opacity = Math.min(1, eo(k) * 1.6);
      c.el.style.transform = 'translateY(' + (lerp(c.y + 80, c.y, eob(k, 1.4)) + 3 * Math.sin(t * 1.5 + c.y)).toFixed(1) + 'px)';
    }
    TextFx.fadeFromRight(this.line, t, -0.2);
    this.sub.style.opacity = eo(seg(t, 0.5, 1.0));
  },
});
