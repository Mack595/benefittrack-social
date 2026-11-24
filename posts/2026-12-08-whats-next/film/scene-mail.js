const { seg, eo, eob, eio, lerp, TextFx } = kit;
// The checkup email: what's left, when it resets, and the next step toward care. Amounts are illustrative.
kit.scene('mail', {
  init(kit) {
    const row = (cls, a, b) => '<div class="' + cls + '" style="display:flex;justify-content:space-between;align-items:baseline;font-size:40px;font-family:Geist-Medium">' + a + b + '</div>';
    kit.stage.append(kit.h(W.ground('<div class="ml-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><h2 class="line ml-line">Your checkup, by <span style="color:var(--main)">email</span>.</h2></div>' +
      '<div class="glass t-blue ml-mail" style="left:80px;top:640px;width:860px;padding:36px 40px;display:flex;flex-direction:column;gap:24px;background:color-mix(in srgb, var(--ink) 88%, transparent)">' +
        '<div style="display:flex;align-items:center;gap:24px"><div style="flex:none;width:92px;height:92px;border-radius:24px;background:var(--accent);display:flex;align-items:center;justify-content:center"><svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#FAFAF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg></div>' +
        '<div style="display:flex;flex-direction:column;gap:4px"><div class="card-sub" style="color:var(--second)">BenefitTrack</div><div class="card-title">Your health benefit checkup is here</div></div></div>' +
        '<div style="height:2px;background:rgba(199,214,238,0.25)"></div>' +
        row('ml-r1', '<span>Massage</span>', '<span style="font-family:Geist-Black;color:var(--main)">$500 left</span>') +
        row('ml-r2', '<span>Resets</span>', '<span style="font-family:Geist-Bold">Dec 31</span>') +
        '<div class="ml-btn" style="align-self:flex-start;margin-top:6px;padding:20px 36px;border-radius:44px;background:var(--main);font-family:Geist-Bold;font-size:38px;color:var(--ground)">Book a massage</div>' +
      '</div>' +
      '<div class="ml-note" style="position:absolute;left:80px;top:1270px;width:860px;display:flex;align-items:center;gap:18px;font-family:Geist-Bold;font-size:40px"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#48BE5C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;transform:rotate(-90deg)"><path d="M5 12h14M13 6l6 6-6 6"/></svg>The next step toward care.</div>' +
      '<div class="card-sub ml-ex" style="position:absolute;left:80px;top:1360px;font-size:30px;color:#9FB6DC">Example email. Amounts are illustrative.</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.ml-cam'), line: q('.ml-line'), mail: q('.ml-mail'), r1: q('.ml-r1'), r2: q('.ml-r2'), btn: q('.ml-btn'), note: q('.ml-note'), ex: q('.ml-ex') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.2))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    const k = seg(t, -0.15, 0.45);
    this.mail.style.opacity = Math.min(1, eo(k) * 1.6).toFixed(3);
    this.mail.style.transform = 'translateY(' + (lerp(-80, 0, eob(k, 1.5)) + 3 * Math.sin(t * 1.7)).toFixed(1) + 'px)';
    [this.r1, this.r2].forEach((r, i) => { const a = eo(seg(t, 0.4 + i * 0.25, 0.7 + i * 0.25)); r.style.opacity = a.toFixed(3); r.style.transform = 'translateX(' + lerp(40, 0, a).toFixed(1) + 'px)'; });
    const b = eo(seg(t, 0.9, 1.2));
    const p = 1 + 0.08 * Math.sin(Math.PI * seg(t, 1.5, 2.0));
    this.btn.style.opacity = b.toFixed(3);
    this.btn.style.transform = 'scale(' + (lerp(0.9, 1, b) * p).toFixed(3) + ')';
    const n = eo(seg(t, 1.5, 1.9));
    this.note.style.opacity = n.toFixed(3);
    this.note.style.transform = 'translateY(' + lerp(20, 0, n).toFixed(1) + 'px)';
    this.ex.style.opacity = eo(seg(t, 0.3, 0.7)).toFixed(3);
  },
});
