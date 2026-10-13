/**
 * The Crochet Boutique - Client Application Logic
 * Featuring dynamic product specs, customer preferences (WhatsApp / Email / Both),
 * Staff & Owner Portal, Live Product Picture & Details Editing, and Instant Catalog Management.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Core Customer Elements
  const productsGrid = document.getElementById("productsGrid");
  const igGrid = document.getElementById("igGrid");
  const categoryTabs = document.querySelectorAll(".tab-btn");
  const searchInput = document.getElementById("searchInput");
  const quickViewModal = document.getElementById("quickViewModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBody = document.getElementById("modalBody");
  const inquiryForm = document.getElementById("inquiryForm");
  const itemSelect = document.getElementById("orderItem");
  const specsBox = document.getElementById("selectedProductSpecsBox");
  const channelRadios = document.querySelectorAll('input[name="deliveryChannel"]');
  const btnMainSubmit = document.getElementById("btnMainSubmit");
  const btnSubmitText = document.getElementById("btnSubmitText");
  const btnSubmitIcon = document.getElementById("btnSubmitIcon");
  const toastContainer = document.getElementById("toastContainer");
  const floatingWaBtn = document.getElementById("floatingWaBtn");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.querySelector(".nav-links");

  // Hero & Story Image Elements
  const heroMainImage = document.getElementById("heroMainImage");
  const storyMainImage = document.getElementById("storyMainImage");
  const btnEditHeroImage = document.getElementById("btnEditHeroImage");
  const btnEditStoryImage = document.getElementById("btnEditStoryImage");

  // Staff & Owner Elements
  const staffPortalBtn = document.getElementById("staffPortalBtn");
  const staffBtnLabel = document.getElementById("staffBtnLabel");
  const staffLoginModal = document.getElementById("staffLoginModal");
  const staffModalCloseBtn = document.getElementById("staffModalCloseBtn");
  const staffLoginForm = document.getElementById("staffLoginForm");
  const ownerAdminBar = document.getElementById("ownerAdminBar");
  const btnAdminAddProduct = document.getElementById("btnAdminAddProduct");
  const btnAdminExportData = document.getElementById("btnAdminExportData");
  const btnAdminResetDefaults = document.getElementById("btnAdminResetDefaults");
  const btnAdminLogout = document.getElementById("btnAdminLogout");

  // Product Editor Elements
  const productEditorModal = document.getElementById("productEditorModal");
  const productEditorCloseBtn = document.getElementById("productEditorCloseBtn");
  const productEditorForm = document.getElementById("productEditorForm");
  const editProductId = document.getElementById("editProductId");
  const editorModalTitle = document.getElementById("editorModalTitle");
  const editorModalTag = document.getElementById("editorModalTag");
  const editorImagePreview = document.getElementById("editorImagePreview");
  const editorFileInput = document.getElementById("editorFileInput");
  const editorImageUrl = document.getElementById("editorImageUrl");
  const btnToggleIgLibrary = document.getElementById("btnToggleIgLibrary");
  const igMediaPickerGrid = document.getElementById("igMediaPickerGrid");
  const btnCancelEditor = document.getElementById("btnCancelEditor");

  // Section Photo Editor Elements
  const sectionPhotoModal = document.getElementById("sectionPhotoModal");
  const sectionPhotoCloseBtn = document.getElementById("sectionPhotoCloseBtn");
  const sectionPhotoTitle = document.getElementById("sectionPhotoTitle");
  const sectionPhotoPreview = document.getElementById("sectionPhotoPreview");
  const sectionFileInput = document.getElementById("sectionFileInput");
  const sectionPhotoUrl = document.getElementById("sectionPhotoUrl");
  const btnToggleSectionIg = document.getElementById("btnToggleSectionIg");
  const sectionIgPickerGrid = document.getElementById("sectionIgPickerGrid");
  const btnSaveSectionPhoto = document.getElementById("btnSaveSectionPhoto");
  const btnCancelSectionPhoto = document.getElementById("btnCancelSectionPhoto");

  // State
  let isOwnerMode = localStorage.getItem("crochet_owner_mode") === "true";
  let currentSectionEditing = null; // 'hero' or 'story'
  let activeCategory = "all";
  let searchQuery = "";

  // 1. Initialize Saved Products & Overrides from LocalStorage
  loadCustomizedData();

  // 2. Initialize Store Configuration & UI
  applyStoreConfig();
  populateProductSelect();
  renderProducts();
  renderInstagramFeed();

  // 3. Setup Owner Mode UI if logged in
  if (isOwnerMode) {
    enableOwnerModeUI();
  }

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

  // 7. Modals Universal Close handlers
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (quickViewModal) {
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) closeModal();
    });
  }

  if (staffModalCloseBtn) staffModalCloseBtn.addEventListener("click", closeStaffModal);
  if (staffLoginModal) {
    staffLoginModal.addEventListener("click", (e) => {
      if (e.target === staffLoginModal) closeStaffModal();
    });
  }

  if (productEditorCloseBtn) productEditorCloseBtn.addEventListener("click", closeProductEditor);
  if (btnCancelEditor) btnCancelEditor.addEventListener("click", closeProductEditor);
  if (productEditorModal) {
    productEditorModal.addEventListener("click", (e) => {
      if (e.target === productEditorModal) closeProductEditor();
    });
  }

  if (sectionPhotoCloseBtn) sectionPhotoCloseBtn.addEventListener("click", closeSectionPhotoModal);
  if (btnCancelSectionPhoto) btnCancelSectionPhoto.addEventListener("click", closeSectionPhotoModal);
  if (sectionPhotoModal) {
    sectionPhotoModal.addEventListener("click", (e) => {
      if (e.target === sectionPhotoModal) closeSectionPhotoModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeStaffModal();
      closeProductEditor();
      closeSectionPhotoModal();
    }
  });

  // 8. Staff Portal Login Handlers
  if (staffPortalBtn) {
    staffPortalBtn.addEventListener("click", () => {
      if (isOwnerMode) {
        // Already logged in: Scroll to owner toolbar or inform owner
        if (ownerAdminBar) ownerAdminBar.scrollIntoView({ behavior: "smooth" });
        showToast("👑 Owner Edit Mode is currently active! Click Exit in the top bar to log out.");
      } else {
        openStaffModal();
      }
    });
  }

  if (staffLoginForm) {
    staffLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = (document.getElementById("staffUsername")?.value || "").trim().toLowerCase();
      const p = (document.getElementById("staffPassword")?.value || "").trim();

      // Owner credentials check
      if ((u === "owner" || u === "admin") && (p === "admin123" || p === "croche2026" || p === "admin")) {
        isOwnerMode = true;
        localStorage.setItem("crochet_owner_mode", "true");
        closeStaffModal();
        enableOwnerModeUI();
        renderProducts();
        showToast("👑 Welcome back, Owner! Edit Mode is now ACTIVE. Click any pencil icon (✏️) to edit!");
      } else {
        showToast("❌ Incorrect credentials. (Default: username: owner / password: admin123)");
      }
    });
  }

  // 9. Owner Admin Bar Actions
  if (btnAdminLogout) {
    btnAdminLogout.addEventListener("click", () => {
      isOwnerMode = false;
      localStorage.removeItem("crochet_owner_mode");
      disableOwnerModeUI();
      renderProducts();
      showToast("👋 Logged out of Staff Mode. Returned to customer view.");
    });
  }

  if (btnAdminAddProduct) {
    btnAdminAddProduct.addEventListener("click", () => {
      openProductEditor(null); // Add new product mode
    });
  }

  if (btnAdminResetDefaults) {
    btnAdminResetDefaults.addEventListener("click", () => {
      if (confirm("Restore the boutique catalog and pictures back to original defaults? Any custom items will be reset.")) {
        localStorage.removeItem("crochet_custom_products");
        localStorage.removeItem("crochet_hero_image");
        localStorage.removeItem("crochet_story_image");
        PRODUCTS = [...DEFAULT_PRODUCTS];
        if (heroMainImage) heroMainImage.src = "images/ig_CJBs-DlBzGs.jpg";
        if (storyMainImage) storyMainImage.src = "images/ig_CHupfP7BRvI.jpg";
        renderProducts();
        populateProductSelect();
        showToast("🔄 Catalog and images restored to default Instagram photography.");
      }
    });
  }

  if (btnAdminExportData) {
    btnAdminExportData.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PRODUCTS, null, 2));
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", "crochet_products_catalog.json");
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast("📥 Exported catalog data successfully!");
    });
  }

  // 10. Hero & Story Photo Editing Buttons
  if (btnEditHeroImage) {
    btnEditHeroImage.addEventListener("click", () => {
      openSectionPhotoModal("hero");
    });
  }

  if (btnEditStoryImage) {
    btnEditStoryImage.addEventListener("click", () => {
      openSectionPhotoModal("story");
    });
  }

  // 11. Product Editor Form & Image Controls
  if (editorFileInput) {
    editorFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (editorImagePreview) editorImagePreview.src = re.target.result;
          if (editorImageUrl) editorImageUrl.value = re.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (editorImageUrl) {
    editorImageUrl.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val && editorImagePreview) {
        editorImagePreview.src = val;
      }
    });
  }

  if (btnToggleIgLibrary && igMediaPickerGrid) {
    btnToggleIgLibrary.addEventListener("click", () => {
      const isVisible = igMediaPickerGrid.style.display === "grid";
      igMediaPickerGrid.style.display = isVisible ? "none" : "grid";
    });
  }

  if (productEditorForm) {
    productEditorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProductFromEditor();
    });
  }

  // 12. Section Photo Form & Image Controls
  if (sectionFileInput) {
    sectionFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (sectionPhotoPreview) sectionPhotoPreview.src = re.target.result;
          if (sectionPhotoUrl) sectionPhotoUrl.value = re.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (sectionPhotoUrl) {
    sectionPhotoUrl.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val && sectionPhotoPreview) {
        sectionPhotoPreview.src = val;
      }
    });
  }

  if (btnToggleSectionIg && sectionIgPickerGrid) {
    btnToggleSectionIg.addEventListener("click", () => {
      const isVisible = sectionIgPickerGrid.style.display === "grid";
      sectionIgPickerGrid.style.display = isVisible ? "none" : "grid";
    });
  }

  if (btnSaveSectionPhoto) {
    btnSaveSectionPhoto.addEventListener("click", () => {
      const newSrc = (sectionPhotoUrl && sectionPhotoUrl.value.trim()) || 
                     (sectionPhotoPreview && sectionPhotoPreview.src) || "";
      if (!newSrc) {
        showToast("Please choose or upload a picture first.");
        return;
      }

      if (currentSectionEditing === "hero") {
        if (heroMainImage) heroMainImage.src = newSrc;
        localStorage.setItem("crochet_hero_image", newSrc);
        showToast("✨ Hero picture updated live!");
      } else if (currentSectionEditing === "story") {
        if (storyMainImage) storyMainImage.src = newSrc;
        localStorage.setItem("crochet_story_image", newSrc);
        showToast("✨ Story picture updated live!");
      }
      closeSectionPhotoModal();
    });
  }

  // 13. Dynamic Channel Preference Selector (WhatsApp / Email / Both)
  if (channelRadios) {
    channelRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        updateSubmitButtonUI(e.target.value);
      });
    });
  }

  function updateSubmitButtonUI(channel) {
    if (!btnSubmitText || !btnSubmitIcon) return;
    if (channel === "whatsapp") {
      btnSubmitText.textContent = "Send Product Details via WhatsApp";
      btnSubmitIcon.className = "fab fa-whatsapp";
      btnSubmitIcon.style.color = "#25D366";
    } else if (channel === "email") {
      btnSubmitText.textContent = "Send Product Details via Email";
      btnSubmitIcon.className = "fas fa-paper-plane";
      btnSubmitIcon.style.color = "white";
    } else if (channel === "both") {
      btnSubmitText.textContent = "Send via WhatsApp & Email";
      btnSubmitIcon.className = "fas fa-sparkles";
      btnSubmitIcon.style.color = "#FFE8A3";
    }
  }

  // 14. Customer Inquiry Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const custName = document.getElementById("custName")?.value.trim() || "";
      const custPhone = document.getElementById("custPhone")?.value.trim() || "";
      const custEmail = document.getElementById("custEmail")?.value.trim() || "";
      const itemName = itemSelect ? itemSelect.value : "";
      const colors = document.getElementById("orderColors")?.value.trim() || "Natural / As shown";
      const notes = document.getElementById("orderNotes")?.value.trim() || "No extra notes";
      const selectedChannel = document.querySelector('input[name="deliveryChannel"]:checked');
      const channel = selectedChannel ? selectedChannel.value : "whatsapp";

      const matchedProduct = PRODUCTS.find(p => p.name === itemName);

      const targetWaPhone = formatWhatsAppTarget(custPhone);
      const waMsg = 
`🌸 *THE CROCHET BOUTIQUE - PRODUCT INQUIRY* 🌸
--------------------------------------------------
👤 *Customer Name:* ${custName}
📞 *Phone / WhatsApp:* ${custPhone}
✉️ *Email:* ${custEmail}
🧶 *Selected Piece:* ${itemName}
🎨 *Color Preference:* ${colors}
📝 *Notes / Sizing:* ${notes}
--------------------------------------------------
*PRODUCT SPECIFICATIONS:*
• Material: ${matchedProduct ? matchedProduct.yarnType : 'Custom Handcrafted Fiber'}
• Sizing: ${matchedProduct ? matchedProduct.dimensions : 'Custom Measurements'}
• Care: ${matchedProduct ? matchedProduct.care : 'Hand wash cold, dry flat'}
--------------------------------------------------
Hi ${custName}! Thank you for your inquiry with @croche_boutiq. Our artisan will confirm color availability and slots with you!`;

      const waUrl = `https://wa.me/${targetWaPhone}?text=${encodeURIComponent(waMsg)}`;

      const submitBtn = document.getElementById("btnMainSubmit");
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing Request...`;
      submitBtn.disabled = true;

      try {
        let emailDelivered = false;
        if (channel === "email" || channel === "both") {
          try {
            const formData = new FormData(inquiryForm);
            formData.append("_replyto", custEmail);
            formData.append("Product Details Delivered To Customer", channel);
            if (matchedProduct) {
              formData.append("Product Yarn Type", matchedProduct.yarnType);
              formData.append("Product Sizing", matchedProduct.dimensions);
              formData.append("Care Guide", matchedProduct.care);
            }
            await fetch("https://formsubmit.co/ajax/saboorhussain2005@gmail.com", {
              method: "POST",
              body: formData,
              headers: { 'Accept': 'application/json' }
            });
            emailDelivered = true;
          } catch (e) {
            console.error(e);
          }
        }

        if (channel === "whatsapp" || channel === "both") {
          window.open(waUrl, "_blank");
        }

        // Show immediate on-screen Product Specs confirmation modal
        showSpecsConfirmationModal({
          name: custName,
          email: custEmail,
          phone: custPhone,
          channel: channel,
          product: matchedProduct,
          itemName: itemName,
          colors: colors,
          notes: notes,
          waUrl: waUrl,
          emailDelivered: emailDelivered
        });

        inquiryForm.reset();
        if (specsBox) specsBox.style.display = "none";
      } catch (err) {
        if (channel === "whatsapp" || channel === "both") {
          window.open(waUrl, "_blank");
        }
        showToast("🌸 Thank you! Your request was received.");
      } finally {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;
      }
    });
  }

  // 15. Render Products with Owner Mode Pencil Icons
  function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    const filtered = PRODUCTS.filter(p => {
      const matchesCat = (activeCategory === "all") || (p.category === activeCategory);
      const matchesQuery = p.name.toLowerCase().includes(searchQuery) ||
                           p.description.toLowerCase().includes(searchQuery) ||
                           (p.yarnType && p.yarnType.toLowerCase().includes(searchQuery));
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
          ${isOwnerMode ? `
            <div class="product-admin-overlay">
              <button class="product-pencil-btn" data-id="${p.id}" title="Edit product & picture">
                <i class="fas fa-pencil-alt"></i> Edit
              </button>
              <button class="product-delete-btn" data-id="${p.id}" title="Delete product">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          ` : ""}
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
              <button class="btn-card-knowmore" data-id="${p.id}" title="View details and specs">
                <i class="fas fa-info-circle"></i> Know More
              </button>
              <button class="btn-card-inquire" data-id="${p.id}">Inquire / Order</button>
              <button class="btn-card-wa" data-id="${p.id}" title="Inquire on WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      // Customer Actions
      card.querySelector(".btn-card-knowmore").addEventListener("click", () => {
        openQuickView(p);
      });

      card.querySelector(".btn-card-inquire").addEventListener("click", () => {
        selectProductAndScroll(p);
      });

      card.querySelector(".btn-card-wa").addEventListener("click", (e) => {
        e.stopPropagation();
        openWhatsAppForProduct(p);
      });

      card.querySelector(".product-thumb-wrap").addEventListener("click", (e) => {
        if (e.target.closest(".product-admin-overlay")) return;
        openQuickView(p);
      });

      // Owner Actions (Pencil Edit & Delete)
      if (isOwnerMode) {
        const pencilBtn = card.querySelector(".product-pencil-btn");
        if (pencilBtn) {
          pencilBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openProductEditor(p);
          });
        }

        const deleteBtn = card.querySelector(".product-delete-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteProduct(p);
          });
        }
      }

      productsGrid.appendChild(card);
    });
  }

  // 16. Render Instagram Feed
  function renderInstagramFeed() {
    if (!igGrid) return;
    igGrid.innerHTML = "";

    INSTAGRAM_POSTS.forEach(post => {
      const card = document.createElement("a");
      card.href = post.url || STORE_CONFIG.instagramUrl;
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

  // 17. Product Selection & Dynamic Form Updates
  function selectProductAndScroll(product) {
    if (itemSelect) {
      for (let opt of itemSelect.options) {
        if (opt.value === product.name) {
          itemSelect.value = opt.value;
          break;
        }
      }
      updateProductSpecsSpotlight(product.name);
    }
    const inquirySection = document.getElementById("inquiry");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });
      const colorsField = document.getElementById("orderColors");
      if (colorsField) {
        colorsField.placeholder = `e.g., Preferred colors (${product.colors.join(", ")})`;
        colorsField.focus();
      }
      showToast(`Selected "${product.name}"! Complete the form to get details & quote.`);
    }
  }

  function updateProductSpecsSpotlight(prodName) {
    if (!specsBox) return;
    const prod = PRODUCTS.find(p => p.name === prodName);
    if (!prod) {
      specsBox.style.display = "none";
      return;
    }

    specsBox.style.display = "flex";
    specsBox.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" class="selected-product-thumb">
      <div class="selected-product-details">
        <h4>${prod.name}</h4>
        <div class="selected-product-specs-list">
          <span class="spec-pill">🧶 ${prod.yarnType}</span>
          <span class="spec-pill">📐 ${prod.dimensions}</span>
          <span class="spec-pill">🎨 ${prod.colors.join(", ")}</span>
        </div>
      </div>
    `;
  }

  if (itemSelect) {
    itemSelect.addEventListener("change", (e) => {
      updateProductSpecsSpotlight(e.target.value);
    });
  }

  // 18. WhatsApp Product Inquiry
  function openWhatsAppForProduct(product) {
    const msg = 
`🌸 *THE CROCHET BOUTIQUE - PRODUCT INQUIRY* 🌸
--------------------------------------------------
🧶 *Product:* ${product.name}
🧵 *Yarn Specs:* ${product.yarnType}
📐 *Dimensions:* ${product.dimensions}
🧼 *Care Guide:* ${product.care}
🎨 *Available Colors:* ${product.colors.join(", ")}
--------------------------------------------------
Hi! I would like to know more about this piece, pricing quotes, and current order slots.`;

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // 19. Quick View Customer Modal
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
            <p style="margin-bottom: 6px;"><strong>🧶 Yarn Material:</strong> ${p.yarnType}</p>
            <p style="margin-bottom: 6px;"><strong>📐 Dimensions & Sizing:</strong> ${p.dimensions}</p>
            <p style="margin-bottom: 6px;"><strong>🧼 Washing & Care:</strong> ${p.care}</p>
            <p><strong>🎨 Available Color Choices:</strong> ${p.colors.join(", ")}</p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button id="modalInquireBtn" class="btn btn-primary" style="flex: 1;">
              Inquire &amp; Order
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
      openWhatsAppForProduct(p);
    });

    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // 20. Specs Delivery Confirmation Modal
  function showSpecsConfirmationModal(data) {
    if (!quickViewModal || !modalBody) return;

    const channelText = data.channel === "whatsapp" ? "WhatsApp" : data.channel === "email" ? "Email" : "WhatsApp & Email";

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 58px; height: 58px; background: var(--color-primary-light); color: var(--color-primary); border-radius: var(--radius-full); display: inline-flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 12px;">
          <i class="fas fa-check-circle" style="color: #25D366;"></i>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.9rem; margin-bottom: 6px;">
          Product Details &amp; Inquiry Sent!
        </h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">
          Thank you, <strong>${data.name}</strong>! We have dispatched the product details to your <strong>${channelText}</strong>.
        </p>
      </div>

      <div style="background: var(--color-surface-tint); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
        <div style="display: flex; gap: 18px; align-items: center; margin-bottom: 16px;">
          ${data.product ? `<img src="${data.product.image}" alt="${data.product.name}" style="width: 76px; height: 76px; border-radius: var(--radius-sm); object-fit: cover; box-shadow: var(--shadow-sm);">` : ""}
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 4px;">${data.itemName}</h3>
            <span style="font-size: 0.8rem; color: var(--color-secondary); font-weight: 600;">✨ Handcrafted with Love • Made to Order</span>
          </div>
        </div>

        ${data.product ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.86rem; border-top: 1px solid var(--color-border-light); padding-top: 14px;">
          <p><strong>🧶 Yarn:</strong> ${data.product.yarnType}</p>
          <p><strong>📐 Dimensions:</strong> ${data.product.dimensions}</p>
          <p><strong>🧼 Care:</strong> ${data.product.care}</p>
          <p><strong>🎨 Palette:</strong> ${data.colors}</p>
        </div>
        ` : `
        <p style="font-size: 0.88rem; color: var(--color-text-muted);">Custom design notes: ${data.notes}</p>
        `}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${data.waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="flex: 1; text-align: center;">
          <i class="fab fa-whatsapp"></i> Send Notification to (${data.phone})
        </a>
        <a href="https://wa.me/919391040104?text=${encodeURIComponent('Hi! I am following up on my crochet inquiry for ' + data.itemName + ' (Customer: ' + data.name + ', Phone: ' + data.phone + ')')}" target="_blank" rel="noopener" class="btn btn-secondary" style="flex: 1; text-align: center;">
          <i class="fab fa-whatsapp" style="color: #25D366;"></i> Chat with Owner (+91 9391040104)
        </a>
        <button id="modalDoneBtn" class="btn btn-secondary" style="width: 100%; margin-top: 6px;">
          Back to Boutique
        </button>
      </div>
    `;

    document.getElementById("modalDoneBtn")?.addEventListener("click", closeModal);
    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // 21. Owner Mode UI Activation / Deactivation
  function enableOwnerModeUI() {
    if (ownerAdminBar) ownerAdminBar.style.display = "block";
    if (staffBtnLabel) staffBtnLabel.textContent = "Owner (Active)";
    if (staffPortalBtn) staffPortalBtn.classList.add("logged-in");
    if (btnEditHeroImage) btnEditHeroImage.style.display = "inline-flex";
    if (btnEditStoryImage) btnEditStoryImage.style.display = "inline-flex";
  }

  function disableOwnerModeUI() {
    if (ownerAdminBar) ownerAdminBar.style.display = "none";
    if (staffBtnLabel) staffBtnLabel.textContent = "Staff";
    if (staffPortalBtn) staffPortalBtn.classList.remove("logged-in");
    if (btnEditHeroImage) btnEditHeroImage.style.display = "none";
    if (btnEditStoryImage) btnEditStoryImage.style.display = "none";
  }

  // 22. Product Editor Modal Handlers
  function openProductEditor(product) {
    if (!productEditorModal) return;

    // Reset inputs
    if (editorFileInput) editorFileInput.value = "";
    if (igMediaPickerGrid) igMediaPickerGrid.style.display = "none";

    // Populate Instagram media picker grid
    populateIgPicker(igMediaPickerGrid, (selectedPath) => {
      if (editorImageUrl) editorImageUrl.value = selectedPath;
      if (editorImagePreview) editorImagePreview.src = selectedPath;
    });

    if (product) {
      // Edit existing product
      if (editProductId) editProductId.value = product.id;
      if (editorModalTitle) editorModalTitle.textContent = "Edit Product & Change Picture";
      if (editorModalTag) editorModalTag.textContent = "Editing: " + product.name;
      document.getElementById("editorName").value = product.name;
      document.getElementById("editorCategory").value = product.category;
      document.getElementById("editorBadge").value = product.badge || "";
      document.getElementById("editorBadgeType").value = product.badgeType || "bestseller";
      document.getElementById("editorDescription").value = product.description || "";
      document.getElementById("editorYarn").value = product.yarnType || "";
      document.getElementById("editorDimensions").value = product.dimensions || "";
      document.getElementById("editorCare").value = product.care || "";
      document.getElementById("editorColors").value = (product.colors || []).join(", ");
      if (editorImageUrl) editorImageUrl.value = product.image;
      if (editorImagePreview) editorImagePreview.src = product.image;
    } else {
      // Add new product
      if (editProductId) editProductId.value = "";
      if (editorModalTitle) editorModalTitle.textContent = "Add New Product to Boutique";
      if (editorModalTag) editorModalTag.textContent = "New Creation";
      document.getElementById("editorName").value = "";
      document.getElementById("editorCategory").value = "tops";
      document.getElementById("editorBadge").value = "New Drop";
      document.getElementById("editorBadgeType").value = "featured";
      document.getElementById("editorDescription").value = "";
      document.getElementById("editorYarn").value = "100% Breathable Milk Cotton";
      document.getElementById("editorDimensions").value = "Custom Tailored";
      document.getElementById("editorCare").value = "Hand wash cold, lay flat to dry";
      document.getElementById("editorColors").value = "Custom Palette";
      const defaultImg = (INSTAGRAM_MEDIA_LIBRARY && INSTAGRAM_MEDIA_LIBRARY[0]) ? INSTAGRAM_MEDIA_LIBRARY[0].path : "images/instagram_logo.jpg";
      if (editorImageUrl) editorImageUrl.value = defaultImg;
      if (editorImagePreview) editorImagePreview.src = defaultImg;
    }

    productEditorModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function saveProductFromEditor() {
    const prodId = editProductId ? editProductId.value : "";
    const name = document.getElementById("editorName").value.trim();
    const category = document.getElementById("editorCategory").value;
    const badge = document.getElementById("editorBadge").value.trim() || "Artisan Pick";
    const badgeType = document.getElementById("editorBadgeType").value;
    const desc = document.getElementById("editorDescription").value.trim();
    const yarn = document.getElementById("editorYarn").value.trim() || "100% Milk Cotton";
    const dimensions = document.getElementById("editorDimensions").value.trim() || "Custom Tailored";
    const care = document.getElementById("editorCare").value.trim() || "Hand wash cold, dry flat";
    const colorsRaw = document.getElementById("editorColors").value;
    const colors = colorsRaw.split(",").map(c => c.trim()).filter(Boolean);
    const img = (editorImageUrl && editorImageUrl.value.trim()) || 
                (editorImagePreview && editorImagePreview.src) || "images/instagram_logo.jpg";

    if (!name || !desc) {
      showToast("Please provide product name and description.");
      return;
    }

    if (prodId) {
      // Update existing item
      const idx = PRODUCTS.findIndex(p => p.id === prodId);
      if (idx !== -1) {
        PRODUCTS[idx] = {
          ...PRODUCTS[idx],
          name,
          category,
          badge,
          badgeType,
          description: desc,
          yarnType: yarn,
          dimensions,
          care,
          colors: colors.length ? colors : ["Custom Tone"],
          image: img
        };
        showToast(`✨ Updated "${name}" successfully on live website!`);
      }
    } else {
      // Prepend brand new product
      const newId = "prod-" + Date.now();
      const newProd = {
        id: newId,
        name,
        category,
        badge,
        badgeType,
        description: desc,
        yarnType: yarn,
        dimensions,
        care,
        colors: colors.length ? colors : ["Custom Tone"],
        image: img
      };
      PRODUCTS.unshift(newProd);
      showToast(`🎉 Added "${name}" to live boutique collection!`);
    }

    // Persist to localStorage
    localStorage.setItem("crochet_custom_products", JSON.stringify(PRODUCTS));

    // Instant live UI update
    renderProducts();
    populateProductSelect();
    closeProductEditor();
  }

  function deleteProduct(product) {
    if (confirm(`Are you sure you want to remove "${product.name}" from the boutique collection?`)) {
      PRODUCTS = PRODUCTS.filter(p => p.id !== product.id);
      localStorage.setItem("crochet_custom_products", JSON.stringify(PRODUCTS));
      renderProducts();
      populateProductSelect();
      showToast(`🗑️ Removed "${product.name}" from catalog.`);
    }
  }

  // 23. Section Photo Editor Modal Handlers (Hero & Story)
  function openSectionPhotoModal(section) {
    if (!sectionPhotoModal) return;
    currentSectionEditing = section;

    if (sectionFileInput) sectionFileInput.value = "";
    if (sectionIgPickerGrid) sectionIgPickerGrid.style.display = "none";

    const currentImg = section === "hero" ? 
      (heroMainImage ? heroMainImage.src : "images/ig_CJBs-DlBzGs.jpg") :
      (storyMainImage ? storyMainImage.src : "images/ig_CHupfP7BRvI.jpg");

    if (sectionPhotoTitle) {
      sectionPhotoTitle.textContent = section === "hero" ? "Change Hero Main Picture" : "Change Story / About Picture";
    }
    if (sectionPhotoPreview) sectionPhotoPreview.src = currentImg;
    if (sectionPhotoUrl) sectionPhotoUrl.value = currentImg;

    // Populate Instagram media picker grid
    populateIgPicker(sectionIgPickerGrid, (selectedPath) => {
      if (sectionPhotoUrl) sectionPhotoUrl.value = selectedPath;
      if (sectionPhotoPreview) sectionPhotoPreview.src = selectedPath;
    });

    sectionPhotoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // 24. Instagram Media Picker Helper
  function populateIgPicker(gridEl, onSelect) {
    if (!gridEl || !Array.isArray(INSTAGRAM_MEDIA_LIBRARY)) return;
    gridEl.innerHTML = "";

    INSTAGRAM_MEDIA_LIBRARY.forEach(item => {
      const thumb = document.createElement("div");
      thumb.className = "ig-picker-thumb";
      thumb.title = item.label;
      thumb.innerHTML = `<img src="${item.path}" alt="${item.label}" loading="lazy">`;
      thumb.addEventListener("click", () => {
        gridEl.querySelectorAll(".ig-picker-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        onSelect(item.path);
      });
      gridEl.appendChild(thumb);
    });
  }

  // 25. Storage & Defaults Loader
  function loadCustomizedData() {
    // Products
    const savedProducts = localStorage.getItem("crochet_custom_products");
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          PRODUCTS = parsed;
        }
      } catch (e) {
        console.error("Failed to load custom products from localStorage:", e);
      }
    }

    // Hero image override
    const savedHero = localStorage.getItem("crochet_hero_image");
    if (savedHero && heroMainImage) {
      heroMainImage.src = savedHero;
    }

    // Story image override
    const savedStory = localStorage.getItem("crochet_story_image");
    if (savedStory && storyMainImage) {
      storyMainImage.src = savedStory;
    }
  }

  // 26. Helper & Modal Closing Routines
  function closeModal() {
    if (quickViewModal) quickViewModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function openStaffModal() {
    if (staffLoginModal) {
      staffLoginModal.classList.add("active");
      document.body.style.overflow = "hidden";
      const userField = document.getElementById("staffUsername");
      if (userField) userField.focus();
    }
  }

  function closeStaffModal() {
    if (staffLoginModal) staffLoginModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function closeProductEditor() {
    if (productEditorModal) productEditorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function closeSectionPhotoModal() {
    if (sectionPhotoModal) sectionPhotoModal.classList.remove("active");
    document.body.style.overflow = "auto";
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

  function formatWhatsAppTarget(phoneInput) {
    if (!phoneInput) return STORE_CONFIG.whatsappNumber;
    let digits = phoneInput.replace(/\D/g, "");
    if (digits.length === 10) {
      digits = "91" + digits; // Standard 10-digit Indian phone number
    }
    return digits.length >= 10 ? digits : STORE_CONFIG.whatsappNumber;
  }

  function applyStoreConfig() {
    if (floatingWaBtn) {
      floatingWaBtn.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! 🌸 I'm interested in ordering a handcrafted crochet piece from your boutique 🧶")}`;
    }
    const announcementEl = document.getElementById("announcementText");
    if (announcementEl) {
      announcementEl.textContent = STORE_CONFIG.announcement;
    }
  }

  function formatCategory(cat) {
    const map = {
      tops: "Sweaters & Tops",
      scarves: "Shawls & Scarves",
      bags: "Sling Bags & Pouches",
      baby: "Baby Wear & Sets",
      caps: "Caps & Headwear",
      gloves: "Hand Gloves",
      accessories: "Charms & Accessories"
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
