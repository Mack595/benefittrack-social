const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('choose', {
  init(kit) {
    const card = (cls, tone, name, reset, amt) => '<div class="glass ' + tone + ' ' + cls + '" style="left:80px;top:0;width:860px;padding:26px 34px;display:flex;align-items:center;justify-content:space-between;gap:20px"><div style="display:flex;flex-direction:column;gap:6px">' + name + reset + '</div>' + amt + '</div>';
    kit.stage.append(kit.h(W.ground('<div class="choose-cam" style="position:absolute;inset:0"><div class="choose-hubpos" style="position:absolute;left:540px;top:760px">' + W.hub(kit, 'choose-hub') + '</div>' +
      card('choose-a', 't-green', '<div class="card-title">Massage therapy</div>', '<div class="card-sub">Resets Dec 31</div>', '<div class="amt">$500 left</div>') +
      card('choose-b', 't-blue', '<div class="card-title">Physiotherapy</div>', '<div class="card-sub">Resets Dec 31</div>', '<div class="amt">$400 left</div>') +
      card('choose-c', 't-teal', '<div class="card-title">Vision care</div>', '<div class="card-sub">Resets Jun 30</div>', '<div class="amt">$250 left</div>') +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><div class="step choose-step" style="background:var(--main)">2</div><h2 class="line choose-line">Choose what matters</h2></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.cards = ['.choose-a', '.choose-b', '.choose-c'].map((s, i) => ({ el: q(s), y: 960 + i * 175, at: 0.55 + i * 0.32 }));
    Object.assign(this, { cam: q('.choose-cam'), hub: q('.choose-hubpos'), step: q('.choose-step'), line: q('.choose-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    const a = eo(seg(t, -0.4, 0.4));
    this.hub.style.transform = 'scale(' + (lerp(0.7, 0.62, eio(seg(t, 0.2, 1.2))) * kit.breathe(t, 0.015, 3)).toFixed(3) + ')';
    this.hub.style.opacity = a;
    for (const c of this.cards) {
      const k = seg(t, c.at, c.at + 0.6), e = eob(k, 1.5);
      const y = lerp(760 - 60, c.y, e), s = lerp(0.25, 1, eo(k));
      c.el.style.transform = 'translateY(' + (y + 4 * Math.sin(t * 1.6 + c.y)).toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
      c.el.style.transformOrigin = '430px 60px';
      c.el.style.opacity = Math.min(1, eo(k) * 1.6);
    }
    this.step.style.opacity = eo(seg(t, -0.4, 0.1));
    this.step.style.transform = 'scale(' + lerp(0.7, 1, eo(seg(t, -0.4, 0.2))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.2);
  },
});
