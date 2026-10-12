/**
 * Catalog of Handcrafted Products for The Crochet Boutique
 * Based on @croche_boutiq Instagram showcase
 */
const PRODUCTS = [
  {
    id: "prod-1",
    name: "Sunburst Granny Square Tote",
    category: "bags",
    price: 48,
    badge: "Bestseller",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted 100% organic cotton granny square tote bag. Reinforced sturdy handles, lined interior with sweet floral motifs.",
    yarnType: "Premium Milk Cotton",
    dimensions: "36cm x 34cm",
    care: "Hand wash cold, air dry flat",
    colors: ["Earthy Mustard & Sage", "Pastel Rainbow", "Vintage Rose & Cream"]
  },
  {
    id: "prod-2",
    name: "Forever Sunflower & Tulip Bouquet",
    category: "flowers",
    price: 36,
    badge: "Never Fades",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    description: "Crocheted botanical bouquet featuring 3 cheerful sunflowers, 2 soft pink tulips, and eucalyptus sprigs wrapped in craft paper and satin ribbon.",
    yarnType: "Soft Acrylic & Cotton Blend",
    dimensions: "Approx. 30cm length",
    care: "Dust gently with soft brush",
    colors: ["Classic Golden Sunflowers", "Pastel Pink & Cream", "Lilac & Daisy"]
  },
  {
    id: "prod-3",
    name: "Chunky Cloud Chenille Cardigan",
    category: "wearables",
    price: 85,
    badge: "Made to Order",
    badgeType: "custom",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-cozy balloon-sleeve cropped cardigan hand-knitted and crocheted with chunky cloud velvet yarn. Tortoiseshell wooden buttons.",
    yarnType: "Chunky Chenille & Merino Wool",
    dimensions: "Custom sizing (XS to XXL)",
    care: "Hand wash cold inside out, dry flat",
    colors: ["Oatmeal Cream", "Dusty Lavender", "Sage Green", "Soft Rose"]
  },
  {
    id: "prod-4",
    name: "Honeybee & Strawberry Amigurumi Duo",
    category: "plushies",
    price: 28,
    badge: "Customer Favorite",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    description: "Irresistibly cute handmade plush bee with glitter safety eyes and a matching sweet strawberry companion. Stuffed with hypoallergenic polyfill.",
    yarnType: "Plush Chenille Velvet Yarn",
    dimensions: "12cm height each",
    care: "Spot clean with damp cloth",
    colors: ["Sunny Yellow & Black", "Pastel Pink & White", "Baby Blue"]
  },
  {
    id: "prod-5",
    name: "Heirloom Baby Bonnet & Booties Set",
    category: "baby",
    price: 42,
    badge: "Gift Box Included",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    description: "Gentle newborn-safe handcrafted scalloped bonnet and matching snug booties. Soft tie ribbons, packaged in a keepsake eco-gift box.",
    yarnType: "100% Organic Bamboo Cotton",
    dimensions: "0-3 Months / 3-6 Months / 6-12 Months",
    care: "Gentle baby wash, dry flat",
    colors: ["Pure Ivory", "Blush Peach", "Sage Mint", "Warm Camel"]
  },
  {
    id: "prod-6",
    name: "Cozy Ribbed Waffle Infinity Scarf",
    category: "wearables",
    price: 34,
    badge: "Winter Essential",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    description: "Thick textured waffle-stitch scarf offering double loop warmth without feeling heavy. Soft against sensitive skin with no scratchiness.",
    yarnType: "Extra-Fine Merino Wool Blend",
    dimensions: "150cm circumference x 25cm width",
    care: "Hand wash cold, reshape and dry flat",
    colors: ["Oatmeal Beige", "Terracotta Clay", "Charcoal Gray", "Forest Pine"]
  },
  {
    id: "prod-7",
    name: "Little Lavender Bunny Plushie",
    category: "plushies",
    price: 32,
    badge: "Made with Love",
    badgeType: "custom",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    description: "Sweet sleepy bunny with long floppy ears, hand-embroidered sleepy eyelids, and a mini crochet ribbon bow. Child-safe and cuddle-ready.",
    yarnType: "Super Soft Baby Velvet",
    dimensions: "24cm ear-to-toe",
    care: "Gentle surface wash",
    colors: ["Lavender Purple", "Powder Cream", "Soft Butterscotch"]
  },
  {
    id: "prod-8",
    name: "Retro Checkered Bucket Hat",
    category: "wearables",
    price: 30,
    badge: "Trending",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
    description: "Trendy 90s inspired checkered crochet bucket hat with a structured floppy brim. Breathable, durable, and festival-ready.",
    yarnType: "100% Breathable Cotton Yarn",
    dimensions: "One size fits most (56-58cm)",
    care: "Hand wash cold, air dry on round bowl",
    colors: ["Matcha & Ivory", "Chocolate & Cream", "Lilac & Butter Yellow"]
  },
  {
    id: "prod-9",
    name: "Boho Daisy Floral Coaster Set (Set of 4)",
    category: "flowers",
    price: 22,
    badge: "Home Accent",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
    description: "Set of 4 absorbent handmade daisy crochet mug rugs. Protects wooden surfaces while adding cozy cafe vibes to your morning coffee routine.",
    yarnType: "100% Cotton Mercerized Thread",
    dimensions: "12cm diameter each",
    care: "Machine wash delicate in mesh bag",
    colors: ["White Petals / Yellow Center", "Mixed Pastel Petals", "Muted Terracotta"]
  }
];

const INSTAGRAM_POSTS = [
  {
    caption: "A fresh batch of sunflower bouquets ready to brighten someone's day! 🌻 Which color combo is your favorite?",
    likes: "142",
    comments: "18",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    caption: "Baby booties & bonnet set heading off to a sweet newborn photoshoot 🤍 Custom orders open for next month!",
    likes: "215",
    comments: "31",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    caption: "Crochet tote bag in progress. Granny squares take patience, but the final texture is everything ✨",
    likes: "189",
    comments: "24",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80"
  },
  {
    caption: "Meet the newest little bumblebee buddy 🐝 Crocheted with super plush chenille yarn. DM to adopt!",
    likes: "320",
    comments: "47",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
  },
  {
    caption: "Warm winter layers made by hand. Our ribbed waffle scarf in earthy terracotta 🍂 #crochetlove",
    likes: "167",
    comments: "15",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80"
  },
  {
    caption: "Close up of our cloud cardigan sleeves. Handcrafted slow fashion that lasts for years 🧶",
    likes: "298",
    comments: "40",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
  }
];
