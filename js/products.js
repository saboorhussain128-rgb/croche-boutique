/**
 * Catalog of Handcrafted Products for The Crochet Boutique
 * Based on @croche_boutiq Instagram showcase & genuine handcrafted inventory
 */
const PRODUCTS = [
  {
    id: "prod-sweater-xxl",
    name: "Custom Chunky Braid Winter Sweater",
    category: "tops",
    badge: "Client Favorite",
    badgeType: "bestseller",
    image: "images/ig_CHupfP7BRvI.jpg",
    description: "Custom-made chunky winter sweater featuring intricate 3D braided cable stitches, crafted with approx. 700g premium yarn and 5mm hook. Commissioned for @m.a.k.foods in XXL (custom sizes available on inquiry).",
    yarnType: "Premium Chunky 3D Wool & Acrylic (700g)",
    dimensions: "Custom Tailored (S, M, L, XL, XXL)",
    care: "Hand wash cold inside out, reshape and lay flat to dry",
    colors: ["Heather Gray", "Classic Charcoal", "Warm Cream", "Custom Tone"]
  },
  {
    id: "prod-shawl",
    name: "Triangular Winter Wrap Shawl",
    category: "scarves",
    badge: "Boutique Signature",
    badgeType: "featured",
    image: "images/ig_CJBs-DlBzGs.jpg",
    description: "Signature chunky triangular winter shawl featuring textured openwork stitches, cozy drape, and fringe edging with the official @croche_boutiq seal. Keeps you warm and stylish all season.",
    yarnType: "Ultra-Soft Chunky Winter Yarn",
    dimensions: "Approx. 165cm wingspan x 75cm depth",
    care: "Gentle hand wash cold, lay flat to dry",
    colors: ["Vintage Mustard", "Burgundy Wine", "Oatmeal Beige", "Charcoal Slate"]
  },
  {
    id: "prod-summer-shell-top",
    name: "Crochet Summer Shell Crop Top",
    category: "tops",
    badge: "Summer Essential",
    badgeType: "featured",
    image: "images/ig_CxJM5tFIL-H.jpg",
    description: "Handmade lightweight summer shell stitch crop top styled on wooden hanger. Features intricate scalloped edges and breathable lace design, perfect for festival and warm weather layering.",
    yarnType: "100% Breathable Milk Cotton",
    dimensions: "Small / Custom Bust Sizing (XS, S, M, L)",
    care: "Hand wash cold, air dry flat",
    colors: ["Magenta Rose", "Olive Green", "Royal Purple", "Sun-Kissed Sand"]
  },
  {
    id: "prod-sling-bag",
    name: "Handmade Dual-Tone Crochet Sling Bag",
    category: "bags",
    badge: "Everyday Chic",
    badgeType: "bestseller",
    image: "images/ig_CH-fP3kBb8_.jpg",
    description: "Charming handcrafted crochet sling bag in pastel pink and white featuring a sturdy braided shoulder strap, dense weave body, and secure closure. Lightweight for outings and daily essentials.",
    yarnType: "Reinforced Multi-Ply Cotton Cord",
    dimensions: "20cm width x 16cm height (110cm strap)",
    care: "Spot clean with damp cloth or gentle hand wash",
    colors: ["Pastel Pink & White", "Sage Green & Cream", "Lilac & Ivory"]
  },
  {
    id: "prod-baby-blanket",
    name: "Cloud-Soft Baby Wrap & Blanket",
    category: "baby",
    badge: "Baby Keepsake",
    badgeType: "featured",
    image: "images/ig_C20K7HEhjVy.jpg",
    description: "Cloud-soft baby swaddle wrap and receiving blanket handcrafted in sky blue and pure white. Hypoallergenic, featherlight, and non-irritating for delicate newborn skin.",
    yarnType: "100% Hypoallergenic Baby Milk Cotton",
    dimensions: "85cm x 85cm (Custom cot sizes available)",
    care: "Delicate baby wash cold, lay flat to dry",
    colors: ["Sky Blue & White", "Blush Pink & Ivory", "Buttercup Yellow", "Mint Green"]
  },
  {
    id: "prod-romper-set",
    name: "Baby Romper & Matching Bonnet Cap Set",
    category: "baby",
    badge: "Newborn Keepsake",
    badgeType: "bestseller",
    image: "images/romper_and_cap.jpg",
    description: "Adorable handcrafted peach and cream striped baby romper with natural wooden buttons paired with a matching scalloped lace bonnet cap. Ultra-gentle on delicate newborn skin.",
    yarnType: "100% Hypoallergenic Bamboo Baby Yarn",
    dimensions: "Available in 0-3M, 3-6M, 6-12M & Custom",
    care: "Delicate baby hand wash, reshape and lay flat to dry",
    colors: ["Peach & Cream", "Sage & Ivory", "Soft Butterscotch", "Pure White"]
  },
  {
    id: "prod-bobble-headband",
    name: "Textured Bobble Ear-Warmer Headband",
    category: "caps",
    badge: "Winter Warmth",
    badgeType: "featured",
    image: "images/ig_CxAuDhSBjWJ.jpg",
    description: "Handcrafted royal blue textured bobble-stitch ear-warmer headband. Elastic stretch ensures snug comfort while keeping ears toasty during breezy outings.",
    yarnType: "Premium Anti-Pilling Acrylic Wool",
    dimensions: "Universal Stretch Fit (52-58cm)",
    care: "Hand wash cold, dry flat",
    colors: ["Royal Blue", "Forest Green", "Dusty Mauve", "Warm Cream"]
  },
  {
    id: "prod-daisy-hat",
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
    id: "prod-fingerless-gloves",
    name: "Handcrafted Crochet Hand Gloves (Fingerless)",
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
    id: "prod-lipbalm-holder",
    name: "Everyday Lip Balm & Perfume Holder Keychain",
    category: "accessories",
    badge: "Handy Cutie",
    badgeType: "bestseller",
    image: "images/ig_CKnLjpoBtpL.jpg",
    description: "Clever and adorable handcrafted crochet sleeve pouch keychain made to securely hold your everyday lip balm, lipstick, or travel perfume spray. Clips right onto keys or handbags.",
    yarnType: "Durable Double-Twist Cotton",
    dimensions: "9cm height x 3cm diameter (Keyring included)",
    care: "Hand wash cold, air dry",
    colors: ["Pastel Lavender", "Bubblegum Pink", "Mint Green", "Sunny Yellow"]
  },
  {
    id: "prod-bow-dress-trio",
    name: "Miniature Bow Dress Keychains Trio",
    category: "accessories",
    badge: "Gift Set",
    badgeType: "featured",
    image: "images/ig_CN8CV0Oho8v.jpg",
    description: "Set of three miniature crochet dress keychains adorned with cute bow accents in teal, peach-orange, and pastel pink. Wonderful as bag charms, return gifts, or friendship keepsakes.",
    yarnType: "Fine Mercerized Cotton Thread",
    dimensions: "Set of 3 (Each approx. 6cm x 5cm)",
    care: "Spot clean only",
    colors: ["Teal / Orange / Pink Trio", "Custom Color Set"]
  },
  {
    id: "prod-dress-charm",
    name: "Signature Miniature Dress Charm Keychain",
    category: "accessories",
    badge: "Artisan Charm",
    badgeType: "custom",
    image: "images/ig_CMkJJW7BC0u.jpg",
    description: "Official @croche_boutiq signature miniature dress charm with gold keyring and lobster clasp. Hand-stitched with tiny ruffled sleeves and flared skirt detail.",
    yarnType: "Soft Combed Cotton",
    dimensions: "Approx. 7cm height",
    care: "Spot clean gently",
    colors: ["Candy Pink & White", "Lilac Blossom", "Teal Breeze", "Crimson"]
  }
];

const INSTAGRAM_POSTS = [
  {
    shortcode: "CHupfP7BRvI",
    url: "https://www.instagram.com/p/CHupfP7BRvI/",
    caption: "It took about 30 days (40 hrs) to make this beautiful custom XXL sweater for @m.a.k.foods with 700g yarn & 5mm hook 🧶 A handmade happiness!",
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
    caption: "Crochet summer shell crop top 🌸 Small Size. Vibrant tones in shell stitch. DM or WhatsApp for custom sizing!",
    likes: "19",
    comments: "0",
    image: "images/ig_CxJM5tFIL-H.jpg"
  },
  {
    shortcode: "CH-fP3kBb8_",
    url: "https://www.instagram.com/p/CH-fP3kBb8_/",
    caption: "Pastel pink & white handcrafted crochet sling bag with braided handle. Compact and lightweight for everyday outings 💖",
    likes: "29",
    comments: "4",
    image: "images/ig_CH-fP3kBb8_.jpg"
  },
  {
    shortcode: "C20K7HEhjVy",
    url: "https://www.instagram.com/p/C20K7HEhjVy/",
    caption: "Cloud-soft baby blanket & swaddle wrap in pastel sky blue and ivory. Hypoallergenic yarn for the sweetest dreams 👶",
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
