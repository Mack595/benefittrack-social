const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('forget', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="forget-cam" style="position:absolute;inset:0"><div class="forget-book" style="position:absolute;left:220px;top:700px">' + W.booklet(kit, 'forget-b') + '</div>' +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line forget-line">But coverage is easy to forget.</h2><p class="sub forget-sub">It’s buried in a long booklet.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.forget-cam'), book: q('.forget-book'), line: q('.forget-line'), sub: q('.forget-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    const k = seg(t, 0.2, 1.0);
    this.book.style.opacity = (Math.min(1, eo(k) * 1.6) * lerp(1, 0.55, eio(seg(t, 1.8, 3.2)))).toFixed(3);
    this.book.style.transform = 'translateY(' + (lerp(160, 0, eo(k)) + 4 * Math.sin(t * 1.3)).toFixed(1) + 'px) scale(0.92) rotate(' + lerp(-3, -1.5, eo(k)).toFixed(2) + 'deg)';
    TextFx.fadeFromRight(this.line, t, -0.2);
    this.sub.style.opacity = eo(seg(t, 0.6, 1.1));
  },
});
