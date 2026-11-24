// BenefitTrack's blueprint world. Scenes stage these; none redraws one.
window.W = {
  // The blueprint ground: a lifted centre, a faint grid that fades to the edges, a soft blue glow top left.
  ground(extra) {
    return '<div class="ground"><div class="bp-air"></div><div class="bp-grid"></div><div class="bp-glow"></div>' + (extra || '') + '</div>';
  },
  // A dense plan booklet: a glass card full of unreadable fine print. Its title is one line of words.
  booklet(kit, cls) {
    const r = kit.rng(7); let lines = '';
    for (let i = 0; i < 26; i++) {
      const head = r() < 0.14, w = head ? 180 + r() * 160 : 340 + r() * 220;
      lines += '<div style="height:' + (head ? 16 : 9) + 'px;width:' + w.toFixed(0) + 'px;border-radius:5px;margin-top:' + (head ? 22 : 13) + 'px;background:color-mix(in srgb, var(--second) ' + (head ? 55 : 26) + '%, transparent)"></div>';
    }
    return '<div class="glass t-blue ' + cls + '" style="width:640px;height:860px;padding:52px 48px"><div class="card-title" style="font-size:54px;font-family:Geist-Black">Benefits booklet</div><div class="card-sub" style="margin-top:10px">Group plan: terms, limits and exclusions</div>' + lines + '</div>';
  },
  // The BenefitTrack hub: their real shield in a glowing green ring.
  hub(kit, cls) {
    return '<div class="' + cls + '" style="position:absolute;width:300px;height:300px;margin:-150px 0 0 -150px"><div style="position:absolute;inset:-70px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 45%, transparent), transparent)"></div><div style="position:absolute;inset:0;border-radius:50%;border:6px solid var(--main);background:color-mix(in srgb, var(--ink) 90%, transparent)"></div><img src="' + kit.assets.url('shield.png') + '" alt="" style="position:absolute;left:78px;top:68px;width:144px;height:164px;object-fit:contain"></div>';
  },
  // A plain balance card: what is left and when it resets.
  balance(cls, tone, name, amt, reset) {
    return '<div class="glass ' + tone + ' ' + cls + '" style="width:520px;padding:26px 32px;display:flex;flex-direction:column;gap:6px"><div class="card-sub" style="color:var(--second)">' + name + '</div><div class="amt">' + amt + '</div><div class="card-sub">' + reset + '</div></div>';
  },
};
