const { seg, eo, eob, eio, lerp, TextFx } = kit;
// An example inbox: three checkup emails stack in, one per category. Labelled "Example inbox".
kit.scene('inbox', {
  init(kit) {
    const tones = ['t-blue', 't-green', 't-teal'];
    const rows = [['Massage therapy', 'See what’s left'], ['Vision care', 'See when it resets'], ['Physio', 'Your next step toward care']];
    const row = (i) => '<div class="glass ' + tones[i] + ' ib-row" style="left:80px;top:' + (600 + i * 220) + 'px;width:860px;height:190px;padding:28px 34px;display:flex;align-items:center;gap:28px;background:color-mix(in srgb, var(--ink) 84%, transparent)">' +
      '<div style="flex:none;width:96px;height:96px;border-radius:48px;background:color-mix(in srgb, var(--tone) 40%, transparent);display:flex;align-items:center;justify-content:center"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FAFAF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;min-width:0"><div class="card-title" style="font-size:38px;white-space:nowrap">Your health benefit checkup is here</div><div class="card-sub" style="font-size:34px"><span style="color:var(--second)">' + rows[i][0] + ':</span> ' + rows[i][1] + '</div></div></div>';
    kit.stage.append(kit.h(W.ground('<div class="ib-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:290px;width:860px"><h2 class="line ib-line">A checkup on <span style="color:var(--main)">your</span> schedule.</h2></div>' +
      '<div class="card-sub ib-ex" style="position:absolute;left:84px;top:548px;font-size:30px;color:#9FB6DC">Example inbox</div>' +
      row(0) + row(1) + row(2) +
      '<p class="sub ib-sub" style="position:absolute;left:80px;top:1290px;width:860px;margin:0">By email, at the frequency you choose. Not another dashboard.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.ib-cam'), line: q('.ib-line'), rows: [...kit.stage.querySelectorAll('.ib-row')], sub: q('.ib-sub'), ex: q('.ib-ex') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.4))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    this.rows.forEach((r, i) => {
      const k = seg(t, 0.35 + i * 0.4, 0.8 + i * 0.4);
      r.style.opacity = Math.min(1, eo(k) * 1.6).toFixed(3);
      r.style.transform = 'translateX(' + lerp(60, 0, eob(k, 1.2)).toFixed(1) + 'px)';
    });
    this.ex.style.opacity = eo(seg(t, 0.3, 0.7)).toFixed(3);
    const s = eo(seg(t, 1.8, 2.25));
    this.sub.style.opacity = s.toFixed(3);
    this.sub.style.transform = 'translateY(' + lerp(20, 0, s).toFixed(1) + 'px)';
  },
});
