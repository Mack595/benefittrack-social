const { seg, eo, eio, lerp } = kit;
kit.scene('quote', {
  init(kit) {
    const text = 'I realized I had $3,200 worth of massages, physio, and therapy appointments just sitting there.';
    const words = text.split(' ').map((w, i) => '<span class="quote-w" style="display:inline-block;margin-right:0.26em' + (w === '$3,200' ? ';color:var(--main)' : '') + '">' + w + '</span>').join('');
    kit.stage.append(kit.h(W.ground('<div class="quote-cam" style="position:absolute;inset:0">' +
      '<div class="quote-mark" style="position:absolute;left:74px;top:250px;font-family:Geist-Black;font-size:300px;line-height:1;color:var(--main)">“</div>' +
      '<div class="glass t-green quote-card" style="left:80px;top:500px;width:860px;padding:56px 52px 52px;display:flex;flex-direction:column;gap:40px;background:color-mix(in srgb, var(--ink) 82%, transparent)">' +
      '<p class="quote-text" style="margin:0;font-family:Geist-Bold;font-size:68px;line-height:1.18;letter-spacing:-1px">' + words + '</p>' +
      '<div class="quote-by" style="display:flex;align-items:center;gap:22px"><div style="width:60px;height:4px;border-radius:2px;background:var(--main)"></div><div class="card-sub" style="font-family:Geist-Bold;color:var(--second)">BenefitTrack’s founder</div></div>' +
      '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.quote-cam'), mark: q('.quote-mark'), card: q('.quote-card'), by: q('.quote-by'), words: [...kit.stage.querySelectorAll('.quote-w')] });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 5.5))) + ')';
    const a = eo(seg(t, -0.4, 0.3));
    this.mark.style.opacity = a;
    this.mark.style.transform = 'translateY(' + lerp(30, 0, a).toFixed(1) + 'px)';
    this.card.style.opacity = a;
    this.card.style.transform = 'translateY(' + (lerp(50, 0, a) + 3 * Math.sin(t * 1.3)).toFixed(1) + 'px)';
    const n = this.words.length;
    this.words.forEach((w, i) => {
      const at = 0.25 + i * (2.9 / n), k = eo(seg(t, at, at + 0.3));
      w.style.opacity = (0.12 + 0.88 * k).toFixed(3);
      w.style.transform = 'translateY(' + lerp(14, 0, k).toFixed(1) + 'px)';
    });
    const b = eo(seg(t, 3.3, 3.8));
    this.by.style.opacity = b;
    this.by.style.transform = 'translateX(' + lerp(30, 0, b).toFixed(1) + 'px)';
  },
});
