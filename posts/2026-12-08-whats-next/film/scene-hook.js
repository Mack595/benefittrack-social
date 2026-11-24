const { seg, eo, eio, lerp } = kit;
// Hook: three questions, all on screen from frame 0. Each lights up green in turn from 0.4 s.
kit.scene('hook', {
  init(kit) {
    const qs = ["What's left?", 'When does it reset?', "What's next?"];
    kit.stage.append(kit.h(W.ground('<div class="hk-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px;gap:34px"><p class="eyebrow">YOUR BENEFITS</p>' +
      qs.map((q) => '<h1 class="hook hk-q" style="font-size:116px">' + q + '</h1>').join('') +
      '<p class="sub hk-sub" style="margin-top:20px">One email can answer all three.</p></div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.hk-cam'), sub: q('.hk-sub') });
    this.qs = [...kit.stage.querySelectorAll('.hk-q')];
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 3))) + ')';
    this.qs.forEach((el, i) => {
      const at = 0.4 + i * 0.55;
      const on = t >= at;
      el.style.color = on ? '#48BE5C' : '#FAFAF7';
      const k = seg(t, at, at + 0.3);
      el.style.transform = 'translateX(' + (on ? lerp(18, 0, eo(k)) : 0).toFixed(1) + 'px)';
    });
    const s = eo(seg(t, 1.9, 2.3));
    this.sub.style.opacity = s.toFixed(3);
    this.sub.style.transform = 'translateY(' + lerp(20, 0, s).toFixed(1) + 'px)';
  },
});
