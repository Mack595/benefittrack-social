const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('fix', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="fix-cam" style="position:absolute;inset:0">' +
      '<div class="glass t-blue fix-mail" style="left:80px;top:760px;width:860px;padding:34px 36px;display:flex;flex-direction:column;gap:20px;background:color-mix(in srgb, var(--ink) 88%, transparent)">' +
        '<div style="display:flex;align-items:center;gap:24px"><div style="flex:none;width:92px;height:92px;border-radius:24px;background:var(--accent);display:flex;align-items:center;justify-content:center"><svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#FAFAF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg></div>' +
        '<div style="display:flex;flex-direction:column;gap:4px"><div class="card-sub" style="color:var(--second)">BenefitTrack</div><div class="card-title">Your health benefit checkup is here</div></div></div>' +
        '<div class="card-sub" style="font-size:36px">$500 of massage left. Resets Dec 31.</div>' +
        '<div class="fix-btn" style="align-self:flex-start;padding:16px 30px;border-radius:40px;background:var(--main);font-family:Geist-Bold;font-size:32px;color:var(--ground)">Book a massage</div>' +
      '</div>' +
      '<div class="glass t-green fix-done" style="left:80px;top:1240px;width:860px;padding:24px 34px;display:flex;align-items:center;gap:24px">' +
        '<div style="flex:none;width:72px;height:72px;border-radius:36px;background:var(--main);display:flex;align-items:center;justify-content:center"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F1729" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
        '<div class="card-title">Booked before it reset</div></div>' +
      '</div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line fix-line">BenefitTrack reminds them first.</h2></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.fix-cam'), mail: q('.fix-mail'), btn: q('.fix-btn'), done: q('.fix-done'), line: q('.fix-line') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    const k = seg(t, 0.35, 1.0), e = eob(k, 1.6);
    this.mail.style.transform = 'translateY(' + (lerp(-90, 0, e) + 3 * Math.sin(t * 1.7)).toFixed(1) + 'px)';
    this.mail.style.opacity = Math.min(1, eo(k) * 1.8);
    const p = seg(t, 1.4, 1.9);
    this.btn.style.transform = 'scale(' + (1 + 0.08 * Math.sin(Math.PI * p)).toFixed(3) + ')';
    const d = seg(t, 1.85, 2.45);
    this.done.style.opacity = Math.min(1, eo(d) * 1.6);
    this.done.style.transform = 'translateY(' + lerp(60, 0, eob(d, 1.5)).toFixed(1) + 'px) scale(' + lerp(0.92, 1, eo(d)).toFixed(3) + ')';
    TextFx.fadeFromRight(this.line, t, -0.2);
  },
});
