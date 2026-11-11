const { seg, eo, ei, eio, lerp, TextFx } = kit;
kit.scene('drop', {
  init(kit) {
    kit.stage.append(kit.h(W.ground('<div class="drop-cam" style="position:absolute;inset:0"><div class="drop-ring" style="position:absolute;left:720px;top:1120px;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;border:6px solid var(--main)"></div><div class="drop-hubpos" style="position:absolute;left:720px;top:1120px">' + W.hub(kit, 'drop-hub') + '</div><div class="drop-bk" style="position:absolute;left:0;top:0;transform-origin:0 0">' + W.booklet(kit, 'drop-card') + '</div></div><div class="words" style="left:80px;top:290px;width:860px"><div class="step drop-step" style="background:var(--accent)">1</div><h2 class="line drop-line">Drop in the booklet</h2><p class="sub drop-sub">See what the plan covers, in plain language.</p></div>')));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.drop-cam'), bk: q('.drop-bk'), hub: q('.drop-hubpos'), ring: q('.drop-ring'), step: q('.drop-step'), line: q('.drop-line'), sub: q('.drop-sub') });
  },
  render(t) {
    this.cam.style.transform = 'scale(' + lerp(1.0, 1.025, eio(seg(t, 0, 3.5))) + ')';
    // the booklet waits on the left, then is pulled into the shield
    const k = ei(seg(t, 1.0, 1.9));
    const sc = lerp(0.42, 0.04, k), x = lerp(150, 720, k) - 320 * sc, y = lerp(1120, 1120, k) - 430 * sc;
    this.bk.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (y + 4 * Math.sin(t * 2)).toFixed(1) + 'px) scale(' + sc.toFixed(3) + ') rotate(' + lerp(-3, 18, k).toFixed(2) + 'deg)';
    this.bk.style.opacity = 1 - seg(t, 1.7, 1.95);
    // the hub arrives, then pulses as it swallows the booklet
    const a = eo(seg(t, -0.4, 0.5)), p = Math.sin(Math.PI * seg(t, 1.85, 2.3));
    this.hub.style.transform = 'scale(' + (lerp(0.6, 1, a) * (1 + 0.1 * p) * kit.breathe(t, 0.015, 3)).toFixed(3) + ')';
    this.hub.style.opacity = a;
    const r = seg(t, 1.9, 2.7);
    this.ring.style.transform = 'scale(' + lerp(1, 2.1, eo(r)).toFixed(3) + ')';
    this.ring.style.opacity = r > 0 && r < 1 ? 0.9 * (1 - r) : 0;
    this.step.style.opacity = eo(seg(t, -0.4, 0.1));
    this.step.style.transform = 'scale(' + lerp(0.7, 1, eo(seg(t, -0.4, 0.2))) + ')';
    TextFx.fadeFromRight(this.line, t, -0.2);
    this.sub.style.opacity = eo(seg(t, 0.5, 1.0));
  },
});
