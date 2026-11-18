const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('pay', {
  init(kit) {
    const names = [['Massage', 't-green'], ['Physio', 't-blue'], ['Counselling', 't-teal'], ['Vision', 't-blue'], ['Dental', 't-green'], ['Chiropractic', 't-teal']];
    const chips = names.map(([n, tone], i) => '<div class="glass chip ' + tone + ' pay-chip" style="position:relative;font-size:44px;padding:24px 38px">' + n + '</div>').join('');
    kit.stage.append(kit.h(W.ground('<div class="pay-cam" style="position:absolute;inset:0"><div style="position:absolute;left:80px;top:820px;width:860px;display:flex;flex-wrap:wrap;gap:26px">' + chips + '</div>' +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><p class="sub pay-eye" style="letter-spacing:5px;font-size:32px;font-family:Geist-Bold">FOR BENEFITS BROKERS</p><h2 class="line pay-line">Your clients pay for these benefits.</h2></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.chips = [...kit.stage.querySelectorAll('.pay-chip')].map((el, i) => ({ el, at: 0.5 + i * 0.18 }));
    Object.assign(this, { cam: q('.pay-cam'), eye: q('.pay-eye'), line: q('.pay-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    for (const c of this.chips) {
      const k = seg(t, c.at, c.at + 0.5);
      c.el.style.opacity = Math.min(1, eo(k) * 1.6);
      c.el.style.transform = 'translateY(' + lerp(40, 0, eob(k, 1.5)).toFixed(1) + 'px)';
    }
    this.eye.style.opacity = eo(seg(t, -0.3, 0.2));
    TextFx.fadeFromRight(this.line, t, 0);
  },
});
