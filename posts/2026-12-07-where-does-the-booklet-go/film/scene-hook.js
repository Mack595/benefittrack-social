const { seg, eo, eob, eio, lerp } = kit;
// Hook: the question and the booklet are on screen from frame 0. From 0.5 s the booklet is pulled into BenefitTrack.
kit.scene('hook', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="hk-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><p class="eyebrow">YOUR PLAN BOOKLET</p><h1 class="hook">Where does your booklet <span class="hk-hl">go</span>?</h1></div>' +
      '<div class="hk-book" style="position:absolute;left:220px;top:880px;width:640px;height:860px;transform-origin:50% 0">' + W.booklet(kit, '') + '</div>' +
      W.hub(kit, 'hk-hub') + '</div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.hk-cam'), hl: q('.hk-hl'), book: q('.hk-book'), hub: q('.hk-hub') });
    this.hub.style.left = '540px'; this.hub.style.top = '1180px';
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 2.8))) + ')';
    this.hl.style.color = seg(t, 0.25, 0.45) > 0.5 ? '#48BE5C' : '#FAFAF7';
    // Booklet: full at 0, then shrinks and drops into the hub between 0.5 and 1.5 s.
    const k = eio(seg(t, 0.5, 1.5));
    this.book.style.transform = 'translateY(' + lerp(0, 300, k).toFixed(1) + 'px) scale(' + lerp(0.62, 0.08, k).toFixed(3) + ')';
    this.book.style.opacity = (1 - seg(t, 1.25, 1.55)).toFixed(3);
    // Hub: appears at 0.4 s, pulses when the booklet lands.
    const h = eo(seg(t, 0.4, 0.8));
    const pulse = 1 + 0.12 * Math.sin(Math.PI * seg(t, 1.4, 1.9));
    this.hub.style.opacity = h.toFixed(3);
    this.hub.style.transform = 'scale(' + (lerp(0.6, 0.8, eob(h, 1.4)) * pulse).toFixed(3) + ')';
  },
});
