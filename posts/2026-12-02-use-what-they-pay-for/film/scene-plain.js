const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('plain', {
  init(kit) {
    const ico = { covered: '<path d="M4 5h11a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3z"/><path d="M8 9h6M8 13h6"/>', left: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>', resets: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>' };
    const card = (cls, tone, icon, title, sub) => '<div class="glass ' + tone + ' ' + cls + '" style="left:80px;top:0;width:860px;padding:28px 36px;display:flex;align-items:center;gap:28px"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FAFAF7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + '</svg><div style="display:flex;flex-direction:column;gap:6px"><div class="card-title">' + title + '</div><div class="card-sub">' + sub + '</div></div></div>';
    kit.stage.append(kit.h(W.ground('<div class="plain-cam" style="position:absolute;inset:0">' +
      card('plain-a', 't-blue', ico.covered, 'What’s covered', 'The booklet, in plain language') +
      card('plain-b', 't-green', ico.left, 'What’s left', 'Limits for each category') +
      card('plain-c', 't-teal', ico.resets, 'When it resets', 'Each category’s own date') +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line plain-line">BenefitTrack makes it plain.</h2></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.cards = ['.plain-a', '.plain-b', '.plain-c'].map((s, i) => ({ el: q(s), y: 720 + i * 200, at: 0.4 + i * 0.3 }));
    Object.assign(this, { cam: q('.plain-cam'), line: q('.plain-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    for (const c of this.cards) {
      const k = seg(t, c.at, c.at + 0.6);
      c.el.style.opacity = Math.min(1, eo(k) * 1.6);
      c.el.style.transform = 'translateY(' + (lerp(c.y + 80, c.y, eob(k, 1.4)) + 3 * Math.sin(t * 1.5 + c.y)).toFixed(1) + 'px)';
    }
    TextFx.fadeFromRight(this.line, t, -0.2);
  },
});
