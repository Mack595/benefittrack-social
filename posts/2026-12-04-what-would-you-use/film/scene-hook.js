const { seg, eo, eob, eio, lerp } = kit;
// Hook: the question is on screen, full size, from frame 0. Chips get picked from 0.5 s.
kit.scene('hook', {
  init(kit) {
    const names = [['Massage', 't-green', 0.5], ['Physio', 't-blue', 1.0], ['Counselling', 't-teal', 0], ['Vision', 't-teal', 1.5], ['Dental', 't-blue', 0], ['Chiropractic', 't-green', 0]];
    const tick = '<svg class="tick" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0F1729" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;box-sizing:border-box;border-radius:20px;padding:4px;border:3px solid rgba(250,250,247,0.55)"><path class="tick-p" d="M5 12.5l4.5 4.5L19 7.5" style="opacity:0"/></svg>';
    const chips = names.map(([n, tone, at]) => '<div class="glass chip ' + tone + ' hk-chip" data-at="' + at + '">' + tick + '<span>' + n + '</span></div>').join('');
    kit.stage.append(kit.h(W.ground('<div class="hk-cam" style="position:absolute;inset:0">' +
      '<div class="words" style="left:80px;top:270px;width:860px"><p class="eyebrow">YOUR BENEFITS</p><h1 class="hook">What would you actually <span class="hk-hl">use</span>?</h1></div>' +
      '<div style="position:absolute;left:80px;top:900px;width:860px;display:flex;flex-wrap:wrap;gap:26px">' + chips + '</div></div>')));
    const q = (s) => kit.stage.querySelector(s);
    this.cam = q('.hk-cam'); this.hl = q('.hk-hl');
    this.chips = [...kit.stage.querySelectorAll('.hk-chip')].map((el) => ({ el, at: +el.dataset.at, tick: el.querySelector('.tick') }));
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.03, eio(seg(t, 0, 3))) + ')';
    const g = seg(t, 0.25, 0.45);
    this.hl.style.color = g > 0.5 ? '#48BE5C' : '#FAFAF7';
    const dim = eo(seg(t, 1.9, 2.3));
    for (const c of this.chips) {
      if (c.at) {
        const k = seg(t, c.at, c.at + 0.35);
        const on = k > 0; c.tick.style.background = on ? '#48BE5C' : 'transparent'; c.tick.style.borderColor = on ? '#48BE5C' : 'rgba(250,250,247,0.55)'; c.tick.firstChild.style.opacity = on ? 1 : 0;
        c.el.style.opacity = lerp(0.6, 1, Math.min(1, k * 2)).toFixed(3);
        c.el.style.transform = 'scale(' + (k > 0 ? lerp(1.14, 1, eob(k, 1.4)) : 1).toFixed(3) + ')';
      } else {
        c.el.style.opacity = lerp(0.6, 0.3, dim).toFixed(3);
      }
    }
  },
});
