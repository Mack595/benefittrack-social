const { seg, eo, eob, eio, lerp, TextFx } = kit;
kit.scene('nudge', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="nudge-cam" style="position:absolute;inset:0">' +
      '<div class="glass t-blue nudge-mail" style="left:80px;top:820px;width:860px;padding:34px 36px;display:flex;flex-direction:column;gap:20px;background:color-mix(in srgb, var(--ink) 88%, transparent)">' +
        '<div style="display:flex;align-items:center;gap:24px"><div style="flex:none;width:92px;height:92px;border-radius:24px;background:var(--accent);display:flex;align-items:center;justify-content:center"><svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#FAFAF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg></div>' +
        '<div style="display:flex;flex-direction:column;gap:4px"><div class="card-sub" style="color:var(--second)">BenefitTrack</div><div class="card-title">Your health benefit checkup is here</div></div></div>' +
        '<div class="card-sub" style="font-size:36px">Physio resets Dec 31. Book before then.</div>' +
        '<div class="nudge-btn" style="align-self:flex-start;padding:16px 30px;border-radius:40px;background:var(--main);font-family:Geist-Bold;font-size:32px;color:var(--ground)">Book physio</div>' +
      '</div></div><div class="words" style="left:80px;top:290px;width:860px"><h2 class="line nudge-line">Then it reminds you.</h2><p class="sub nudge-sub">By email, on the schedule you choose.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.nudge-cam'), mail: q('.nudge-mail'), btn: q('.nudge-btn'), line: q('.nudge-line'), sub: q('.nudge-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    const k = seg(t, 0.4, 1.05);
    this.mail.style.transform = 'translateY(' + (lerp(-90, 0, eob(k, 1.6)) + 3 * Math.sin(t * 1.7)).toFixed(1) + 'px)';
    this.mail.style.opacity = Math.min(1, eo(k) * 1.8);
    const p = seg(t, 1.8, 2.4);
    this.btn.style.transform = 'scale(' + (1 + 0.08 * Math.sin(Math.PI * p)).toFixed(3) + ')';
    TextFx.fadeFromRight(this.line, t, -0.2);
    this.sub.style.opacity = eo(seg(t, 0.5, 1.0));
  },
});
