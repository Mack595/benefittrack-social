const { seg, eo, eob, eio, lerp, TextFx } = kit;
// Step 2: the picks become reminders you switch on.
kit.scene('pick', {
  init(kit) {
    const rows = [['Massage', 't-green'], ['Physio', 't-blue'], ['Vision', 't-teal']].map(([n, tone], i) =>
      '<div class="glass ' + tone + ' pk-row" style="position:relative;display:flex;align-items:center;justify-content:space-between;padding:30px 40px">' +
      '<div class="card-title" style="font-size:48px">' + n + '</div>' +
      '<div style="display:flex;align-items:center;gap:18px"><span class="card-sub pk-lab" style="font-size:32px">Reminder</span>' +
      '<div class="pk-sw" style="position:relative;width:112px;height:60px;border-radius:30px;background:rgba(250,250,247,0.22)"><div class="pk-knob" style="position:absolute;top:6px;left:6px;width:48px;height:48px;border-radius:24px;background:#FAFAF7"></div></div></div></div>').join('');
    kit.stage.append(kit.h(W.ground('<div class="pk-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><p class="eyebrow">STEP 2 OF 3</p><h2 class="line pk-line">Choose what <span style="color:var(--main)">matters</span>.</h2><p class="sub pk-sub">Get reminders for those, by email, at the frequency you choose.</p></div>' +
      '<div style="position:absolute;left:80px;top:860px;width:860px;display:flex;flex-direction:column;gap:26px">' + rows + '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.pk-cam'), line: q('.pk-line'), sub: q('.pk-sub') });
    this.rows = [...kit.stage.querySelectorAll('.pk-row')].map((el, i) => ({ el, sw: el.querySelector('.pk-sw'), knob: el.querySelector('.pk-knob'), at: 0.15 + i * 0.2, on: 1.0 + i * 0.35 }));
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.2))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.35);
    this.sub.style.opacity = eo(seg(t, 0.1, 0.5));
    for (const r of this.rows) {
      const k = seg(t, r.at, r.at + 0.45);
      r.el.style.opacity = Math.min(1, eo(k) * 1.6).toFixed(3);
      r.el.style.transform = 'translateY(' + lerp(50, 0, eob(k, 1.4)).toFixed(1) + 'px)';
      const s = eo(seg(t, r.on, r.on + 0.25));
      r.knob.style.left = lerp(6, 58, s).toFixed(1) + 'px';
      r.sw.style.background = s > 0.5 ? '#48BE5C' : 'rgba(250,250,247,0.22)';
    }
  },
});
