/**
 * Catalog of Handcrafted Products for The Crochet Boutique
 * Based on @croche_boutiq Instagram showcase
 */
const PRODUCTS = [
  {
    id: "prod-bolero",
    name: "Floral Granny Square Bolero Shrug",
    category: "tops",
    badge: "Viral Favorite",
    badgeType: "bestseller",
    image: "images/bolero_shrug.jpg",
    description: "Trendsetting open-front cropped bolero with dramatic flare bell sleeves, crafted from vintage pastel floral granny squares with delicate scalloped edging.",
    yarnType: "100% Breathable Milk Cotton",
    dimensions: "Custom Tailored (XS, S, M, L, XL)",
    care: "Hand wash cold inside out, lay flat to dry",
    colors: ["Pastel Blossom Mix", "Earthy Sage & Mustard", "Monochrome Cream & Ivory"]
  },
  {
    id: "prod-halter",
    name: "Scalloped Lace Halter Crop Top",
    category: "tops",
    badge: "Festival Essential",
    badgeType: "featured",
    image: "images/halter_top.jpg",
    description: "Romantic summer festival halter top with intricate shell lace stitches, sweetheart scalloped border, and adjustable criss-cross lace-up back with boho tassel beads.",
    yarnType: "Soft Mercerized Bamboo Cotton",
    dimensions: "Custom Cup & Underbust Sizing (A, B, C, D+)",
    care: "Gentle hand wash cold, reshape and dry flat",
    colors: ["Cream & Sage Dual-Tone", "Sun-Kissed Sand", "Terracotta Clay", "Pure Ecru"]
  },
  {
    id: "prod-sweater",
    name: "Chunky Mesh Flare Sleeve Sweater",
    category: "tops",
    badge: "Cozy Boho",
    badgeType: "custom",
    image: "images/flare_sweater.jpg",
    description: "Airy, oversized open-mesh crochet pullover sweater featuring exaggerated bell sleeves and ribbed scalloped boat neckline. Effortlessly chic over bralettes or slip dresses.",
    yarnType: "Extra-Soft Chenille Velvet & Cotton Blend",
    dimensions: "Relaxed Oversized Fit (S/M, L/XL)",
    care: "Hand wash cold, squeeze gently in towel, dry flat",
    colors: ["Warm Oatmeal Cream", "Dusty Rose", "Sage Green", "Charcoal Mist"]
  },
  {
    id: "prod-dresses",
    name: "Boho Lace Motif Summer Dress",
    category: "dresses",
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
    id: "prod-rompercap",
    name: "Crochet Baby Romper & Matching Cap Set",
    category: "baby",
    badge: "Newborn Keepsake",
    badgeType: "featured",
    image: "images/romper_and_cap.jpg",
    description: "Adorable handcrafted peach and cream striped baby romper with natural wooden buttons paired with a matching scalloped lace bonnet cap. Ultra-gentle on delicate newborn skin.",
    yarnType: "100% Hypoallergenic Bamboo Baby Yarn",
    dimensions: "Available in 0-3M, 3-6M, 6-12M & Custom",
    care: "Delicate baby hand wash, reshape and lay flat to dry",
    colors: ["Peach & Cream", "Sage & Ivory", "Soft Butterscotch", "Pure White"]
  },
  {
    id: "prod-caps",
    name: "Granny Square Daisy Bucket Hat",
    category: "caps",
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
    id: "prod-gloves",
    name: "Handcrafted Crochet Hand Gloves (Fingerless Mitts)",
    category: "gloves",
    badge: "Artisan Pick",
    badgeType: "featured",
    image: "images/gloves.jpg",
    description: "Delicate and warm vintage-inspired fingerless crochet hand gloves with romantic scalloped edges and textured shell stitches. Free fingertips for easy phone typing and cozy coffee sips.",
    yarnType: "Ultra-Soft Merino Wool & Cotton Blend",
    dimensions: "Approx. 18cm length (Stretchy snug fit)",
    care: "Hand wash cold, reshape and dry flat",
    colors: ["Pure Cream", "Dusty Rose", "Oatmeal Heather", "Forest Moss"]
  },
  {
    id: "prod-hairbands",
    name: "Handmade Daisy Floral Headband & Bandana Set",
    category: "hairbands",
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
    badge: "Cute & Practical",
    badgeType: "bestseller",
    image: "images/pouch.jpg",
    description: "Sweet textured crochet zipper clutch with a hand-embroidered strawberry motif and antique brass zipper. Fully lined to securely store cosmetics, coins, keys, or AirPods.",
    yarnType: "Dense Durable Milk Cotton Yarn",
    dimensions: "18cm width x 13cm height x 5cm depth",
    care: "Wipe with damp cloth or gentle hand wash inside out",
    colors: ["Cream with Strawberry", "Blush Pink with Daisy", "Sage with Peach"]
  }
];

const INSTAGRAM_POSTS = [
  {
    caption: "Our new floral granny square bolero shrug is here! 🌸 Perfect bell sleeves and cozy stitches. DM to order!",
    likes: "264",
    comments: "38",
    image: "images/bolero_shrug.jpg"
  },
  {
    caption: "Summer festival ready in our scalloped halter crop top 🌾 Custom measurements open for next week!",
    likes: "318",
    comments: "42",
    image: "images/halter_top.jpg"
  },
  {
    caption: "The coziest airy mesh knit sweater 🧶 Oversized bell sleeves for chilly morning coffee.",
    likes: "285",
    comments: "29",
    image: "images/flare_sweater.jpg"
  },
  {
    caption: "Baby romper & scalloped cap set heading off to a sweet newborn photoshoot 🤍 Custom orders open!",
    likes: "215",
    comments: "31",
    image: "images/romper_and_cap.jpg"
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
