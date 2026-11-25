const { seg, eo, eob, eio, lerp, TextFx } = kit;
// One plan year as a timeline. A green fill runs Jan to Dec; each category's reset date pops as the fill passes it.
// Dates are illustrative (labelled "Example dates").
kit.scene('year', {
  init(kit) {
    const months = 'JFMAMJJASOND'.split('');
    const ticks = months.map((m, i) => '<div style="position:absolute;left:' + (80 + (i + 0.5) * (860 / 12) - 20).toFixed(0) + 'px;top:944px;width:40px;text-align:center;font-family:Geist-SemiBold;font-size:30px;color:#9FB6DC">' + m + '</div>').join('');
    const card = (cls, tone, left, top, name, date) => '<div class="glass ' + tone + ' ' + cls + '" style="left:' + left + 'px;top:' + top + 'px;width:460px;padding:22px 30px;display:flex;flex-direction:column;gap:4px;background:color-mix(in srgb, var(--ink) 84%, transparent)"><div class="card-sub" style="color:var(--second)">' + name + '</div><div class="amt" style="font-size:52px;white-space:nowrap">' + date + '</div></div>';
    kit.stage.append(kit.h(W.ground('<div class="yr-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><h2 class="line yr-line">Know <span style="color:var(--main)">every</span> reset date.</h2></div>' +
      card('yr-v', 't-teal', 280, 620, 'Vision care', 'Resets Jun 30') +
      '<div class="yr-vl" style="position:absolute;left:508px;top:760px;width:4px;height:138px;background:var(--teal);transform-origin:top"></div>' +
      '<div style="position:absolute;left:80px;top:898px;width:860px;height:16px;border-radius:8px;background:rgba(199,214,238,0.18)"></div>' +
      '<div class="yr-fill" style="position:absolute;left:80px;top:898px;width:860px;height:16px;border-radius:8px;background:var(--main);transform-origin:left center;transform:scaleX(0)"></div>' +
      '<div class="yr-dv" style="position:absolute;left:492px;top:888px;width:36px;height:36px;border-radius:18px;background:var(--teal);border:4px solid #FAFAF7;box-sizing:border-box"></div>' +
      '<div class="yr-dm" style="position:absolute;left:914px;top:888px;width:36px;height:36px;border-radius:18px;background:var(--main);border:4px solid #FAFAF7;box-sizing:border-box"></div>' +
      ticks +
      '<div class="yr-ml" style="position:absolute;left:930px;top:984px;width:4px;height:28px;background:var(--main);transform-origin:top"></div>' +
      card('yr-m', 't-green', 480, 1010, 'Massage therapy', 'Resets Dec 31') +
      '<p class="sub yr-sub" style="position:absolute;left:80px;top:1250px;width:860px;margin:0">BenefitTrack shows each date, then reminds you by email.</p>' +
      '<div class="card-sub yr-ex" style="position:absolute;left:80px;top:1400px;font-size:30px;color:#9FB6DC">Example dates. Every plan is different.</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.yr-cam'), line: q('.yr-line'), fill: q('.yr-fill'), v: q('.yr-v'), vl: q('.yr-vl'), dv: q('.yr-dv'), m: q('.yr-m'), ml: q('.yr-ml'), dm: q('.yr-dm'), sub: q('.yr-sub'), ex: q('.yr-ex') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.4))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    const f = eio(seg(t, 0.1, 1.5));
    this.fill.style.transform = 'scaleX(' + f.toFixed(4) + ')';
    const pop = (card, line, dot, at) => {
      const k = seg(t, at, at + 0.45);
      card.style.opacity = Math.min(1, eo(k) * 1.6).toFixed(3);
      card.style.transform = 'translateY(' + lerp(30, 0, eob(k, 1.3)).toFixed(1) + 'px)';
      line.style.transform = 'scaleY(' + eo(k).toFixed(3) + ')';
      const d = seg(t, at - 0.05, at + 0.35);
      dot.style.transform = 'scale(' + (t < at - 0.05 ? 0.6 : lerp(0.6, 1, eob(d, 1.6))).toFixed(3) + ')';
    };
    pop(this.v, this.vl, this.dv, 0.8);
    pop(this.m, this.ml, this.dm, 1.5);
    const s = eo(seg(t, 1.8, 2.25));
    this.sub.style.opacity = s.toFixed(3);
    this.sub.style.transform = 'translateY(' + lerp(20, 0, s).toFixed(1) + 'px)';
    this.ex.style.opacity = eo(seg(t, 0.3, 0.7)).toFixed(3);
  },
});
