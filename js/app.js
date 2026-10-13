/**
 * The Crochet Boutique - Client Application Logic
 * Featuring dynamic product specs, customer preferences (WhatsApp / Email / Both),
 * and instant on-screen details delivery.
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
  const specsBox = document.getElementById("selectedProductSpecsBox");
  const channelRadios = document.querySelectorAll('input[name="deliveryChannel"]');
  const btnMainSubmit = document.getElementById("btnMainSubmit");
  const btnSubmitText = document.getElementById("btnSubmitText");
  const btnSubmitIcon = document.getElementById("btnSubmitIcon");
  const toastContainer = document.getElementById("toastContainer");
  const floatingWaBtn = document.getElementById("floatingWaBtn");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.querySelector(".nav-links");

  // Elements for 6 High-Impact Features
  const yarnSwatchesGrid = document.getElementById("yarnSwatchesGrid");
  const sizingGuideModal = document.getElementById("sizingGuideModal");
  const sizingModalCloseBtn = document.getElementById("sizingModalCloseBtn");
  const btnOpenSizingModal = document.getElementById("btnOpenSizingModal");
  const navSizingBtn = document.getElementById("navSizingBtn");
  const footerSizingBtns = document.querySelectorAll(".footer-sizing-btn");
  const btnApplyMeasurements = document.getElementById("btnApplyMeasurements");
  const isGiftOrder = document.getElementById("isGiftOrder");
  const giftDetailsCollapse = document.getElementById("giftDetailsCollapse");
  const referencePhotoInput = document.getElementById("referencePhotoInput");
  const photoPreviewContainer = document.getElementById("photoPreviewContainer");
  const photoPreviewImg = document.getElementById("photoPreviewImg");
  const photoPreviewName = document.getElementById("photoPreviewName");
  const btnRemovePhoto = document.getElementById("btnRemovePhoto");
  const needByDateInput = document.getElementById("needByDate");
  const rushOrderNotice = document.getElementById("rushOrderNotice");
  const liveTurnaroundDates = document.getElementById("liveTurnaroundDates");

  let uploadedReferencePhotoName = "";

  // Boutique Yarn Swatches Palette Data
  const BOUTIQUE_SWATCHES = [
    { name: "Sage Green", color: "#9CAF88" },
    { name: "Dusty Rose", color: "#DCAE96" },
    { name: "Oatmeal Cream", color: "#F5EBE1" },
    { name: "Buttercup Yellow", color: "#FDE68A" },
    { name: "Terracotta Pink", color: "#C86D76" },
    { name: "Lilac Lavender", color: "#C7B8E2" },
    { name: "Soft Ivory", color: "#FFFFF0" },
    { name: "Forest Pine", color: "#3D5A47" },
    { name: "Ocean Sky", color: "#93C5FD" },
    { name: "Warm Mocha", color: "#8D6E63" }
  ];

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

  // 4. Initialize 6 High-Impact Features
  initYarnSwatches();
  initSizingGuide();
  initGiftOption();
  initReferencePhoto();
  initTurnaroundAndNeedBy();

  // 5. Category Filter Tabs
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
  if (sizingModalCloseBtn) {
    sizingModalCloseBtn.addEventListener("click", closeSizingModal);
  }
  if (sizingGuideModal) {
    sizingGuideModal.addEventListener("click", (e) => {
      if (e.target === sizingGuideModal) closeSizingModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeSizingModal();
    }
  });

  // 8. Dynamic Channel Preference Selector
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

  // 9. When user changes product in dropdown -> update live specs spotlight box
  if (itemSelect) {
    itemSelect.addEventListener("change", (e) => {
      updateProductSpecsSpotlight(e.target.value);
    });
  }

  function updateProductSpecsSpotlight(productName) {
    if (!specsBox) return;
    const prod = PRODUCTS.find(p => p.name === productName);
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
          <span class="spec-pill">🧶 <strong>Yarn:</strong> ${prod.yarnType}</span>
          <span class="spec-pill">📐 <strong>Size:</strong> ${prod.dimensions}</span>
          <span class="spec-pill">🧼 <strong>Care:</strong> ${prod.care}</span>
        </div>
      </div>
    `;
  }

  // 10. Form Submission Handler (WhatsApp / Email / Both)
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const custName = document.getElementById("custName")?.value || "Customer";
      const custPhone = document.getElementById("custPhone")?.value || "Not provided";
      const custEmail = document.getElementById("custEmail")?.value || "";
      const itemName = document.getElementById("orderItem")?.value || "Custom Piece";
      const colors = document.getElementById("orderColors")?.value || "Open to suggestions";
      const notes = document.getElementById("orderNotes")?.value || "None";
      const channel = document.querySelector('input[name="deliveryChannel"]:checked')?.value || "whatsapp";

      const refUrl = document.getElementById("referenceUrl")?.value?.trim() || "";
      const needByDate = document.getElementById("needByDate")?.value || "";
      const isGift = document.getElementById("isGiftOrder")?.checked || false;
      const giftRecipient = document.getElementById("giftRecipient")?.value?.trim() || "";
      const giftOccasion = document.getElementById("giftOccasion")?.value?.trim() || "";
      const giftMessage = document.getElementById("giftMessage")?.value?.trim() || "";

      let isRush = false;
      if (needByDate) {
        const diffDays = Math.ceil((new Date(needByDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 7) isRush = true;
      }

      const matchedProduct = PRODUCTS.find(p => p.name === itemName);

      const submitBtn = btnMainSubmit;
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>🌸 Processing Your Request...</span>`;
      submitBtn.disabled = true;

      // Clean and format entered phone number so message targets the entered number
      const targetPhone = formatWhatsAppTarget(custPhone);

      // Build structured notification message addressed to customer with boutique owner contact
      let waMessage = 
`*THE CROCHET BOUTIQUE - PRODUCT DETAILS & ORDER NOTIFICATION*
--------------------------------------------------
Hello ${custName}! 

Thank you for choosing The Crochet Boutique (@croche_boutiq). Here are the handcrafted specifications for your selected piece:

*Product:* ${itemName}
${matchedProduct ? `*Yarn Specs:* ${matchedProduct.yarnType}
*Dimensions:* ${matchedProduct.dimensions}
*Care Guide:* ${matchedProduct.care}
*Available Colors:* ${matchedProduct.colors.join(", ")}` : "*Custom Bespoke Request*"}
--------------------------------------------------
*Your Preferred Palette:* ${colors}
*Your Sizing & Notes:* ${notes}`;

      if (refUrl || uploadedReferencePhotoName) {
        waMessage += `\n*Reference:* ${refUrl ? refUrl : ""}${uploadedReferencePhotoName ? ` (Photo: ${uploadedReferencePhotoName})` : ""}`;
      }

      if (needByDate) {
        waMessage += `\n*Need-By Date:* ${needByDate}${isRush ? " [⚡ Priority Rush Slot]" : ""}`;
      }

      if (isGift) {
        waMessage += `\n--------------------------------------------------
*Complimentary Gift Packaging:* Included (Kraft Box & Satin Ribbon)
*Gift Recipient:* ${giftRecipient || "Special someone"}
*Occasion:* ${giftOccasion || "Special occasion"}
*Handwritten Card Note:* "${giftMessage || "Crafted with love"}"`;
      }

      waMessage += `\n--------------------------------------------------
*HOW TO COMPLETE YOUR ORDER:*
Our artisan is ready to craft your piece! You can chat directly with the boutique owner to finalize custom measurements, delivery slot, or color swatches:

Boutique Owner WhatsApp: +91 9391040104
Direct Chat Link: https://wa.me/919391040104
Instagram: https://instagram.com/croche_boutiq
--------------------------------------------------
The Crochet Boutique - Handcrafted with Love`;

      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;

      // Prepare custom autoresponse content for FormSubmit
      const autoresponseInput = inquiryForm.querySelector('input[name="_autoresponse"]');
      if (autoresponseInput) {
        let autoresponseContent = 
`Hello ${custName},

Thank you for your inquiry with The Crochet Boutique (@croche_boutiq)!

Here are the details for your selected piece:
--------------------------------------------------
• Product: ${itemName}
${matchedProduct ? `• Yarn Material: ${matchedProduct.yarnType}
• Dimensions & Sizing: ${matchedProduct.dimensions}
• Care Instructions: ${matchedProduct.care}
• Available Colors: ${matchedProduct.colors.join(", ")}` : "• Custom Handcrafted Commission"}
• Your Preferred Color Palette: ${colors}
• Your Notes & Sizing: ${notes}`;

        if (refUrl || uploadedReferencePhotoName) {
          autoresponseContent += `\n• Reference: ${refUrl || ""} ${uploadedReferencePhotoName ? `(Photo: ${uploadedReferencePhotoName})` : ""}`;
        }
        if (needByDate) {
          autoresponseContent += `\n• Event Need-By Date: ${needByDate} ${isRush ? "(Priority Rush Queue Requested)" : ""}`;
        }
        if (isGift) {
          autoresponseContent += `\n• Complimentary Gift Packaging: Yes (Kraft box, ribbon & handwritten note)
• Gift Recipient: ${giftRecipient || "Special someone"}
• Occasion: ${giftOccasion || "Celebration"}
• Card Message: "${giftMessage || "Warm wishes"}"`;
        }

        autoresponseContent += `\n--------------------------------------------------

Our artisan is reviewing your request and will reach out with final yarn availability, custom measurements, and timeline.

You can also chat directly with us on WhatsApp at +91 9391040104 anytime.

With love & cozy stitches,
The Crochet Boutique
Instagram: @croche_boutiq`;

        autoresponseInput.value = autoresponseContent;
      }

      // Handle delivery based on customer selection
      try {
        let emailDelivered = false;
        if (channel === "email" || channel === "both") {
          const formData = new FormData(inquiryForm);
          const emailEndpoint = `https://formsubmit.co/ajax/${STORE_CONFIG.inquiryEmail}`;
          try {
            const res = await fetch(emailEndpoint, {
              method: "POST",
              headers: { "Accept": "application/json" },
              body: formData
            });
            const resData = await res.json().catch(() => ({}));
            if (resData.success === "false" && resData.message && resData.message.includes("Activation")) {
              showToast(`⚠️ Form activation needed: Click 'Activate' in ${STORE_CONFIG.inquiryEmail}`);
            } else {
              emailDelivered = true;
              showToast(`✨ Spec sheet and order details dispatched to ${custEmail}!`);
            }
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
          refUrl: refUrl,
          refPhoto: uploadedReferencePhotoName,
          needByDate: needByDate,
          isGift: isGift,
          giftRecipient: giftRecipient,
          giftOccasion: giftOccasion,
          giftMessage: giftMessage,
          waUrl: waUrl,
          emailDelivered: emailDelivered
        });

        inquiryForm.reset();
        if (specsBox) specsBox.style.display = "none";
        if (giftDetailsCollapse) giftDetailsCollapse.style.display = "none";
        if (photoPreviewContainer) photoPreviewContainer.style.display = "none";
        if (rushOrderNotice) rushOrderNotice.style.display = "none";
        uploadedReferencePhotoName = "";
        document.querySelectorAll(".yarn-swatch-item.active").forEach(el => el.classList.remove("active"));
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

  // 11. On-Screen Product Specs & Confirmation Modal
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

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.86rem; border-top: 1px solid var(--color-border-light); padding-top: 14px;">
          <p><strong>🧶 Yarn:</strong> ${data.product ? data.product.yarnType : 'Bespoke'}</p>
          <p><strong>📐 Dimensions:</strong> ${data.product ? data.product.dimensions : 'Custom Fit'}</p>
          <p><strong>🧼 Care:</strong> ${data.product ? data.product.care : 'Hand wash cold'}</p>
          <p><strong>🎨 Palette:</strong> ${data.colors}</p>
          ${data.needByDate ? `<p><strong>📅 Need-By:</strong> ${data.needByDate}</p>` : ""}
          ${data.refPhoto ? `<p><strong>📷 Reference:</strong> Photo Attached</p>` : ""}
          ${data.isGift ? `<p style="grid-column: 1/-1; color: var(--color-accent); font-weight: 600;">🎁 Gift Packaging: Handwritten card for ${data.giftRecipient || 'recipient'}</p>` : ""}
        </div>
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${data.waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="flex: 1; text-align: center;">
          <i class="fab fa-whatsapp"></i> Send Notification to (${data.phone})
        </a>
        <a href="https://wa.me/919391040104?text=${encodeURIComponent('Hi! I am following up on my crochet inquiry for ' + data.itemName + ' (Customer: ' + data.name + ', Phone: ' + data.phone + ')')}" target="_blank" rel="noopener" class="btn btn-secondary" style="flex: 1; text-align: center;">
          <i class="fab fa-whatsapp" style="color: #25D366;"></i> Chat with Owner (+91 9391040104)
        </a>
        ${data.email ? `
        <a href="mailto:${data.email}?subject=${encodeURIComponent('The Crochet Boutique: Details for ' + data.itemName)}&body=${encodeURIComponent('Hi ' + data.name + ',\n\nHere are the handcrafted details for ' + data.itemName + ':\n\n• Yarn: ' + (data.product ? data.product.yarnType : 'Custom') + '\n• Dimensions: ' + (data.product ? data.product.dimensions : 'Custom') + '\n• Care: ' + (data.product ? data.product.care : 'Hand wash cold') + '\n• Color: ' + data.colors + '\n• Notes: ' + data.notes + '\n\nThe Crochet Boutique\nWhatsApp: +91 9391040104\nInstagram: @croche_boutiq')}" class="btn btn-secondary" style="flex: 1; text-align: center;">
          <i class="fas fa-envelope-open-text"></i> Open Email Copy
        </a>` : ""}
        <button id="modalDoneBtn" class="btn btn-secondary" style="width: 100%; margin-top: 6px;">
          Back to Boutique
        </button>
      </div>
    `;

    document.getElementById("modalDoneBtn")?.addEventListener("click", closeModal);
    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // 12. Feature 1: Interactive Yarn Swatches Logic
  function initYarnSwatches() {
    if (!yarnSwatchesGrid) return;
    yarnSwatchesGrid.innerHTML = "";

    BOUTIQUE_SWATCHES.forEach(swatch => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "yarn-swatch-item";
      item.dataset.color = swatch.name;
      item.innerHTML = `<span class="yarn-swatch-color" style="background-color: ${swatch.color};"></span>${swatch.name}`;
      
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        updateColorsInputFromSwatches();
      });

      yarnSwatchesGrid.appendChild(item);
    });
  }

  function updateColorsInputFromSwatches() {
    const colorsInput = document.getElementById("orderColors");
    if (!colorsInput) return;
    const activeItems = Array.from(document.querySelectorAll(".yarn-swatch-item.active")).map(el => el.dataset.color);
    if (activeItems.length > 0) {
      colorsInput.value = activeItems.join(", ");
    }
  }

  // 13. Feature 2: Visual Sizing Guide & Fit Calculator
  function initSizingGuide() {
    if (btnOpenSizingModal) {
      btnOpenSizingModal.addEventListener("click", openSizingModal);
    }
    if (navSizingBtn) {
      navSizingBtn.addEventListener("click", openSizingModal);
    }
    if (footerSizingBtns) {
      footerSizingBtns.forEach(btn => btn.addEventListener("click", openSizingModal));
    }

    // Tab buttons switching inside modal
    const sizingTabs = document.querySelectorAll(".sizing-tab-btn");
    const sizingPanels = document.querySelectorAll(".sizing-panel");
    sizingTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        sizingTabs.forEach(t => t.classList.remove("active"));
        sizingPanels.forEach(p => p.style.display = "none");
        tab.classList.add("active");
        const targetId = tab.dataset.target;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.style.display = "block";
      });
    });

    // Apply Measurements Button
    if (btnApplyMeasurements) {
      btnApplyMeasurements.addEventListener("click", () => {
        const garment = document.getElementById("calcGarment")?.value || "Custom Piece";
        const bust = document.getElementById("calcBust")?.value?.trim() || "";
        const length = document.getElementById("calcLength")?.value?.trim() || "";
        const fit = document.getElementById("calcFit")?.value || "Standard";

        const sizeSnippet = `[Custom Fit: ${garment} | Bust/Chest: ${bust || "Standard"} | Length: ${length || "Standard"} | Style: ${fit}]`;
        const notesField = document.getElementById("orderNotes");
        if (notesField) {
          notesField.value = notesField.value ? `${notesField.value}\n${sizeSnippet}` : sizeSnippet;
        }

        closeSizingModal();
        const inquirySection = document.getElementById("inquiry");
        if (inquirySection) inquirySection.scrollIntoView({ behavior: "smooth" });
        showToast(`✨ Sizing for "${garment}" applied to your order form!`);
      });
    }
  }

  function openSizingModal() {
    if (sizingGuideModal) {
      sizingGuideModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSizingModal() {
    if (sizingGuideModal) {
      sizingGuideModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // 14. Feature 3: Complimentary Gift Packaging Option
  function initGiftOption() {
    if (isGiftOrder && giftDetailsCollapse) {
      isGiftOrder.addEventListener("change", (e) => {
        giftDetailsCollapse.style.display = e.target.checked ? "block" : "none";
      });
    }
  }

  // 15. Feature 4: Bring Your Own Reference Photo Preview
  function initReferencePhoto() {
    if (referencePhotoInput) {
      referencePhotoInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          uploadedReferencePhotoName = file.name;
          const reader = new FileReader();
          reader.onload = (event) => {
            if (photoPreviewImg) photoPreviewImg.src = event.target.result;
            if (photoPreviewName) photoPreviewName.textContent = file.name;
            if (photoPreviewContainer) photoPreviewContainer.style.display = "flex";
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (btnRemovePhoto) {
      btnRemovePhoto.addEventListener("click", () => {
        if (referencePhotoInput) referencePhotoInput.value = "";
        uploadedReferencePhotoName = "";
        if (photoPreviewContainer) photoPreviewContainer.style.display = "none";
      });
    }
  }

  // 16. Feature 5: Dynamic Turnaround Time & Need-By Date Picker
  function initTurnaroundAndNeedBy() {
    if (liveTurnaroundDates) {
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 7);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 10);
      const opts = { month: "short", day: "numeric" };
      liveTurnaroundDates.textContent = `Estimated dispatch by ${minDate.toLocaleDateString("en-US", opts)} – ${maxDate.toLocaleDateString("en-US", opts)}`;
    }

    if (needByDateInput) {
      // Set min attribute to today's date
      const todayIso = new Date().toISOString().split("T")[0];
      needByDateInput.min = todayIso;

      needByDateInput.addEventListener("change", (e) => {
        if (!e.target.value) {
          if (rushOrderNotice) rushOrderNotice.style.display = "none";
          return;
        }
        const selected = new Date(e.target.value);
        const diffTime = selected.getTime() - new Date().getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 7) {
          if (rushOrderNotice) rushOrderNotice.style.display = "block";
        } else {
          if (rushOrderNotice) rushOrderNotice.style.display = "none";
        }
      });
    }
  }

  // Helper Functions
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

      // "Know More" button -> opens full spec sheet modal
      card.querySelector(".btn-card-knowmore").addEventListener("click", () => {
        openQuickView(p);
      });

      // "Inquire / Order" button -> pre-selects and scrolls smoothly to form
      card.querySelector(".btn-card-inquire").addEventListener("click", () => {
        selectProductAndScroll(p);
      });

      // WhatsApp icon click
      card.querySelector(".btn-card-wa").addEventListener("click", (e) => {
        e.stopPropagation();
        openWhatsAppForProduct(p);
      });

      // Thumbnail click -> Quick View
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
        if (opt.value === product.name) {
          itemSelect.value = opt.value;
          break;
        }
      }
      updateProductSpecsSpotlight(product.name);

      // Pre-select matching garment category in Sizing Calculator
      const calcGarmentSelect = document.getElementById("calcGarment");
      if (calcGarmentSelect && product.category) {
        if (product.category === "tops") calcGarmentSelect.value = "Crop Top / Halter";
        else if (product.category === "dresses") calcGarmentSelect.value = "Summer Dress";
        else if (product.category === "baby") calcGarmentSelect.value = "Baby Romper & Cap";
        else if (product.category === "caps") calcGarmentSelect.value = "Bucket Hat";
        else if (product.category === "gloves") calcGarmentSelect.value = "Hand Gloves";
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
      showToast(`Selected "${product.name}"! Fill your details below to receive specs & quote.`);
    }
  }

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

  function closeModal() {
    if (quickViewModal) {
      quickViewModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  function formatCategory(cat) {
    const map = {
      tops: "Tops & Shrugs",
      caps: "Caps & Hats",
      dresses: "Dresses",
      baby: "Romper & Cap Sets",
      gloves: "Hand Gloves",
      hairbands: "Hair Bands",
      scarves: "Scarves",
      homedecor: "Table Runners",
      bags: "Pouches"
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
