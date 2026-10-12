/**
 * Catalog of Handcrafted Products for The Crochet Boutique
 * Based on @croche_boutiq Instagram showcase
 */
const PRODUCTS = [
  {
    id: "prod-caps",
    name: "Granny Square Daisy Bucket Hat",
    category: "caps",
    price: 32,
    badge: "Trending",
    badgeType: "bestseller",
    image: "images/caps.jpg",
    description: "Handcrafted pastel sage green and cream bucket hat featuring delicate floral daisy granny squares. Breathable, structured brim, perfect for sunny days and festival styling.",
    yarnType: "100% Breathable Milk Cotton",
    dimensions: "One Size Fits Most (55-58cm)",
    care: "Hand wash cold, air dry on a round bowl",
    colors: ["Sage Green & Cream", "Vintage Rose & Ivory", "Butter Yellow & White"]
  },
  {
    id: "prod-dresses",
    name: "Boho Lace Motif Summer Dress",
    category: "dresses",
    price: 98,
    badge: "Custom Fit",
    badgeType: "custom",
    image: "images/dresses.jpg",
    description: "Exquisite hand-crocheted bohemian summer dress with intricate floral lace openwork and scalloped hemline. Lightweight, airy drape, tailored to your custom bust and waist measurements.",
    yarnType: "Premium Mercerized Bamboo Cotton",
    dimensions: "Custom Sized (XS, S, M, L, XL, XXL)",
    care: "Gentle hand wash cold with mild detergent, dry flat",
    colors: ["Natural Cream / Ecru", "Soft Blush", "Sun-Kissed Sand", "Onyx Black"]
  },
  {
    id: "prod-gloves",
    name: "Scalloped Lace Fingerless Gloves",
    category: "gloves",
    price: 26,
    badge: "Artisan Pick",
    badgeType: "featured",
    image: "images/gloves.jpg",
    description: "Delicate and warm vintage-inspired fingerless wrist warmers with romantic scalloped edges and textured shell stitches. Free fingertips for easy phone typing and cozy coffee sips.",
    yarnType: "Ultra-Soft Merino Wool & Cotton Blend",
    dimensions: "Approx. 18cm length (Stretchy snug fit)",
    care: "Hand wash cold, reshape and dry flat",
    colors: ["Pure Cream", "Dusty Rose", "Oatmeal Heather", "Forest Moss"]
  },
  {
    id: "prod-hairbands",
    name: "Handmade Daisy Floral Headband & Bandana Set",
    category: "hairbands",
    price: 24,
    badge: "Cottagecore Favorite",
    badgeType: "bestseller",
    image: "images/hair_bands.jpg",
    description: "Charming cottagecore headband with 3D raised white daisy flowers and green leaves with adjustable tie straps, accompanied by a matching textured linen-cotton hair bandana.",
    yarnType: "Soft Anti-Pilling Baby Cotton",
    dimensions: "Universal Adult & Teen Size (Adjustable ties)",
    care: "Spot clean or gentle hand wash",
    colors: ["Classic Daisy (White/Yellow/Green)", "Sunflower Gold", "Lilac Blossom"]
  },
  {
    id: "prod-scarf",
    name: "Cozy Waffle Stitch Infinity Scarf",
    category: "scarves",
    price: 38,
    badge: "Winter Warmth",
    badgeType: "featured",
    image: "images/scarf.jpg",
    description: "Deep textured waffle-knit crochet scarf offering cloud-like warmth with zero itchiness. Double loop design that holds heat beautifully during chilly autumn and winter evenings.",
    yarnType: "Extra-Fine Australian Merino Blend",
    dimensions: "145cm circumference x 26cm width",
    care: "Hand wash in cool water with wool shampoo, dry flat",
    colors: ["Warm Terracotta / Mustard", "Oatmeal Beige", "Charcoal Slate", "Emerald Pine"]
  },
  {
    id: "prod-tablerunner",
    name: "Heirloom Macrame Lace Table Runner",
    category: "homedecor",
    price: 58,
    badge: "Home Decor",
    badgeType: "custom",
    image: "images/table_runner.jpg",
    description: "Stunning dining centerpiece featuring handcrafted geometric lace medallions and elegant fringe tassels. Adds rustic boho charm to coffee tables, dining setups, and festive gatherings.",
    yarnType: "100% Natural Unbleached Cotton Cord",
    dimensions: "180cm x 35cm (Custom lengths available)",
    care: "Gently hand wash, lay flat to dry, steam press lightly",
    colors: ["Natural Ivory / Off-White", "Warm Oatmeal", "Antique Beige"]
  },
  {
    id: "prod-pouch",
    name: "Embroidered Strawberry Crochet Cosmetic Pouch",
    category: "bags",
    price: 22,
    badge: "Cute & Practical",
    badgeType: "bestseller",
    image: "images/pouch.jpg",
    description: "Sweet textured crochet zipper clutch with a hand-embroidered strawberry motif and antique brass zipper. Fully lined to securely store cosmetics, coins, keys, or AirPods.",
    yarnType: "Dense Durable Milk Cotton Yarn",
    dimensions: "18cm width x 13cm height x 5cm depth",
    care: "Wipe with damp cloth or gentle hand wash inside out",
    colors: ["Cream with Strawberry", "Blush Pink with Daisy", "Sage with Peach"]
  },
  {
    id: "prod-tote",
    name: "Sunburst Granny Square Market Tote",
    category: "bags",
    price: 48,
    badge: "Bestseller",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted 100% organic cotton granny square tote bag. Reinforced sturdy shoulder straps and generous storage for books, yarn skeins, and daily essentials.",
    yarnType: "Premium Milk Cotton",
    dimensions: "36cm x 34cm",
    care: "Hand wash cold, air dry flat",
    colors: ["Earthy Mustard & Sage", "Pastel Rainbow", "Vintage Rose & Cream"]
  },
  {
    id: "prod-plushie",
    name: "Velvet Bumblebee & Berry Plush Duo",
    category: "plushies",
    price: 28,
    badge: "Customer Favorite",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    description: "Irresistibly cute handmade plush bee with glitter safety eyes and a matching sweet strawberry companion. Stuffed with hypoallergenic polyfill.",
    yarnType: "Plush Chenille Velvet Yarn",
    dimensions: "12cm height each",
    care: "Spot clean with damp cloth",
    colors: ["Sunny Yellow & Black", "Pastel Pink & White", "Baby Blue"]
  }
];

const INSTAGRAM_POSTS = [
  {
    caption: "A fresh batch of sunflower bouquets ready to brighten someone's day! 🌻 Which color combo is your favorite?",
    likes: "142",
    comments: "18",
    image: "images/hair_bands.jpg"
  },
  {
    caption: "Baby booties & lace dress set heading off to a sweet newborn photoshoot 🤍 Custom orders open for next month!",
    likes: "215",
    comments: "31",
    image: "images/dresses.jpg"
  },
  {
    caption: "Crochet bucket hat in progress. Granny squares take patience, but the final texture is everything ✨",
    likes: "189",
    comments: "24",
    image: "images/caps.jpg"
  },
  {
    caption: "Meet the newest little pouch buddy 🍓 Crocheted with super plush yarn and brass zipper. DM to adopt!",
    likes: "320",
    comments: "47",
    image: "images/pouch.jpg"
  },
  {
    caption: "Warm winter layers made by hand. Our ribbed waffle scarf in earthy terracotta 🍂 #crochetlove",
    likes: "167",
    comments: "15",
    image: "images/scarf.jpg"
  },
  {
    caption: "Close up of our table runner lace stitches. Handcrafted slow fashion that lasts for years 🧶",
    likes: "298",
    comments: "40",
    image: "images/table_runner.jpg"
  }
];
