const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('count', {
  init(kit) {
    const chip = (cls, tone, label) => '<div class="glass chip ' + tone + ' ' + cls + '" style="position:relative">' + label + '</div>';
    kit.stage.append(kit.h(W.ground('<div class="count-cam" style="position:absolute;inset:0">' +
      '<div class="count-glow" style="position:absolute;left:140px;top:420px;width:800px;height:600px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 26%, transparent), transparent)"></div>' +
      '<div class="words" style="left:80px;top:330px;width:860px"><p class="sub count-eyebrow" style="letter-spacing:5px;font-size:32px;font-family:Geist-Bold">UNUSED COVERAGE</p>' +
      '<div class="count-amt" style="font-family:Geist-Black;font-size:250px;line-height:0.95;letter-spacing:-10px;color:var(--main)">$1,600</div>' +
      '<h2 class="line count-line">Just sitting there.</h2></div>' +
      '<div class="count-chips" style="position:absolute;left:80px;top:1060px;width:860px;display:flex;flex-wrap:wrap;gap:22px">' +
      chip('count-c1', 't-green', 'Massage') + chip('count-c2', 't-blue', 'Physio') + chip('count-c3', 't-teal', 'Therapy') + '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.count-cam'), eyebrow: q('.count-eyebrow'), amt: q('.count-amt'), line: q('.count-line'), glow: q('.count-glow'),
      chips: ['.count-c1', '.count-c2', '.count-c3'].map((s, i) => ({ el: q(s), at: 0.5 + i * 0.25 })) });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 3.5))) + ')';
    this.eyebrow.style.opacity = eo(seg(t, -0.3, 0.2));
    const a = eo(seg(t, -0.3, 0.3));
    const v = Math.round(lerp(1600, 3200, eio(seg(t, 0.0, 1.5))) / 10) * 10;
    this.amt.textContent = '$' + v.toLocaleString('en-US');
    this.amt.style.opacity = a;
    const pop = seg(t, 1.5, 1.9);
    this.amt.style.transform = 'scale(' + (lerp(0.9, 1, a) * (1 + 0.05 * Math.sin(Math.PI * pop))).toFixed(3) + ')';
    this.amt.style.transformOrigin = '0 50%';
    this.glow.style.opacity = (0.5 + 0.5 * eo(seg(t, 1.3, 1.9))) * (0.85 + 0.15 * Math.sin(t * 1.4));
    TextFx.fadeFromRight(this.line, t, 1.7);
    for (const c of this.chips) {
      const k = seg(t, c.at, c.at + 0.5);
      c.el.style.opacity = Math.min(1, eo(k) * 1.6);
      c.el.style.transform = 'translateY(' + lerp(40, 0, eob(k, 1.5)).toFixed(1) + 'px)';
    }
  },
});
