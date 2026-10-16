/**
 * Catalog of Handcrafted Products for The Crochet Boutique
 * 100% authentic photography sourced directly from @croche_boutiq Instagram profile.
 * Cleaned of technical yarn/hook noise and organized into user-requested category groups.
 */

const DEFAULT_CATEGORIES = [
  { id: "sweaters", name: "Sweaters" },
  { id: "shirts", name: "Shirts" },
  { id: "kids", name: "Kids" },
  { id: "gloves", name: "Gloves" },
  { id: "skaffs", name: "Skaffs" },
  { id: "caps", name: "Caps" },
  { id: "bags", name: "Bags" },
  { id: "accessories", name: "Accessories" }
];

const DEFAULT_PRODUCTS = [
  // --- SWEATERS ---
  {
    id: "prod-sweater-braid",
    name: "Cozy Chunky Braid Winter Sweater",
    category: "sweaters",
    badge: "Boutique Favorite",
    badgeType: "bestseller",
    image: "images/ig_CHupfP7BRvI.jpg",
    description: "Handcrafted chunky winter sweater featuring intricate 3D braided cable stitches with a relaxed, cozy drape.",
    visible: true
  },
  {
    id: "prod-sweater-pullover",
    name: "Soft Open-Knit Pullover Sweater",
    category: "sweaters",
    badge: "Warm Knit",
    badgeType: "featured",
    image: "images/ig_C3lWoevhF3x.jpg",
    description: "Relaxed open-stitch crochet sweater offering lightweight comfort, effortless layering, and slow-crafted charm.",
    visible: true
  },

  // --- SHIRTS / TOPS ---
  {
    id: "prod-summer-shell-top",
    name: "Crochet Summer Shell Crop Top",
    category: "shirts",
    badge: "Summer Essential",
    badgeType: "featured",
    image: "images/ig_CxJM5tFIL-H.jpg",
    description: "Lightweight summer shell stitch crop top with delicate scalloped borders, perfect for warm days and festival wear.",
    visible: true
  },
  {
    id: "prod-artisan-shirt-top",
    name: "Handcrafted Lace Motif Top",
    category: "shirts",
    badge: "Trending",
    badgeType: "custom",
    image: "images/ig_C-rtiUdyMfY.jpg",
    description: "Mindfully stitched artisan crochet top crafted with airy openwork motifs in warm, sun-kissed shades.",
    visible: true
  },

  // --- KIDS & BABY ---
  {
    id: "prod-baby-romper-set",
    name: "Crochet Baby Romper & Bonnet Set",
    category: "kids",
    badge: "Newborn Keepsake",
    badgeType: "bestseller",
    image: "images/ig_DJt-WgyBRhE.jpg",
    description: "Adorable baby romper with matching bonnet cap, hand-stitched from ultra-gentle yarn for toddlers and newborns.",
    visible: true
  },
  {
    id: "prod-baby-blanket",
    name: "Cloud-Soft Baby Wrap & Blanket",
    category: "kids",
    badge: "Baby Keepsake",
    badgeType: "featured",
    image: "images/ig_C20K7HEhjVy.jpg",
    description: "Cloud-soft baby receiving blanket and swaddle wrap handcrafted in calming pastel sky blue and pure ivory.",
    visible: true
  },

  // --- GLOVES ---
  {
    id: "prod-fingerless-gloves",
    name: "Handcrafted Fingerless Hand Gloves",
    category: "gloves",
    badge: "Artisan Pick",
    badgeType: "featured",
    image: "images/gloves.jpg",
    description: "Delicate and warm vintage-inspired fingerless crochet gloves with scalloped edges, keeping hands toasty while freeing fingers.",
    visible: true
  },

  // --- SKAFFS (SCARVES & SHAWLS) ---
  {
    id: "prod-shawl-triangular",
    name: "Triangular Winter Wrap Shawl",
    category: "skaffs",
    badge: "Signature Piece",
    badgeType: "bestseller",
    image: "images/ig_CJBs-DlBzGs.jpg",
    description: "Chunky triangular winter wrap shawl with textured openwork stitches and flowing fringe border.",
    visible: true
  },
  {
    id: "prod-scarf-striped",
    name: "Striped Cozy Winter Scarf",
    category: "skaffs",
    badge: "Winter Drop",
    badgeType: "featured",
    image: "images/ig_DS4u-38D8WW.jpg",
    description: "Vibrant striped crochet winter scarf drop, crafted with dense textured stitches for reliable cold-weather comfort.",
    visible: true
  },
  {
    id: "prod-neck-warmer",
    name: "Winter Cozy Neck Warmer",
    category: "skaffs",
    badge: "Cozy Warmth",
    badgeType: "custom",
    image: "images/ig_DSw1FkSjy_a.jpg",
    description: "Snug winter neck wrap handcrafted with plush stitches to keep breezes out with effortless elegance.",
    visible: true
  },

  // --- CAPS & HATS ---
  {
    id: "prod-bobble-headband",
    name: "Bobble Ear-Warmer Headband",
    category: "caps",
    badge: "Winter Warmth",
    badgeType: "featured",
    image: "images/ig_CxAuDhSBjWJ.jpg",
    description: "Royal blue textured bobble-stitch stretch ear-warmer headband, designed for cozy protection on breezy outings.",
    visible: true
  },
  {
    id: "prod-daisy-bucket-hat",
    name: "Granny Square Daisy Bucket Hat",
    category: "caps",
    badge: "Trending",
    badgeType: "bestseller",
    image: "images/caps.jpg",
    description: "Charming sage and cream bucket hat featuring floral daisy granny squares and breathable structured brim.",
    visible: true
  },

  // --- BAGS ---
  {
    id: "prod-sling-bag",
    name: "Dual-Tone Crochet Sling Bag",
    category: "bags",
    badge: "Everyday Chic",
    badgeType: "bestseller",
    image: "images/ig_CH-fP3kBb8_.jpg",
    description: "Pastel pink and white handcrafted crochet sling bag with a braided shoulder strap and secure closure.",
    visible: true
  },

  // --- ACCESSORIES ---
  {
    id: "prod-lipbalm-holder",
    name: "Lip Balm & Perfume Sleeve Keychain",
    category: "accessories",
    badge: "Handy Cutie",
    badgeType: "bestseller",
    image: "images/ig_CKnLjpoBtpL.jpg",
    description: "Cute and practical crochet sleeve keychain made to hold your everyday lip balm, lipstick, or travel perfume.",
    visible: true
  },
  {
    id: "prod-bow-dress-trio",
    name: "Miniature Bow Dress Keychains Trio",
    category: "accessories",
    badge: "Gift Set",
    badgeType: "featured",
    image: "images/ig_CN8CV0Oho8v.jpg",
    description: "Set of three miniature crochet dress keychains with delicate bows in teal, orange, and pastel pink.",
    visible: true
  },
  {
    id: "prod-dress-charm",
    name: "Signature Miniature Dress Charm",
    category: "accessories",
    badge: "Artisan Charm",
    badgeType: "custom",
    image: "images/ig_CMkJJW7BC0u.jpg",
    description: "Signature miniature dress charm with gold keyring and lobster clasp, hand-stitched with tiny ruffled sleeves.",
    visible: true
  },
  {
    id: "prod-floral-motif",
    name: "Handcrafted Floral Crochet Motif",
    category: "accessories",
    badge: "Artisan Drop",
    badgeType: "featured",
    image: "images/ig_DAeOAb_BWR1.jpg",
    description: "Intricately stitched floral motif piece showcasing the slow, artistic craft of @croche_boutiq.",
    visible: true
  },
  {
    id: "prod-textured-motif",
    name: "Textured Artisan Crochet Accent",
    category: "accessories",
    badge: "Special Edition",
    badgeType: "custom",
    image: "images/ig_DAePie2BVDh.jpg",
    description: "Unique textured crochet accent piece crafted with detailed stitches for bags, home, or bespoke styling.",
    visible: true
  }
];

// Active categories & products arrays (initialized from localStorage or defaults)
let CATEGORIES = [...DEFAULT_CATEGORIES];
let PRODUCTS = [...DEFAULT_PRODUCTS];

const INSTAGRAM_POSTS = [
  {
    shortcode: "CHupfP7BRvI",
    url: "https://www.instagram.com/p/CHupfP7BRvI/",
    caption: "Custom winter braided sweater reveal! Handcrafted happiness in every slow stitch 🧶",
    likes: "40",
    comments: "8",
    image: "images/ig_CHupfP7BRvI.jpg"
  },
  {
    shortcode: "CJBs-DlBzGs",
    url: "https://www.instagram.com/p/CJBs-DlBzGs/",
    caption: "Chunky triangular winter wrap shawl with custom textured edging. Handcrafted with love at @croche_boutiq ❄️",
    likes: "40",
    comments: "11",
    image: "images/ig_CJBs-DlBzGs.jpg"
  },
  {
    shortcode: "CxJM5tFIL-H",
    url: "https://www.instagram.com/p/CxJM5tFIL-H/",
    caption: "Crochet summer shell crop top 🌸 Vibrant tones in shell stitch. DM or WhatsApp to order!",
    likes: "19",
    comments: "0",
    image: "images/ig_CxJM5tFIL-H.jpg"
  },
  {
    shortcode: "DJt-WgyBRhE",
    url: "https://www.instagram.com/p/DJt-WgyBRhE/",
    caption: "Romper and cap for 2-year-old 🤍 Soft stitches for little ones. DM to order your custom baby set!",
    likes: "16",
    comments: "1",
    image: "images/ig_DJt-WgyBRhE.jpg"
  },
  {
    shortcode: "DS4u-38D8WW",
    url: "https://www.instagram.com/p/DS4u-38D8WW/",
    caption: "Another scarf drop 🧶✨ Handmade • Cozy • On repeat. Striping yarn blends for chilly days!",
    likes: "5",
    comments: "0",
    image: "images/ig_DS4u-38D8WW.jpg"
  },
  {
    shortcode: "CH-fP3kBb8_",
    url: "https://www.instagram.com/p/CH-fP3kBb8_/",
    caption: "Pastel pink & white handcrafted crochet sling bag with braided handle. Compact and lightweight 💖",
    likes: "29",
    comments: "4",
    image: "images/ig_CH-fP3kBb8_.jpg"
  },
  {
    shortcode: "C20K7HEhjVy",
    url: "https://www.instagram.com/p/C20K7HEhjVy/",
    caption: "Cloud-soft baby blanket & swaddle wrap in pastel sky blue and ivory. The sweetest dreams 👶",
    likes: "12",
    comments: "3",
    image: "images/ig_C20K7HEhjVy.jpg"
  },
  {
    shortcode: "CKnLjpoBtpL",
    url: "https://www.instagram.com/p/CKnLjpoBtpL/",
    caption: "Everyday lip balm & travel perfume holder keychain. Never lose your lip balm in your bag again! 💄✨",
    likes: "36",
    comments: "2",
    image: "images/ig_CKnLjpoBtpL.jpg"
  },
  {
    shortcode: "CN8CV0Oho8v",
    url: "https://www.instagram.com/p/CN8CV0Oho8v/",
    caption: "Miniature bow dress keychains trio in teal, orange, and pink! Cute favors and bag charms 👗🎀",
    likes: "29",
    comments: "4",
    image: "images/ig_CN8CV0Oho8v.jpg"
  },
  {
    shortcode: "CMkJJW7BC0u",
    url: "https://www.instagram.com/p/CMkJJW7BC0u/",
    caption: "Miniature crochet dress keychain with gold hardware. Handcrafted happiness in every tiny stitch! 🧶",
    likes: "19",
    comments: "2",
    image: "images/ig_CMkJJW7BC0u.jpg"
  }
];

// Available authentic Instagram images library for the owner to pick from on the left side
const INSTAGRAM_MEDIA_LIBRARY = [
  { path: "images/ig_CHupfP7BRvI.jpg", label: "Chunky Winter Sweater" },
  { path: "images/ig_C3lWoevhF3x.jpg", label: "Open-Knit Pullover" },
  { path: "images/ig_CxJM5tFIL-H.jpg", label: "Summer Shell Crop Top" },
  { path: "images/ig_C-rtiUdyMfY.jpg", label: "Lace Motif Top" },
  { path: "images/ig_DJt-WgyBRhE.jpg", label: "Baby Romper & Cap Set" },
  { path: "images/ig_C20K7HEhjVy.jpg", label: "Baby Wrap Blanket" },
  { path: "images/gloves.jpg", label: "Fingerless Hand Gloves" },
  { path: "images/ig_CJBs-DlBzGs.jpg", label: "Triangular Winter Shawl" },
  { path: "images/ig_DS4u-38D8WW.jpg", label: "Striped Winter Scarf" },
  { path: "images/ig_DSw1FkSjy_a.jpg", label: "Winter Neck Warmer" },
  { path: "images/ig_CxAuDhSBjWJ.jpg", label: "Bobble Ear-Warmer Headband" },
  { path: "images/caps.jpg", label: "Daisy Granny Square Hat" },
  { path: "images/ig_CH-fP3kBb8_.jpg", label: "Pink & White Sling Bag" },
  { path: "images/ig_CKnLjpoBtpL.jpg", label: "Lip Balm & Perfume Sleeve" },
  { path: "images/ig_CN8CV0Oho8v.jpg", label: "Bow Dress Keychains Trio" },
  { path: "images/ig_CMkJJW7BC0u.jpg", label: "Miniature Dress Charm" },
  { path: "images/ig_DAeOAb_BWR1.jpg", label: "Floral Motif Accent" },
  { path: "images/ig_DAePie2BVDh.jpg", label: "Textured Motif Accent" },
  { path: "images/instagram_logo.jpg", label: "Official Boutique Logo" }
];
