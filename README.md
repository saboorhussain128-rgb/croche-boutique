# 🧶 The Crochet Boutique (@croche_boutiq)

A modern, responsive, cozy-pastel static boutique website designed for **The Crochet Boutique** ([@croche_boutiq](https://www.instagram.com/croche_boutiq/)). 

Hosted directly on **GitHub Pages** with zero hosting costs, featuring an interactive product catalog, live search, Instagram gallery showcase, and a **dual 100% free customer order inquiry system** (Email via FormSubmit + Direct WhatsApp Instant Orders).

---

## 🌟 Live Demo & Preview
- **Live Website:** [https://saboorhussain128-rgb.github.io/croche-boutique/](https://saboorhussain128-rgb.github.io/croche-boutique/)
- **Instagram Profile:** [https://www.instagram.com/croche_boutiq/](https://www.instagram.com/croche_boutiq/)

---

## ✨ Features

- **Cozy Pastel & Artisanal Aesthetic:** Warm cream, blush rose, sage green, and earthy tones tailored for slow-crafted handmade goods.
- **Interactive Product Catalog:**
  - Category filter tabs (*Amigurumi & Plushies, Wearables & Hats, Granny Square Bags, Botanical Bouquets, Baby Keepsakes*).
  - Instant live keyword search.
  - Interactive badges (*Bestseller, Made to Order, Never Fades, Gift Box Included*).
  - Quick View modal with yarn specifications, care instructions, and available color palettes.
- **100% Free Dual Order & Inquiry System:**
  - **Free Email Inquiries (FormSubmit):** Delivers customer inquiries directly to the boutique email without requiring any paid backend, database, or API keys.
  - **Instant WhatsApp Orders:** One-click pre-formatted order message generator that automatically formats the chosen item, color choice, size notes, and customer name for WhatsApp.
- **Instagram Showcase Grid:** Displaying curated posts from `@croche_boutiq` with hover stats and direct profile links.
- **Slow Craft Story & Artisan Section:** Highlights the value of handmade crochet vs factory knitting.
- **Care Guide & FAQ Accordion:** Explains washing guidelines, custom commission turnaround times, and shipping information.
- **Mobile-First & Ultra Fast:** Lightweight static HTML5, CSS3, and modern vanilla JavaScript with zero framework overhead.

---

## 🛠️ Quick Configuration

Update store contact details easily in [`js/config.js`](js/config.js):

```javascript
const STORE_CONFIG = {
  brandName: "The Crochet Boutique",
  handle: "@croche_boutiq",
  instagramUrl: "https://www.instagram.com/croche_boutiq/",
  
  // WhatsApp Number for instant customer orders (Include country code, no + or dashes)
  whatsappNumber: "1234567890", 
  
  // Email address to receive free order inquiries (FormSubmit.co)
  inquiryEmail: "thecrochetboutique.orders@gmail.com", 
  
  currency: "$",
  announcement: "🌸 Handcrafted with Love • Custom Color Orders Available • Worldwide Shipping",
  customTurnaround: "5-10 business days"
};
```

---

## 🚀 Adding New Products

Add or modify items anytime in [`js/products.js`](js/products.js):

```javascript
{
  id: "prod-10",
  name: "Handmade Strawberry Coaster",
  category: "flowers",
  price: 18,
  badge: "New Arrival",
  badgeType: "featured",
  image: "https://images.unsplash.com/...",
  description: "Sweet strawberry shaped absorbent crochet coaster.",
  yarnType: "Milk Cotton",
  dimensions: "14cm x 12cm",
  care: "Hand wash cold",
  colors: ["Ruby Red & Leaf Green", "Pastel Pink"]
}
```

---

## 📦 Project Structure

```
croche project/
├── index.html          # Main homepage & single-page application
├── css/
│   └── style.css       # Cozy pastel design system & responsive layout
├── js/
│   ├── config.js       # Store contact, WhatsApp number & email settings
│   ├── products.js     # Catalog items & Instagram showcase data
│   └── app.js          # Catalog filters, search, modal & order submission
├── .gitignore          # Keeps secrets and local config out of git
└── README.md           # Documentation & setup guide
```

---

## 📄 License
Created for **The Crochet Boutique** (@croche_boutiq). All rights reserved.
