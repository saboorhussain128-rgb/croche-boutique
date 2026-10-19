/**
 * The Crochet Boutique - Ultra-Premium Festive Themes & Template Manager
 * Controls full website transformation across Christmas, Diwali, New Year, Holi, Eid, and Classic.
 * Includes Web Audio Celebration Chimes, Festive Bottom Showcase Banners & Dynamic Product Badges.
 */

const FESTIVE_THEMES = {
  "christmas": {
    id: "christmas",
    name: "Christmas",
    alias: "cricshams",
    tag: "Holiday Season & Warmth",
    icon: "fa-tree",
    badge: "🎄 Holiday Special",
    announcement: "🎄 Merry Christmas & Holiday Collection • Warm Handcrafted Knits & Festive Gifts • Worldwide Shipping",
    heroPill: "🎄 Handcrafted Holiday Collection • Spreading Cozy Joy",
    heroTitlePrefix: "Festive Knits, Warm Moments & ",
    heroTitleAccent: "Holiday Magic.",
    heroSubtitle: "Celebrate the season of joy with handcrafted holiday cardigans, warm waffle scarves, and heirloom Christmas keepsakes.",
    colors: ["#C41E3A", "#165B33", "#D4AF37"],
    animationTag: "3D Snowflakes, Baubles & Golden Bells (Hero Top)",
    desc: "Festive ruby red & evergreen pine palette, 3D tumbling multifaceted snowflakes, swaying golden baubles, and ringing brass bells strictly in the hero top section.",
    bottomTitle: "Merry Christmas & Holiday Collection",
    bottomSubtitle: "Celebrate the season of joy with warm handcrafted crochet sweaters, cozy waffle mufflers, and heirloom keepsakes.",
    bottomCta: "Order Holiday Knits"
  },
  "diwali": {
    id: "diwali",
    name: "Diwali (Deepavali)",
    alias: "diwali",
    tag: "Festival of Lights",
    icon: "fa-sun",
    badge: "🪔 Shubh Diwali",
    announcement: "🪔 Happy Diwali & Festive Season • Handcrafted Gifts of Love & Light • Worldwide Shipping",
    heroPill: "🪔 Handcrafted with Light • Auspicious Festival Gifts",
    heroTitlePrefix: "Golden Threads, Warm Moments & ",
    heroTitleAccent: "Festive Radiance.",
    heroSubtitle: "Illuminate your celebrations with auspicious handcrafted crochet creations, warm festive shawls, and luminous handmade treasures.",
    colors: ["#E65100", "#FFB300", "#6A1B9A"],
    animationTag: "3D Glowing Diyas, Sky Lanterns & Petals (Hero Top)",
    desc: "Auspicious deep saffron, golden marigold & royal plum, with 3D floating clay Diyas, dynamic flickering flames, and Akash Kandil sky lanterns in hero top.",
    bottomTitle: "Auspicious Handcrafted Diwali Gifts & Decor",
    bottomSubtitle: "Illuminate your festive home with handmade crochet torans, auspicious festive shawls, and luminous handcrafted gifts.",
    bottomCta: "Order Diwali Special"
  },
  "newyear": {
    id: "newyear",
    name: "New Year",
    alias: "new year",
    tag: "Midnight Luxury & Starlight",
    icon: "fa-champagne-glasses",
    badge: "✨ 2026 Celebration Drop",
    announcement: "✨ Happy New Year 2026 • Welcome Fresh Beginnings with Handcrafted Luxury • Worldwide Shipping",
    heroPill: "✨ New Year 2026 Drop • Celebrating Fresh Beginnings",
    heroTitlePrefix: "New Beginnings, Warm Moments & ",
    heroTitleAccent: "Bespoke Elegance.",
    heroSubtitle: "Step into the new year wrapped in slow-stitched elegance, bespoke handcrafted knits, and celebratory bespoke creations.",
    colors: ["#D4AF37", "#0C1017", "#FFDF00"],
    animationTag: "3D Aerial Fireworks & Metallic Confetti (Hero Top)",
    desc: "Cosmic midnight starlight black & 24K champagne gold theme, 3D perspective aerial fireworks with spherical starbursts in the hero top sky.",
    bottomTitle: "Celebrate New Beginnings in Handcrafted Luxury",
    bottomSubtitle: "Step into 2026 wrapped in bespoke slow-stitched elegance, artisanal knits, and celebratory bespoke creations.",
    bottomCta: "Order New Year Drop"
  },
  "holi": {
    id: "holi",
    name: "Holi",
    alias: "holi",
    tag: "Festival of Vibrant Colors",
    icon: "fa-palette",
    badge: "🎨 Rang Barse Edition",
    announcement: "🎨 Happy Holi • Splashes of Handmade Happiness & Joyful Colors • Worldwide Shipping",
    heroPill: "🎨 Color Fest Edition • Splashes of Handmade Happiness",
    heroTitlePrefix: "Joyful Hues, Warm Moments & ",
    heroTitleAccent: "Vibrant Crochet.",
    heroSubtitle: "Celebrate the spectrum of life with joyful handcrafted pieces, vibrant pastel gradients, and playful artisanal slow-stitches.",
    colors: ["#E91E63", "#00ACC1", "#FF9800"],
    animationTag: "3D Volumetric Gulal Clouds (Hero Top)",
    desc: "Radiant gulal magenta, turquoise & sun saffron palette with 3D swirling volumetric powder clouds and interactive color splashes in the hero.",
    bottomTitle: "Vibrant Handcrafted Splashes of Happiness",
    bottomSubtitle: "Celebrate life's joyful colors with playful pastel granny squares, rainbow bucket hats, and artisanal slow-stitched pieces.",
    bottomCta: "Order Holi Colors"
  },
  "eid-fitr": {
    id: "eid-fitr",
    name: "Eid-ul-Fitr",
    alias: "eid-ul fitar",
    tag: "Eid Mubarak Celebration",
    icon: "fa-moon",
    badge: "🌙 Eid Mubarak Special",
    announcement: "🌙 Eid Mubarak • Blessed Handcrafted Gifts for You & Your Loved Ones • Worldwide Shipping",
    heroPill: "🌙 Eid Mubarak Edition • Blessed Handmade Keepsakes",
    heroTitlePrefix: "Serene Stitches, Warm Moments & ",
    heroTitleAccent: "Crescent Blessings.",
    heroSubtitle: "Celebrate blessed Eid festivities with heirloom crochet garments, delicate modest dresses, and thoughtful handcrafted gift hampers.",
    colors: ["#0D6938", "#C59B27", "#2E7D32"],
    animationTag: "3D Golden Crescent, Stars & Fanoos (Hero Top)",
    desc: "Sacred emerald green & radiant crescent gold with 3D metallic rotating crescent moon, swaying illuminated Arabic lanterns in hero top.",
    bottomTitle: "Blessed Eid Mubarak Celebrations & Keepsakes",
    bottomSubtitle: "Heirloom handcrafted garments, modest festive dresses, and delicate gift hampers woven with barakah & love.",
    bottomCta: "Order Eid Mubarak Piece"
  },
  "eid-adha": {
    id: "eid-adha",
    name: "Eid-ul-Adha",
    alias: "eid-ul azha",
    tag: "Sacred Blessings & Devotion",
    icon: "fa-mosque",
    badge: "🕌 Eid-ul-Adha Mubarak",
    announcement: "🕌 Eid-ul-Adha Mubarak • Season of Sacrifice, Blessings & Gratitude • Worldwide Shipping",
    heroPill: "🕌 Eid-ul-Adha Collection • Heirloom Crafts of Devotion",
    heroTitlePrefix: "Royal Weaves, Warm Moments & ",
    heroTitleAccent: "Sacred Celebrations.",
    heroSubtitle: "Honor the sacred celebration with bespoke artisan shawls, warm winter cardigans, and cherished handcrafted family heirlooms.",
    colors: ["#153B64", "#D4AF37", "#B8860B"],
    animationTag: "3D 8-Pointed Rub-el-Hizb & Moroccan Lanterns (Hero Top)",
    desc: "Majestic sapphire blue & Moroccan antique gold with 3D rotating geometric Islamic stars, illuminated filigree lanterns in hero top.",
    bottomTitle: "Sacred Devotion & Imperial Handcrafted Knits",
    bottomSubtitle: "Honor the sacred celebration with bespoke artisan shawls, warm winter cardigans, and treasured handcrafted heirlooms.",
    bottomCta: "Order Eid-ul-Adha Special"
  },
  "default": {
    id: "default",
    name: "Classic Boutique",
    alias: "classic",
    tag: "Artisanal Original",
    icon: "fa-heart",
    badge: "",
    announcement: "🌸 Handcrafted with Love • Custom Color Orders Available • Worldwide Shipping",
    heroPill: "🌸 100% Stitched by Hand with Patience & Care",
    heroTitlePrefix: "Soft Stitches, Warm Moments & ",
    heroTitleAccent: "Bespoke Crochet.",
    heroSubtitle: "Welcome to The Crochet Boutique! From heirloom baby sets to chunky granny square totes — every piece is individually handcrafted just for you.",
    colors: ["#C86D76", "#537566", "#D7993E"],
    animationTag: "3D Rose Petals (Hero Top)",
    desc: "Cozy artisanal pastel dusty rose, sage green & warm cream aesthetic with soft slow-floating cherry blossom petals in the hero top.",
    bottomTitle: "Slow-Crafted with Patience, Love & Warmth",
    bottomSubtitle: "From heirloom baby sets to custom color block tops — every single piece is individually handcrafted just for you in Hyderabad.",
    bottomCta: "Request Custom Piece"
  }
};

let currentActiveTheme = "default";

// ==========================================================================
// PURE WEB AUDIO API FESTIVE CHIME SYNTHESIZER
// Zero external files • Lightweight • High-Fidelity Celebratory Sound FX
// ==========================================================================
const FestiveAudio = {
  ctx: null,
  enabled: false,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  playNote(freq, startTime, duration, type = "sine", gainVal = 0.15) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Festive audio note error:", e);
    }
  },

  playFestiveChime(themeId) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;

    if (themeId === "christmas") {
      this.playNote(659.25, t, 0.4, "triangle", 0.18);
      this.playNote(783.99, t + 0.12, 0.45, "triangle", 0.18);
      this.playNote(1318.51, t + 0.25, 0.7, "sine", 0.2);
    } else if (themeId === "diwali") {
      this.playNote(261.63, t, 0.6, "triangle", 0.2);
      this.playNote(392.00, t + 0.12, 0.6, "sine", 0.18);
      this.playNote(523.25, t + 0.24, 0.7, "sine", 0.2);
      this.playNote(587.33, t + 0.36, 0.9, "triangle", 0.15);
    } else if (themeId === "newyear") {
      this.playNote(523.25, t, 0.35, "sine", 0.2);
      this.playNote(659.25, t + 0.1, 0.35, "sine", 0.22);
      this.playNote(783.99, t + 0.2, 0.4, "sine", 0.24);
      this.playNote(1046.50, t + 0.32, 0.9, "triangle", 0.28);
    } else if (themeId === "holi") {
      this.playNote(698.46, t, 0.25, "triangle", 0.2);
      this.playNote(880.00, t + 0.08, 0.25, "triangle", 0.2);
      this.playNote(1046.50, t + 0.16, 0.3, "sine", 0.22);
      this.playNote(1318.51, t + 0.24, 0.6, "sine", 0.2);
    } else if (themeId === "eid-fitr" || themeId === "eid-adha") {
      this.playNote(293.66, t, 0.8, "sine", 0.22);
      this.playNote(440.00, t + 0.15, 0.85, "sine", 0.2);
      this.playNote(739.99, t + 0.3, 0.9, "sine", 0.18);
      this.playNote(880.00, t + 0.45, 1.2, "sine", 0.2);
    } else {
      this.playNote(523.25, t, 0.4, "sine", 0.15);
      this.playNote(783.99, t + 0.15, 0.6, "sine", 0.15);
    }
  }
};

/**
 * Remove any festive badges from product cards so products remain 100% clean
 */
function removeProductFestiveBadges() {
  document.querySelectorAll(".festive-product-badge").forEach(el => el.remove());
}
window.removeProductFestiveBadges = removeProductFestiveBadges;
window.FESTIVE_THEMES = FESTIVE_THEMES;

/**
 * Apply a Festive Theme across the entire website
 * @param {string} themeId - Theme identifier
 * @param {object} options - Options { persist: boolean, showToast: boolean, playAudio: boolean }
 */
function applyFestiveTheme(themeId, options = { persist: true, showToast: false, playAudio: false }) {
  const theme = FESTIVE_THEMES[themeId] || FESTIVE_THEMES["default"];
  currentActiveTheme = theme.id;

  // 1. Set HTML Attribute to trigger CSS root palette variables
  document.documentElement.setAttribute("data-theme", theme.id);

  // 2. Transform Announcement Bar
  const announcementEl = document.getElementById("announcementText");
  if (announcementEl) {
    announcementEl.textContent = theme.announcement;
  }

  // 3. Transform Hero Section
  const heroPill = document.querySelector(".hero-pill");
  if (heroPill) {
    heroPill.innerHTML = `<i class="fas ${theme.icon}"></i> ${theme.heroPill}`;
  }

  const heroHeading = document.querySelector(".hero-content h1");
  if (heroHeading) {
    heroHeading.innerHTML = `${theme.heroTitlePrefix}<span>${theme.heroTitleAccent}</span>`;
  }

  const heroSub = document.querySelector(".hero-content p");
  if (heroSub && theme.heroSubtitle) {
    heroSub.innerHTML = theme.heroSubtitle;
  }

  // 4. Products remain completely clean (remove any badge)
  removeProductFestiveBadges();

  // 5. Update 3D Canvas Animation Layer (Confined strictly to Hero Top Section)
  if (window.Festive3DEngine) {
    window.Festive3DEngine.setTheme(theme.id);
  }

  // 6. Transform Festive Bottom Showcase Banner
  const bottomEmblem = document.getElementById("festiveBottomEmblem");
  if (bottomEmblem) {
    bottomEmblem.innerHTML = `<i class="fas ${theme.icon}"></i>`;
  }
  const bottomTitle = document.getElementById("festiveBottomTitle");
  if (bottomTitle && theme.bottomTitle) {
    bottomTitle.textContent = theme.bottomTitle;
  }
  const bottomSubtitle = document.getElementById("festiveBottomSubtitle");
  if (bottomSubtitle && theme.bottomSubtitle) {
    bottomSubtitle.textContent = theme.bottomSubtitle;
  }
  const bottomCta = document.getElementById("festiveBottomCta");
  if (bottomCta && theme.bottomCta) {
    bottomCta.innerHTML = `<i class="fas fa-gift"></i> ${theme.bottomCta}`;
  }

  // 7. Update Quick Navbar Theme Pill if present
  const navThemeLabel = document.getElementById("navThemeLabel");
  const navThemeIcon = document.getElementById("navThemeIcon");
  if (navThemeLabel) {
    navThemeLabel.textContent = theme.name;
  }
  if (navThemeIcon) {
    navThemeIcon.className = `fas ${theme.icon}`;
  }

  // 8. Update Active State in Modal Theme Cards
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach(card => {
    const cid = card.getAttribute("data-theme-id");
    if (cid === theme.id) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // 9. Play Optional Web Audio Festive Chime
  if (options.playAudio) {
    FestiveAudio.playFestiveChime(theme.id);
  }

  // 10. Persist to LocalStorage
  if (options.persist) {
    localStorage.setItem("crochet_active_theme", theme.id);
  }

  if (options.showToast && typeof showToast === "function") {
    showToast(`✨ Applied "${theme.name}" Theme!`);
  }
}

/**
 * Render Theme Cards inside the Festive Theme Modal
 */
function renderFestiveThemeCards() {
  const grid = document.getElementById("festiveThemeGrid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.values(FESTIVE_THEMES).forEach(theme => {
    const isActive = (theme.id === currentActiveTheme);
    const card = document.createElement("div");
    card.className = `theme-card ${isActive ? "active" : ""}`;
    card.setAttribute("data-theme-id", theme.id);

    card.innerHTML = `
      <div class="theme-card-header">
        <div class="theme-card-title-group">
          <div class="theme-card-icon" style="background: ${theme.colors[0]}20; color: ${theme.colors[0]};">
            <i class="fas ${theme.icon}"></i>
          </div>
          <div>
            <div class="theme-card-name">${theme.name}</div>
            <div class="theme-card-tag">${theme.tag}</div>
          </div>
        </div>
        <span class="theme-active-badge">
          <i class="fas fa-check-circle"></i> Active
        </span>
      </div>

      <div class="theme-palette-preview">
        <div class="palette-swatch" style="background: ${theme.colors[0]};" title="Primary Color"></div>
        <div class="palette-swatch" style="background: ${theme.colors[1]};" title="Secondary Color"></div>
        <div class="palette-swatch" style="background: ${theme.colors[2]};" title="Accent Gold/Tint"></div>
      </div>

      <p class="theme-card-desc">${theme.desc}</p>
      <div class="theme-3d-tag">
        <i class="fas fa-cube"></i> ${theme.animationTag}
      </div>

      <div class="theme-card-footer">
        <button type="button" class="theme-btn-preview" title="Preview this theme without saving">
          <i class="fas fa-eye"></i> Preview
        </button>
        <button type="button" class="theme-btn-apply" title="Apply and make this the live store theme">
          <i class="fas fa-wand-magic-sparkles"></i> Apply Live
        </button>
      </div>
    `;

    // Preview button
    card.querySelector(".theme-btn-preview").addEventListener("click", (e) => {
      e.stopPropagation();
      applyFestiveTheme(theme.id, { persist: false, showToast: true, playAudio: true });
    });

    // Apply Live button
    card.querySelector(".theme-btn-apply").addEventListener("click", (e) => {
      e.stopPropagation();
      applyFestiveTheme(theme.id, { persist: true, showToast: true, playAudio: true });
      closeFestiveThemeModal();
    });

    // Clicking anywhere on card applies live
    card.addEventListener("click", () => {
      applyFestiveTheme(theme.id, { persist: true, showToast: true, playAudio: true });
      closeFestiveThemeModal();
    });

    grid.appendChild(card);
  });
}

function openFestiveThemeModal() {
  const modal = document.getElementById("festiveThemeModal");
  if (!modal) return;
  renderFestiveThemeCards();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFestiveThemeModal() {
  const modal = document.getElementById("festiveThemeModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D Engine
  if (window.Festive3DEngine) {
    window.Festive3DEngine.init();
  }

  // Load and apply saved theme
  const savedTheme = localStorage.getItem("crochet_active_theme") || 
                     (typeof ACTIVE_FESTIVE_THEME !== "undefined" ? ACTIVE_FESTIVE_THEME : "default");
  applyFestiveTheme(savedTheme, { persist: false, playAudio: false });

  // Ensure products remain clean without any badges
  removeProductFestiveBadges();

  // Bind Open/Close Buttons
  const btnOpenTheme = document.getElementById("btnOpenThemeModal");
  if (btnOpenTheme) {
    btnOpenTheme.addEventListener("click", openFestiveThemeModal);
  }

  const btnModalFestiveTheme = document.getElementById("btnModalFestiveTheme");
  if (btnModalFestiveTheme) {
    btnModalFestiveTheme.addEventListener("click", () => {
      if (typeof closeStaffModal === "function") closeStaffModal();
      openFestiveThemeModal();
    });
  }

  const btnNavThemeToggle = document.getElementById("btnNavThemeToggle");
  if (btnNavThemeToggle) {
    btnNavThemeToggle.addEventListener("click", openFestiveThemeModal);
  }

  const festiveThemeCloseBtn = document.getElementById("festiveThemeCloseBtn");
  if (festiveThemeCloseBtn) {
    festiveThemeCloseBtn.addEventListener("click", closeFestiveThemeModal);
  }

  const festiveThemeModal = document.getElementById("festiveThemeModal");
  if (festiveThemeModal) {
    festiveThemeModal.addEventListener("click", (e) => {
      if (e.target === festiveThemeModal) closeFestiveThemeModal();
    });
  }

  // 3D Animation Toggle Switch
  const toggle3DAnim = document.getElementById("toggle3DAnim");
  if (toggle3DAnim && window.Festive3DEngine) {
    toggle3DAnim.addEventListener("change", (e) => {
      window.Festive3DEngine.setEnabled(e.target.checked);
      if (typeof showToast === "function") {
        showToast(e.target.checked ? "✨ 3D Animations Enabled" : "3D Animations Paused");
      }
    });
  }

  // 3D Intensity Selector
  const select3DIntensity = document.getElementById("select3DIntensity");
  if (select3DIntensity && window.Festive3DEngine) {
    select3DIntensity.addEventListener("change", (e) => {
      window.Festive3DEngine.setIntensity(e.target.value);
    });
  }

  // Sound FX Toggle Switch
  const toggleFestiveSound = document.getElementById("toggleFestiveSound");
  if (toggleFestiveSound) {
    toggleFestiveSound.addEventListener("change", (e) => {
      FestiveAudio.enabled = e.target.checked;
      if (e.target.checked) {
        FestiveAudio.playFestiveChime(currentActiveTheme);
      }
    });
  }
});
