const { seg, eo, eob, eio, lerp, TextFx } = kit;
// The trust facts, snapping in one by one.
kit.scene('trust', {
  init(kit) {
    const facts = [['Free for employees', 't-blue'], ['PIPEDA compliant', 't-green'], ['Built in Canada', 't-teal']];
    const cards = facts.map(([f, tone]) => '<div class="glass ' + tone + ' tr-card" style="position:relative;padding:34px 40px;font-family:Geist-Bold;font-size:52px">' + f + '</div>').join('');
    kit.stage.append(kit.h(W.ground('<div class="tr-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><h2 class="line tr-line">Your data is never <span style="color:var(--main)">sold</span>.</h2></div>' +
      '<div style="position:absolute;left:80px;top:660px;width:860px;display:flex;flex-direction:column;gap:26px">' + cards + '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.tr-cam'), line: q('.tr-line') });
    this.cards = [...kit.stage.querySelectorAll('.tr-card')];
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 2.4))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    this.cards.forEach((c, i) => {
      const k = seg(t, 0.05 + i * 0.3, 0.4 + i * 0.3);
      c.style.opacity = Math.min(1, eo(k) * 1.6).toFixed(3);
      c.style.transform = 'translateX(' + lerp(80, 0, eob(k, 1.3)).toFixed(1) + 'px)';
    });
  },
});
