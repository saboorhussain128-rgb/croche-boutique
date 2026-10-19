/**
 * The Crochet Boutique - Festive Themes & Template Manager
 * Controls full website transformation across Christmas, Diwali, New Year, Holi, Eid, and Classic.
 */

const FESTIVE_THEMES = {
  "christmas": {
    id: "christmas",
    name: "Christmas",
    alias: "cricshams",
    tag: "Holiday Season & Warmth",
    icon: "fa-tree",
    badge: "🎄 Merry Christmas",
    announcement: "🎄 Merry Christmas & Holiday Collection • Warm Handcrafted Knits & Festive Gifts • Worldwide Shipping",
    heroPill: "🎄 Handcrafted Holiday Collection • Spreading Cozy Joy",
    heroTitlePrefix: "Festive Knits, Warm Moments & ",
    heroTitleAccent: "Holiday Magic.",
    heroSubtitle: "Celebrate the season of joy with handcrafted holiday cardigans, warm waffle scarves, and heirloom Christmas keepsakes.",
    colors: ["#C41E3A", "#165B33", "#D4AF37"],
    animationTag: "3D Snowflakes & Baubles",
    desc: "Festive ruby red & evergreen pine palette, 3D tumbling multifaceted snowflakes, swaying golden baubles, and sparkling snow flurry."
  },
  "diwali": {
    id: "diwali",
    name: "Diwali (Deepavali)",
    alias: "diwali",
    tag: "Festival of Lights",
    icon: "fa-sun",
    badge: "🪔 Happy Diwali",
    announcement: "🪔 Happy Diwali & Festive Season • Handcrafted Gifts of Love & Light • Worldwide Shipping",
    heroPill: "🪔 Handcrafted with Light • Auspicious Festival Gifts",
    heroTitlePrefix: "Golden Threads, Warm Moments & ",
    heroTitleAccent: "Festive Radiance.",
    heroSubtitle: "Illuminate your celebrations with auspicious handcrafted crochet creations, warm festive shawls, and luminous handmade treasures.",
    colors: ["#E65100", "#FFB300", "#6A1B9A"],
    animationTag: "3D Glowing Diyas & Petals",
    desc: "Auspicious deep saffron, golden marigold & royal plum, with 3D floating clay Diyas, dynamic flickering flames, and tumbling rangoli petals."
  },
  "newyear": {
    id: "newyear",
    name: "New Year",
    alias: "new year",
    tag: "Countdown & Midnight Luxury",
    icon: "fa-champagne-glasses",
    badge: "✨ Happy New Year 2026",
    announcement: "✨ Happy New Year 2026 • Welcome Fresh Beginnings with Handcrafted Luxury • Worldwide Shipping",
    heroPill: "✨ New Year 2026 Drop • Celebrating Fresh Beginnings",
    heroTitlePrefix: "New Beginnings, Warm Moments & ",
    heroTitleAccent: "Bespoke Elegance.",
    heroSubtitle: "Step into the new year wrapped in slow-stitched elegance, bespoke handcrafted knits, and celebratory bespoke creations.",
    colors: ["#D4AF37", "#171E2A", "#FFDF00"],
    animationTag: "3D Fireworks & Confetti",
    desc: "Midnight starlight black & champagne gold theme, 3D perspective fireworks bursts with particle shockwaves, and metallic tumbling confetti."
  },
  "holi": {
    id: "holi",
    name: "Holi",
    alias: "holi",
    tag: "Festival of Vibrant Colors",
    icon: "fa-palette",
    badge: "🎨 Happy Holi",
    announcement: "🎨 Happy Holi • Splashes of Handmade Happiness & Joyful Colors • Worldwide Shipping",
    heroPill: "🎨 Color Fest Edition • Splashes of Handmade Happiness",
    heroTitlePrefix: "Joyful Hues, Warm Moments & ",
    heroTitleAccent: "Vibrant Crochet.",
    heroSubtitle: "Celebrate the spectrum of life with joyful handcrafted pieces, vibrant pastel gradients, and playful artisanal slow-stitches.",
    colors: ["#E91E63", "#00ACC1", "#FF9800"],
    animationTag: "3D Gulal Clouds & Splashes",
    desc: "Radiant gulal magenta, turquoise & sun saffron palette with 3D swirling volumetric powder clouds and interactive color splashes."
  },
  "eid-fitr": {
    id: "eid-fitr",
    name: "Eid-ul-Fitr",
    alias: "eid-ul fitar",
    tag: "Eid Mubarak Celebration",
    icon: "fa-moon",
    badge: "🌙 Eid Mubarak",
    announcement: "🌙 Eid Mubarak • Blessed Handcrafted Gifts for You & Your Loved Ones • Worldwide Shipping",
    heroPill: "🌙 Eid Mubarak Edition • Blessed Handmade Keepsakes",
    heroTitlePrefix: "Serene Stitches, Warm Moments & ",
    heroTitleAccent: "Crescent Blessings.",
    heroSubtitle: "Celebrate blessed Eid festivities with heirloom crochet garments, delicate modest dresses, and thoughtful handcrafted gift hampers.",
    colors: ["#0D6938", "#C59B27", "#2E7D32"],
    animationTag: "3D Golden Crescent & Lanterns",
    desc: "Sacred emerald green & radiant crescent gold with 3D metallic rotating crescent moon, swaying illuminated Arabic lanterns, and stardust."
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
    animationTag: "3D Geometric Stars & Lanterns",
    desc: "Majestic sapphire blue & Moroccan antique gold with 3D rotating geometric Islamic stars, illuminated filigree lanterns, and sacred bokeh."
  },
  "default": {
    id: "default",
    name: "Classic Boutique",
    alias: "classic",
    tag: "Artisanal Original",
    icon: "fa-heart",
    badge: "🌸 Handcrafted",
    announcement: "🌸 Handcrafted with Love • Custom Color Orders Available • Worldwide Shipping",
    heroPill: "🌸 100% Stitched by Hand with Patience & Care",
    heroTitlePrefix: "Soft Stitches, Warm Moments & ",
    heroTitleAccent: "Bespoke Crochet.",
    heroSubtitle: "Welcome to The Crochet Boutique! From heirloom baby sets to chunky granny square totes — every piece is individually handcrafted just for you.",
    colors: ["#C86D76", "#537566", "#D7993E"],
    animationTag: "3D Rose Petals",
    desc: "Cozy artisanal pastel dusty rose, sage green & warm cream aesthetic with soft slow-floating cherry blossom petals."
  }
};

let currentActiveTheme = "default";

/**
 * Apply a Festive Theme across the entire website
 * @param {string} themeId - Theme identifier
 * @param {object} options - Options { persist: boolean, showToast: boolean }
 */
function applyFestiveTheme(themeId, options = { persist: true, showToast: false }) {
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

  // 4. Update 3D Canvas Animation Layer
  if (window.Festive3DEngine) {
    window.Festive3DEngine.setTheme(theme.id);
  }

  // 5. Update Quick Navbar Theme Pill if present
  const navThemeLabel = document.getElementById("navThemeLabel");
  const navThemeIcon = document.getElementById("navThemeIcon");
  if (navThemeLabel) {
    navThemeLabel.textContent = theme.name;
  }
  if (navThemeIcon) {
    navThemeIcon.className = `fas ${theme.icon}`;
  }

  // 6. Update Active State in Modal Theme Cards
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach(card => {
    const cid = card.getAttribute("data-theme-id");
    if (cid === theme.id) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // 7. Persist to LocalStorage
  if (options.persist) {
    localStorage.setItem("crochet_active_theme", theme.id);
  }

  if (options.showToast && typeof showToast === "function") {
    showToast(`✨ Applied "${theme.name}" Theme & 3D Animations!`);
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
        <div class="palette-swatch" style="background: ${theme.colors[0]};" title="Primary"></div>
        <div class="palette-swatch" style="background: ${theme.colors[1]};" title="Secondary"></div>
        <div class="palette-swatch" style="background: ${theme.colors[2]};" title="Accent"></div>
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
      applyFestiveTheme(theme.id, { persist: false, showToast: true });
    });

    // Apply Live button
    card.querySelector(".theme-btn-apply").addEventListener("click", (e) => {
      e.stopPropagation();
      applyFestiveTheme(theme.id, { persist: true, showToast: true });
      closeFestiveThemeModal();
    });

    // Clicking anywhere on card applies live
    card.addEventListener("click", () => {
      applyFestiveTheme(theme.id, { persist: true, showToast: true });
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
  applyFestiveTheme(savedTheme, { persist: false });

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
});
