const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('booklet', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="booklet-cam" style="position:absolute;inset:0"><div class="booklet-shadow" style="position:absolute;left:250px;top:1440px;width:580px;height:70px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(18px)"></div><div class="booklet-hold" style="position:absolute;left:220px;top:620px">' + W.booklet(kit, 'booklet-card') + '</div></div><div class="words" style="left:80px;top:290px;width:860px"><h1 class="line booklet-line">Coverage hides in the booklet.</h1></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.booklet-cam'), hold: q('.booklet-hold'), shadow: q('.booklet-shadow'), line: q('.booklet-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 3.5))) + ')';
    const up = eo(seg(t, -0.5, 0.6));
    const bob = 6 * Math.sin(t * 1.8);
    this.hold.style.transform = 'translateY(' + (lerp(260, 0, up) + bob).toFixed(1) + 'px) rotate(' + lerp(4, -2, up).toFixed(2) + 'deg)';
    this.hold.style.opacity = Math.min(1, up * 1.4);
    this.shadow.style.opacity = 0.8 * up;
    TextFx.fadeFromRight(this.line, t, -0.2);
  },
});
