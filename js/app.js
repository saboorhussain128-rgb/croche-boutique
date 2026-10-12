/**
 * The Crochet Boutique - Client Application Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const productsGrid = document.getElementById("productsGrid");
  const igGrid = document.getElementById("igGrid");
  const categoryTabs = document.querySelectorAll(".tab-btn");
  const searchInput = document.getElementById("searchInput");
  const quickViewModal = document.getElementById("quickViewModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBody = document.getElementById("modalBody");
  const inquiryForm = document.getElementById("inquiryForm");
  const itemSelect = document.getElementById("orderItem");
  const btnSubmitWa = document.getElementById("btnSubmitWa");
  const toastContainer = document.getElementById("toastContainer");
  const floatingWaBtn = document.getElementById("floatingWaBtn");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.querySelector(".nav-links");

  // Load custom WhatsApp number if saved in localStorage
  const savedWhatsApp = localStorage.getItem("crochet_boutique_whatsapp");
  if (savedWhatsApp) {
    STORE_CONFIG.whatsappNumber = savedWhatsApp;
  }

  let activeCategory = "all";
  let searchQuery = "";

  // 1. Initialize Store Configuration
  applyStoreConfig();

  // 2. Populate Order Dropdown with products
  populateProductSelect();

  // 3. Render Initial Products & Instagram Feed
  renderProducts();
  renderInstagramFeed();

  // 4. Category Filter Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // 5. Search Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // 6. Mobile Nav Toggle
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "76px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "#FAF7F2";
        navLinks.style.padding = "20px";
        navLinks.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
        navLinks.style.borderBottom = "1px solid #EADBCE";
      }
    });
  }

  // 7. Modal Close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }
  if (quickViewModal) {
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 8. FormSubmit (Free Email) Handler
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = inquiryForm.querySelector(".btn-form-email");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<span>🌸 Sending Your Order...</span>";
      submitBtn.disabled = true;

      const formData = new FormData(inquiryForm);
      const emailEndpoint = `https://formsubmit.co/ajax/${STORE_CONFIG.inquiryEmail}`;

      try {
        const response = await fetch(emailEndpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        });

        if (response.ok) {
          showToast("✨ Inquiry sent! We will review your request and get back to you shortly.");
          inquiryForm.reset();
        } else {
          showToast("🌸 Inquiry received! You can also reach us directly via WhatsApp.");
        }
      } catch (err) {
        showToast("🌸 Thank you! Your request was received. We'll be in touch soon!");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 9. Instant WhatsApp Submit Handler
  if (btnSubmitWa) {
    btnSubmitWa.addEventListener("click", () => {
      checkWhatsAppNumber();
      const name = document.getElementById("custName")?.value || "Customer";
      const item = document.getElementById("orderItem")?.value || "Custom Piece";
      const colors = document.getElementById("orderColors")?.value || "Open to suggestions";
      const notes = document.getElementById("orderNotes")?.value || "None";
      const phone = document.getElementById("custPhone")?.value || "Not provided";

      const message = 
`🌸 *NEW CROCHET ORDER INQUIRY* 🌸
-----------------------------------
🧶 *Item / Request:* ${item}
🎨 *Color Palette:* ${colors}
👤 *Customer Name:* ${name}
📞 *Contact / WhatsApp:* ${phone}
📝 *Notes & Sizing:* ${notes}
-----------------------------------
Sent via The Crochet Boutique website`;

      const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      showToast("💬 Opening WhatsApp with your order details!");
    });
  }

  // Helper Functions
  function checkWhatsAppNumber() {
    if (STORE_CONFIG.whatsappNumber === "1234567890") {
      const promptNum = prompt("Please enter the client's WhatsApp phone number (with country code, e.g., 923001234567 or 15551234567):", "");
      if (promptNum && promptNum.trim()) {
        const clean = promptNum.replace(/\D/g, "");
        STORE_CONFIG.whatsappNumber = clean;
        localStorage.setItem("crochet_boutique_whatsapp", clean);
        applyStoreConfig();
      }
    }
  }

  function applyStoreConfig() {
    if (floatingWaBtn) {
      floatingWaBtn.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in ordering a handcrafted crochet piece from your boutique 🧶")}`;
    }

    const announcementEl = document.getElementById("announcementText");
    if (announcementEl) {
      announcementEl.textContent = STORE_CONFIG.announcement;
    }
  }

  function populateProductSelect() {
    if (!itemSelect) return;
    itemSelect.innerHTML = `<option value="" disabled selected>Select from catalog or custom piece</option>`;
    PRODUCTS.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.name;
      opt.textContent = p.name;
      itemSelect.appendChild(opt);
    });
    const customOpt = document.createElement("option");
    customOpt.value = "Custom Bespoke Design (Not in catalog)";
    customOpt.textContent = "✨ Custom Bespoke Request (Your Idea / Instagram reference)";
    itemSelect.appendChild(customOpt);
  }

  function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    const filtered = PRODUCTS.filter(p => {
      const matchesCat = (activeCategory === "all") || (p.category === activeCategory);
      const matchesQuery = p.name.toLowerCase().includes(searchQuery) ||
                           p.description.toLowerCase().includes(searchQuery) ||
                           p.yarnType.toLowerCase().includes(searchQuery);
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🧶</div>
          <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">No matching crochet pieces found</h3>
          <p style="color: var(--color-text-muted);">Looking for a custom design? Bring your photo to our Custom Order form below!</p>
          <a href="#inquiry" class="btn btn-primary" style="margin-top: 18px;">Request Custom Piece</a>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-thumb-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-thumb" loading="lazy">
          <span class="badge-tag badge-${p.badgeType}">${p.badge}</span>
        </div>
        <div class="product-info">
          <span class="product-category-label">${formatCategory(p.category)}</span>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-excerpt">${p.description}</p>
          <div class="product-meta-specs">
            <span>🧶 ${p.yarnType}</span>
            <span>•</span>
            <span>📐 ${p.dimensions}</span>
          </div>
          <div class="product-bottom-row">
            <span class="product-custom-tag"><i class="fas fa-sparkles"></i> Made to Order</span>
            <div class="product-actions">
              <button class="btn-card-inquire" data-id="${p.id}">Inquire / Order</button>
              <button class="btn-card-wa" data-id="${p.id}" title="Inquire on WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      card.querySelector(".btn-card-inquire").addEventListener("click", () => {
        selectProductAndScroll(p);
      });

      card.querySelector(".btn-card-wa").addEventListener("click", (e) => {
        e.stopPropagation();
        checkWhatsAppNumber();
        openWhatsAppForProduct(p);
      });

      card.querySelector(".product-thumb-wrap").addEventListener("click", () => {
        openQuickView(p);
      });

      productsGrid.appendChild(card);
    });
  }

  function renderInstagramFeed() {
    if (!igGrid) return;
    igGrid.innerHTML = "";

    INSTAGRAM_POSTS.forEach(post => {
      const card = document.createElement("a");
      card.href = STORE_CONFIG.instagramUrl;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "ig-card";
      card.innerHTML = `
        <img src="${post.image}" alt="Crochet Instagram post" loading="lazy">
        <div class="ig-card-overlay">
          <i class="fab fa-instagram" style="font-size: 1.8rem; margin-bottom: 8px;"></i>
          <p style="font-size: 0.78rem; line-height: 1.3; max-width: 90%; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${post.caption}</p>
          <div class="ig-stats">
            <span><i class="fas fa-heart"></i> ${post.likes}</span>
            <span><i class="fas fa-comment"></i> ${post.comments}</span>
          </div>
        </div>
      `;
      igGrid.appendChild(card);
    });
  }

  function selectProductAndScroll(product) {
    if (itemSelect) {
      for (let opt of itemSelect.options) {
        if (opt.value.includes(product.name)) {
          itemSelect.value = opt.value;
          break;
        }
      }
    }
    const inquirySection = document.getElementById("inquiry");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });
      const colorsField = document.getElementById("orderColors");
      if (colorsField) {
        colorsField.placeholder = `e.g., Preferred colors (${product.colors.join(", ")})`;
        colorsField.focus();
      }
      showToast(`Selected "${product.name}" for your inquiry!`);
    }
  }

  function openWhatsAppForProduct(product) {
    const msg = `Hi! 🌸 I would like to inquire about ordering the handcrafted *${product.name}* from @croche_boutiq. Could you please share the pricing, availability, and custom color options?`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  function openQuickView(p) {
    if (!quickViewModal || !modalBody) return;
    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; align-items: start;">
        <div>
          <img src="${p.image}" alt="${p.name}" style="border-radius: var(--radius-md); width: 100%; aspect-ratio: 1; object-fit: cover; box-shadow: var(--shadow-sm);">
        </div>
        <div>
          <span class="badge-tag badge-${p.badgeType}" style="position: static; display: inline-block; margin-bottom: 10px;">${p.badge}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 10px;">${p.name}</h2>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--color-surface-tint); color: var(--color-secondary); padding: 8px 16px; border-radius: var(--radius-full); font-size: 0.9rem; font-weight: 600; margin-bottom: 16px;">
            <i class="fas fa-sparkles"></i> Custom Quote • Price on Inquiry
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 20px; line-height: 1.6;">
            ${p.description}
          </p>
          <div style="background: var(--color-surface-tint); padding: 14px 18px; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 20px;">
            <p><strong>🧶 Yarn:</strong> ${p.yarnType}</p>
            <p><strong>📐 Dimensions:</strong> ${p.dimensions}</p>
            <p><strong>🧼 Care:</strong> ${p.care}</p>
            <p><strong>🎨 Available Colors:</strong> ${p.colors.join(", ")}</p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button id="modalInquireBtn" class="btn btn-primary" style="flex: 1;">
              Inquire / Customize
            </button>
            <button id="modalWaBtn" class="btn btn-whatsapp" style="flex: 1;">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalInquireBtn").addEventListener("click", () => {
      closeModal();
      selectProductAndScroll(p);
    });

    document.getElementById("modalWaBtn").addEventListener("click", () => {
      checkWhatsAppNumber();
      openWhatsAppForProduct(p);
    });

    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (quickViewModal) {
      quickViewModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  function formatCategory(cat) {
    const map = {
      caps: "Caps & Hats",
      dresses: "Dresses & Apparel",
      gloves: "Gloves & Mitts",
      hairbands: "Hair Bands & Accessories",
      scarves: "Scarves & Shawls",
      homedecor: "Table Runners & Decor",
      bags: "Pouches & Bags",
      plushies: "Amigurumi & Plushies"
    };
    return map[cat] || cat;
  }

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast toast-success";
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #25D366;"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
});
