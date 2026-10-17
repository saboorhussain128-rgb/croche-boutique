/**
 * The Crochet Boutique - Client Application Logic
 * Featuring dynamic product specs, customer preferences (WhatsApp / Email / Both),
 * Staff & Owner Portal beside FAQ, Category Management & Live Editing, and Instant Catalog Updates.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Core Customer Elements
  const productsGrid = document.getElementById("productsGrid");
  const igGrid = document.getElementById("igGrid");
  const categoryTabsContainer = document.getElementById("categoryTabs");
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

  // Staff & Owner Elements (Navbar Button & Staff Modal Views)
  const navStaffBtn = document.getElementById("navStaffBtn");
  const navStaffBtnLabel = document.getElementById("navStaffBtnLabel");
  const staffLoginModal = document.getElementById("staffLoginModal");
  const staffModalCloseBtn = document.getElementById("staffModalCloseBtn");
  const staffLoginForm = document.getElementById("staffLoginForm");
  const staffLoggedOutView = document.getElementById("staffLoggedOutView");
  const staffLoggedInView = document.getElementById("staffLoggedInView");
  const btnModalAddProduct = document.getElementById("btnModalAddProduct");
  const btnModalEditCategories = document.getElementById("btnModalEditCategories");
  const btnModalLogout = document.getElementById("btnModalLogout");
  const ownerCatalogActions = document.getElementById("ownerCatalogActions");
  const btnAdminAddProduct = document.getElementById("btnAdminAddProduct");
  const btnEditCategories = document.getElementById("btnEditCategories");

  // Category Manager Modal Elements
  const categoryManagerModal = document.getElementById("categoryManagerModal");
  const categoryManagerCloseBtn = document.getElementById("categoryManagerCloseBtn");
  const categoryManagerList = document.getElementById("categoryManagerList");
  const newCategoryName = document.getElementById("newCategoryName");
  const btnAddNewCategory = document.getElementById("btnAddNewCategory");
  const btnSaveCategories = document.getElementById("btnSaveCategories");
  const btnCancelCategories = document.getElementById("btnCancelCategories");

  // Product Editor Elements
  const productEditorModal = document.getElementById("productEditorModal");
  const productEditorCloseBtn = document.getElementById("productEditorCloseBtn");
  const productEditorForm = document.getElementById("productEditorForm");
  const editProductId = document.getElementById("editProductId");
  const editorModalTitle = document.getElementById("editorModalTitle");
  const editorModalTag = document.getElementById("editorModalTag");
  const editorCategorySelect = document.getElementById("editorCategory");
  const editorImagePreview = document.getElementById("editorImagePreview");
  const editorFileInput = document.getElementById("editorFileInput");
  const editorImageUrl = document.getElementById("editorImageUrl");
  const editorLeftPickerGrid = document.getElementById("editorLeftPickerGrid");
  const editorVisibleCheck = document.getElementById("editorVisibleCheck");
  const btnHeaderDeleteProduct = document.getElementById("btnHeaderDeleteProduct");
  const btnEditorDeleteProduct = document.getElementById("btnEditorDeleteProduct");
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

  // 1. Initialize Saved Products, Categories & Overrides from LocalStorage
  loadCustomizedData();

  // 2. Initialize Store Configuration & Dynamic UI
  applyStoreConfig();
  renderCategoryTabs();
  populateCategoryDropdowns();
  populateProductSelect();
  renderProducts();
  renderInstagramFeed();

  // 3. Setup Owner Mode UI if already logged in
  if (isOwnerMode) {
    enableOwnerModeUI();
  }

  // 4. Search Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // 5. Mobile Nav Toggle & Header Inquiry Click Feedback
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

  const btnHeaderInquiry = document.querySelector(".btn-header-inquiry");
  if (btnHeaderInquiry) {
    let inquiryTouchTimer = null;
    const triggerInquiryPink = () => {
      btnHeaderInquiry.classList.add("touch-active");
    };
    const releaseInquiryPink = () => {
      clearTimeout(inquiryTouchTimer);
      inquiryTouchTimer = setTimeout(() => {
        btnHeaderInquiry.classList.remove("touch-active");
        btnHeaderInquiry.classList.remove("active");
      }, 500);
    };

    btnHeaderInquiry.addEventListener("touchstart", triggerInquiryPink, { passive: true });
    btnHeaderInquiry.addEventListener("touchend", releaseInquiryPink, { passive: true });
    btnHeaderInquiry.addEventListener("touchcancel", releaseInquiryPink, { passive: true });
    btnHeaderInquiry.addEventListener("pointerdown", triggerInquiryPink);
    btnHeaderInquiry.addEventListener("pointerup", releaseInquiryPink);
    btnHeaderInquiry.addEventListener("pointercancel", releaseInquiryPink);

    btnHeaderInquiry.addEventListener("click", () => {
      btnHeaderInquiry.classList.add("touch-active");
      clearTimeout(inquiryTouchTimer);
      inquiryTouchTimer = setTimeout(() => {
        btnHeaderInquiry.classList.remove("touch-active");
        btnHeaderInquiry.classList.remove("active");
      }, 800);
    });
  }

  if (navStaffBtn) {
    let staffTouchTimer = null;
    const triggerStaffTouch = () => {
      navStaffBtn.classList.add("touch-active");
    };
    const releaseStaffTouch = () => {
      clearTimeout(staffTouchTimer);
      staffTouchTimer = setTimeout(() => {
        navStaffBtn.classList.remove("touch-active");
      }, 400);
    };
    navStaffBtn.addEventListener("touchstart", triggerStaffTouch, { passive: true });
    navStaffBtn.addEventListener("touchend", releaseStaffTouch, { passive: true });
    navStaffBtn.addEventListener("touchcancel", releaseStaffTouch, { passive: true });
  }

  // 6. Modals Universal Close Handlers
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

  if (categoryManagerCloseBtn) categoryManagerCloseBtn.addEventListener("click", closeCategoryManager);
  if (btnCancelCategories) btnCancelCategories.addEventListener("click", closeCategoryManager);
  if (categoryManagerModal) {
    categoryManagerModal.addEventListener("click", (e) => {
      if (e.target === categoryManagerModal) closeCategoryManager();
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
      closeCategoryManager();
      closeProductEditor();
      closeSectionPhotoModal();
    }
  });

  // 7. Staff Portal Button in Navbar
  function handleStaffClick(e) {
    if (e) e.preventDefault();
    openStaffModal();
  }

  if (navStaffBtn) navStaffBtn.addEventListener("click", handleStaffClick);

  // 8. Staff Login Form Submission
  if (staffLoginForm) {
    staffLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = (document.getElementById("staffUsername")?.value || "").trim().toLowerCase();
      const p = (document.getElementById("staffPassword")?.value || "").trim();

      // Owner credentials
      if ((u === "owner" || u === "admin") && (p === "admin123" || p === "croche2026" || p === "admin")) {
        isOwnerMode = true;
        localStorage.setItem("crochet_owner_mode", "true");
        closeStaffModal();
        enableOwnerModeUI();
        renderProducts();
        showToast("👑 Welcome Owner! Edit mode is now ACTIVE. Click any pencil icon on products to edit.");
      } else {
        showToast("❌ Incorrect credentials. (Demo login: username: owner / password: admin123)");
      }
    });
  }

  // 9. Owner Modal & Catalog Actions
  if (btnModalAddProduct) {
    btnModalAddProduct.addEventListener("click", () => {
      closeStaffModal();
      openProductEditor(null);
    });
  }

  if (btnModalEditCategories) {
    btnModalEditCategories.addEventListener("click", () => {
      closeStaffModal();
      openCategoryManager();
    });
  }

  if (btnModalLogout) {
    btnModalLogout.addEventListener("click", () => {
      isOwnerMode = false;
      localStorage.removeItem("crochet_owner_mode");
      disableOwnerModeUI();
      renderProducts();
      closeStaffModal();
      showToast("👋 Logged out of Staff Mode. Returned to normal customer view.");
    });
  }

  if (btnAdminAddProduct) {
    btnAdminAddProduct.addEventListener("click", () => {
      openProductEditor(null);
    });
  }

  if (btnEditCategories) {
    btnEditCategories.addEventListener("click", () => {
      openCategoryManager();
    });
  }

  if (btnAdminResetDefaults) {
    btnAdminResetDefaults.addEventListener("click", () => {
      if (confirm("Restore all categories, products, and pictures back to default? Any custom items will be cleared.")) {
        localStorage.removeItem("crochet_custom_categories");
        localStorage.removeItem("crochet_custom_products");
        localStorage.removeItem("crochet_hero_image");
        localStorage.removeItem("crochet_story_image");
        CATEGORIES = [...DEFAULT_CATEGORIES];
        PRODUCTS = [...DEFAULT_PRODUCTS];
        if (heroMainImage) heroMainImage.src = "images/ig_CJBs-DlBzGs.jpg";
        if (storyMainImage) storyMainImage.src = "images/ig_CHupfP7BRvI.jpg";
        renderCategoryTabs();
        populateCategoryDropdowns();
        populateProductSelect();
        renderProducts();
        showToast("🔄 Catalog, categories, and images restored to authentic defaults.");
      }
    });
  }

  if (btnAdminExportData) {
    btnAdminExportData.addEventListener("click", () => {
      const exportObj = { categories: CATEGORIES, products: PRODUCTS };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", "crochet_boutique_data.json");
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast("📥 Exported boutique data successfully!");
    });
  }

  // 10. Category Manager Modal Handlers
  function openCategoryManager() {
    if (!categoryManagerModal || !categoryManagerList) return;
    renderCategoryManagerItems();
    if (newCategoryName) newCategoryName.value = "";
    categoryManagerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCategoryManager() {
    if (categoryManagerModal) categoryManagerModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function renderCategoryManagerItems() {
    if (!categoryManagerList) return;
    categoryManagerList.innerHTML = "";

    CATEGORIES.forEach((cat, index) => {
      const prodCount = PRODUCTS.filter(p => p.category === cat.id).length;
      const row = document.createElement("div");
      row.className = "category-row-item";
      row.innerHTML = `
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--color-text-muted); min-width: 20px;">#${index + 1}</span>
        <input type="text" class="category-name-input" data-id="${cat.id}" value="${cat.name}">
        <span class="category-badge-count">${prodCount} items</span>
        <button type="button" class="btn-delete-cat" data-id="${cat.id}" title="Delete Category">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;

      // Delete category handler
      row.querySelector(".btn-delete-cat").addEventListener("click", () => {
        if (CATEGORIES.length <= 1) {
          showToast("At least one category must remain in the catalog.");
          return;
        }
        if (confirm(`Remove category "${cat.name}"? Products in this category can be assigned to another category.`)) {
          CATEGORIES = CATEGORIES.filter(c => c.id !== cat.id);
          renderCategoryManagerItems();
        }
      });

      categoryManagerList.appendChild(row);
    });
  }

  if (btnAddNewCategory) {
    btnAddNewCategory.addEventListener("click", () => {
      const name = (newCategoryName ? newCategoryName.value : "").trim();
      if (!name) {
        showToast("Please enter a category name.");
        return;
      }
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString().slice(-4);
      CATEGORIES.push({ id: slug, name: name });
      if (newCategoryName) newCategoryName.value = "";
      renderCategoryManagerItems();
      showToast(`Added category "${name}". Click Save below to apply to the website.`);
    });
  }

  if (btnSaveCategories) {
    btnSaveCategories.addEventListener("click", () => {
      // Read all updated names from input fields
      const inputs = categoryManagerList ? categoryManagerList.querySelectorAll(".category-name-input") : [];
      inputs.forEach(input => {
        const catId = input.dataset.id;
        const updatedName = input.value.trim();
        const found = CATEGORIES.find(c => c.id === catId);
        if (found && updatedName) {
          found.name = updatedName;
        }
      });

      // Save to localStorage
      localStorage.setItem("crochet_custom_categories", JSON.stringify(CATEGORIES));

      // Update live website immediately
      renderCategoryTabs();
      populateCategoryDropdowns();
      renderProducts();
      closeCategoryManager();
      showToast("✨ Categories updated and saved live on website!");
    });
  }

  // 11. Dynamic Category Tabs Rendering
  function renderCategoryTabs() {
    if (!categoryTabsContainer) return;
    categoryTabsContainer.innerHTML = "";

    // "All Items" tab
    const allBtn = document.createElement("button");
    allBtn.className = `tab-btn ${activeCategory === "all" ? "active" : ""}`;
    allBtn.dataset.category = "all";
    allBtn.textContent = "All Items";
    allBtn.addEventListener("click", () => {
      activeCategory = "all";
      updateActiveCategoryTab();
      renderProducts();
    });
    categoryTabsContainer.appendChild(allBtn);

    // Each dynamic category
    CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `tab-btn ${activeCategory === cat.id ? "active" : ""}`;
      btn.dataset.category = cat.id;
      btn.textContent = cat.name;
      btn.addEventListener("click", () => {
        activeCategory = cat.id;
        updateActiveCategoryTab();
        renderProducts();
      });
      categoryTabsContainer.appendChild(btn);
    });
  }

  function updateActiveCategoryTab() {
    if (!categoryTabsContainer) return;
    const tabs = categoryTabsContainer.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.category === activeCategory);
    });
  }

  function populateCategoryDropdowns() {
    if (editorCategorySelect) {
      editorCategorySelect.innerHTML = "";
      CATEGORIES.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        editorCategorySelect.appendChild(opt);
      });
    }
  }

  // 12. Hero & Story Photo Editing Buttons
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

  // 13. Product Editor Form & Image Controls
  if (editorFileInput) {
    editorFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (editorImagePreview) editorImagePreview.src = re.target.result;
          if (editorImageUrl) editorImageUrl.value = re.target.result;
          if (editorLeftPickerGrid) {
            editorLeftPickerGrid.querySelectorAll(".editor-pic-card").forEach(c => c.classList.remove("selected"));
          }
          showToast("📷 Uploaded custom picture! Click 'Save to Live Website' to publish.");
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

  function handleDeleteFromEditor() {
    const prodId = editProductId ? editProductId.value : "";
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (prod) {
      deleteProduct(prod);
      closeProductEditor();
    }
  }

  if (btnHeaderDeleteProduct) {
    btnHeaderDeleteProduct.addEventListener("click", handleDeleteFromEditor);
  }

  if (btnEditorDeleteProduct) {
    btnEditorDeleteProduct.addEventListener("click", handleDeleteFromEditor);
  }

  if (productEditorForm) {
    productEditorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProductFromEditor();
    });
  }

  // 14. Section Photo Form & Image Controls
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

  // 15. Dynamic Channel Preference Selector
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

  // 16. Customer Inquiry Form Submission
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

  // 17. Render Products with Owner Mode Pencil Icons and Single "Get This" Button
  function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    const filtered = PRODUCTS.filter(p => {
      // If customer view, only show items with visible !== false
      if (!isOwnerMode && p.visible === false) return false;
      const matchesCat = (activeCategory === "all") || (p.category === activeCategory);
      const matchesQuery = p.name.toLowerCase().includes(searchQuery) ||
                           p.description.toLowerCase().includes(searchQuery);
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🧶</div>
          <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">No matching crochet pieces in this category</h3>
          <p style="color: var(--color-text-muted);">Looking for a custom design? Bring your photo to our Custom Order form below!</p>
          ${isOwnerMode ? `
            <button class="btn btn-primary" id="btnEmptyAddProduct" style="margin-top: 18px;">
              <i class="fas fa-plus"></i> Add Product to "${formatCategory(activeCategory)}"
            </button>
          ` : `
            <a href="#inquiry" class="btn btn-primary" style="margin-top: 18px;">Request Custom Piece</a>
          `}
        </div>
      `;

      if (isOwnerMode) {
        const btnEmpty = document.getElementById("btnEmptyAddProduct");
        if (btnEmpty) {
          btnEmpty.addEventListener("click", () => {
            openProductEditor(null, activeCategory === "all" ? (CATEGORIES[0] ? CATEGORIES[0].id : "sweaters") : activeCategory);
          });
        }
      }
      return;
    }

    filtered.forEach(p => {
      const isHidden = (p.visible === false);
      const card = document.createElement("div");
      card.className = `product-card ${isHidden ? "product-card-hidden" : ""}`;
      card.innerHTML = `
        <div class="product-thumb-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-thumb" loading="lazy">
          <span class="badge-tag badge-${p.badgeType}">${p.badge}</span>
          ${isHidden && isOwnerMode ? `
            <span class="badge-tag" style="top: 48px; background: #444; color: #fff;">
              <i class="fas fa-eye-slash"></i> Hidden
            </span>
          ` : ""}
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
          <div class="product-bottom-action">
            <button class="btn-get-this" data-id="${p.id}">
              <i class="fas fa-bag-shopping"></i> Get This
            </button>
          </div>
        </div>
      `;

      // Customer Action: Click "Get This" to select item and scroll to inquiry form
      card.querySelector(".btn-get-this").addEventListener("click", () => {
        selectProductAndScroll(p);
      });

      card.querySelector(".product-thumb-wrap").addEventListener("click", (e) => {
        if (e.target.closest(".product-admin-overlay")) return;
        selectProductAndScroll(p);
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

  // 18. Render Instagram Feed
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

  // 19. Product Selection & Dynamic Form Updates
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

  // 20. WhatsApp Product Inquiry
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

  // 21. Quick View Customer Modal
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

  // 22. Specs Delivery Confirmation Modal
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

  // 23. Owner Mode UI Activation / Deactivation
  function enableOwnerModeUI() {
    if (ownerCatalogActions) ownerCatalogActions.style.display = "flex";

    if (navStaffBtnLabel) navStaffBtnLabel.textContent = "Owner (Active)";
    if (navStaffBtn) navStaffBtn.classList.add("logged-in");

    if (btnEditHeroImage) btnEditHeroImage.style.display = "inline-flex";
    if (btnEditStoryImage) btnEditStoryImage.style.display = "inline-flex";
  }

  function disableOwnerModeUI() {
    if (ownerCatalogActions) ownerCatalogActions.style.display = "none";

    if (navStaffBtnLabel) navStaffBtnLabel.textContent = "Staff";
    if (navStaffBtn) navStaffBtn.classList.remove("logged-in");

    if (btnEditHeroImage) btnEditHeroImage.style.display = "none";
    if (btnEditStoryImage) btnEditStoryImage.style.display = "none";
  }

  // 24. Product Editor Modal Handlers with Left-Side Picture Selector
  let activeSelectedImagePath = "";

  function openProductEditor(product, defaultCat) {
    if (!productEditorModal) return;

    // Reset inputs
    if (editorFileInput) editorFileInput.value = "";

    populateCategoryDropdowns();

    // Determine currently active image
    activeSelectedImagePath = product ? product.image : (INSTAGRAM_MEDIA_LIBRARY[0] ? INSTAGRAM_MEDIA_LIBRARY[0].path : "images/instagram_logo.jpg");

    // Populate Left-Side Picture Selection Gallery with Select Check Icons
    renderLeftPictureGallery(activeSelectedImagePath);

    if (product) {
      // Edit existing product
      if (editProductId) editProductId.value = product.id;
      if (editorModalTitle) editorModalTitle.textContent = "Edit Product & Picture";
      if (editorModalTag) editorModalTag.textContent = "Editing: " + product.name;
      document.getElementById("editorName").value = product.name;
      if (editorCategorySelect) editorCategorySelect.value = product.category;
      document.getElementById("editorBadge").value = product.badge || "";
      document.getElementById("editorBadgeType").value = product.badgeType || "bestseller";
      document.getElementById("editorDescription").value = product.description || "";
      if (editorImageUrl) editorImageUrl.value = product.image;
      if (editorImagePreview) editorImagePreview.src = product.image;
      if (editorVisibleCheck) editorVisibleCheck.checked = (product.visible !== false);

      // Show Delete Buttons when editing an existing product
      if (btnHeaderDeleteProduct) btnHeaderDeleteProduct.style.display = "inline-flex";
      if (btnEditorDeleteProduct) btnEditorDeleteProduct.style.display = "inline-flex";
    } else {
      // Add new product
      if (editProductId) editProductId.value = "";
      if (editorModalTitle) editorModalTitle.textContent = "Add New Product to Boutique";
      if (editorModalTag) editorModalTag.textContent = "New Creation";
      document.getElementById("editorName").value = "";
      if (editorCategorySelect) editorCategorySelect.value = defaultCat || (CATEGORIES[0] ? CATEGORIES[0].id : "sweaters");
      document.getElementById("editorBadge").value = "New Drop";
      document.getElementById("editorBadgeType").value = "featured";
      document.getElementById("editorDescription").value = "";
      if (editorImageUrl) editorImageUrl.value = activeSelectedImagePath;
      if (editorImagePreview) editorImagePreview.src = activeSelectedImagePath;
      if (editorVisibleCheck) editorVisibleCheck.checked = true;

      // Hide Delete Buttons when adding a new product
      if (btnHeaderDeleteProduct) btnHeaderDeleteProduct.style.display = "none";
      if (btnEditorDeleteProduct) btnEditorDeleteProduct.style.display = "none";
    }

    productEditorModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function renderLeftPictureGallery(selectedPath) {
    if (!editorLeftPickerGrid || !Array.isArray(INSTAGRAM_MEDIA_LIBRARY)) return;
    editorLeftPickerGrid.innerHTML = "";

    INSTAGRAM_MEDIA_LIBRARY.forEach(item => {
      const isSelected = (item.path === selectedPath);
      const card = document.createElement("div");
      card.className = `editor-pic-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="editor-pic-thumb-wrap">
          <img src="${item.path}" alt="${item.label}" loading="lazy">
          <div class="pic-check-badge" title="Select picture">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <span class="editor-pic-label" title="${item.label}">${item.label}</span>
      `;

      card.addEventListener("click", () => {
        activeSelectedImagePath = item.path;
        if (editorImageUrl) editorImageUrl.value = item.path;
        if (editorImagePreview) editorImagePreview.src = item.path;
        editorLeftPickerGrid.querySelectorAll(".editor-pic-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        showToast(`📷 Selected "${item.label}". Click 'Save to Live Website' to publish.`);
      });

      editorLeftPickerGrid.appendChild(card);
    });
  }

  function saveProductFromEditor() {
    const prodId = editProductId ? editProductId.value : "";
    const name = document.getElementById("editorName").value.trim();
    const category = editorCategorySelect ? editorCategorySelect.value : (CATEGORIES[0] ? CATEGORIES[0].id : "sweaters");
    const badge = document.getElementById("editorBadge").value.trim() || "Artisan Pick";
    const badgeType = document.getElementById("editorBadgeType").value;
    const desc = document.getElementById("editorDescription").value.trim();
    const isVisible = editorVisibleCheck ? editorVisibleCheck.checked : true;
    const img = (editorImageUrl && editorImageUrl.value.trim()) || activeSelectedImagePath || "images/instagram_logo.jpg";

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
          image: img,
          visible: isVisible
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
        image: img,
        visible: isVisible
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
      showToast(`🗑️ Removed "${product.name}" from live catalog.`);
    }
  }

  // 25. Section Photo Editor Modal Handlers (Hero & Story)
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

  // 26. Instagram Media Picker Helper
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

  // 27. Storage & Defaults Loader
  function loadCustomizedData() {
    // Migration check: ensure version 10 is loaded to remove bags and refresh authentic Accessories from Instagram
    const CATALOG_VERSION = "v10";
    if (localStorage.getItem("crochet_catalog_version") !== CATALOG_VERSION) {
      localStorage.removeItem("crochet_custom_categories");
      localStorage.removeItem("crochet_custom_products");
      localStorage.setItem("crochet_catalog_version", CATALOG_VERSION);
    }

    // Categories override
    const savedCategories = localStorage.getItem("crochet_custom_categories");
    if (savedCategories) {
      try {
        const parsedCats = JSON.parse(savedCategories);
        if (Array.isArray(parsedCats) && parsedCats.length > 0) {
          CATEGORIES = parsedCats;
        }
      } catch (e) {
        console.error("Failed to load custom categories:", e);
      }
    }

    // Products override
    const savedProducts = localStorage.getItem("crochet_custom_products");
    if (savedProducts) {
      try {
        const parsedProds = JSON.parse(savedProducts);
        if (Array.isArray(parsedProds) && parsedProds.length > 0) {
          PRODUCTS = parsedProds;
        }
      } catch (e) {
        console.error("Failed to load custom products:", e);
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

  // 28. Helper & Modal Closing Routines
  function closeModal() {
    if (quickViewModal) quickViewModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function openStaffModal() {
    if (!staffLoginModal) return;
    if (isOwnerMode) {
      if (staffLoggedOutView) staffLoggedOutView.style.display = "none";
      if (staffLoggedInView) staffLoggedInView.style.display = "block";
    } else {
      if (staffLoggedOutView) staffLoggedOutView.style.display = "block";
      if (staffLoggedInView) staffLoggedInView.style.display = "none";
      const userField = document.getElementById("staffUsername");
      if (userField) setTimeout(() => userField.focus(), 100);
    }
    staffLoginModal.classList.add("active");
    document.body.style.overflow = "hidden";
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

  function formatCategory(catId) {
    const found = CATEGORIES.find(c => c.id === catId);
    if (found) return found.name;
    const defaultMap = {
      sweaters: "Sweaters",
      shirts: "Shirts",
      kids: "Kids",
      gloves: "Gloves",
      skaffs: "Skaffs",
      caps: "Caps",
      accessories: "Accessories"
    };
    return defaultMap[catId] || catId;
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
