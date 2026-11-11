// BenefitTrack's blueprint world. Scenes stage these; none redraws one.
window.W = {
  ground(extra) {
    return '<div class="ground"><div class="bp-air"></div><div class="bp-grid"></div><div class="bp-glow"></div>' + (extra || '') + '</div>';
  },
  // The BenefitTrack shield in a glowing green ring.
  hub(kit, cls) {
    return '<div class="' + cls + '" style="position:absolute;width:300px;height:300px;margin:-150px 0 0 -150px"><div style="position:absolute;inset:-70px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 45%, transparent), transparent)"></div><div style="position:absolute;inset:0;border-radius:50%;border:6px solid var(--main);background:color-mix(in srgb, var(--ink) 90%, transparent)"></div><img src="' + kit.assets.url('shield.png') + '" alt="" style="position:absolute;left:78px;top:68px;width:144px;height:164px;object-fit:contain"></div>';
  },
};
