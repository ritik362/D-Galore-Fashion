import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { getWishlist, toggleWishlistItem } from './wishlistState.js';
import '../style.css';

const imageUrls = import.meta.glob('../img/*', { eager: true, query: '?url', import: 'default' });
const girlBagUrls = import.meta.glob('../girl-bag/*', { eager: true, query: '?url', import: 'default' });

function resolveImg(path) {
  if (!path) return '';
  const clean = path.replace(/^\.\//, '').replace(/^\//, '');
  const filename = clean.split('/').pop();
  return (
    girlBagUrls['../' + clean] ||
    imageUrls['../' + clean] ||
    girlBagUrls['../girl-bag/' + filename] ||
    imageUrls['../img/' + filename] ||
    clean
  );
}

// Master B2B Export & Manufacturing Products Catalog (No Retail Pricing)
const allProducts = [
  {
    "id": "prod-01",
    "itemCode": "DGF-HB-01",
    "name": "Royal Blossom Zardozi Beaded Clutch",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "15-20 Days Production",
    "sampling": "7 Days Tech-Pack Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (8).jpeg",
    "colors": [
      "#c69d57",
      "#e5b3c2",
      "#1a1b18"
    ],
    "colorNames": [
      "Champagne Gold",
      "Rose Gold",
      "Midnight Noir"
    ],
    "dimensions": "22 cm (W) x 14 cm (H) x 5.5 cm (D)",
    "material": "Pure Silk base with hand-cut Japanese glass beads, bugle beads, and crystal clasp.",
    "inStock": true,
    "description": "An artisanal masterpiece featuring intricate hand-embroidered floral motifs, lustrous metallic bugle beads, and a detachable gold snake chain for versatile cross-body or clutch wear."
  },
  {
    "id": "prod-02",
    "itemCode": "DGF-CL-02",
    "name": "Midnight Glamour Crystal Evening Bag",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "50 Pcs / Style",
    "leadTime": "18-22 Days Production",
    "sampling": "7-10 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (8).jpeg",
    "colors": [
      "#171815",
      "#8c7b64",
      "#b31e3d"
    ],
    "colorNames": [
      "Onyx Black",
      "Smoky Pewter",
      "Burgundy Wine"
    ],
    "dimensions": "20 cm (W) x 13 cm (H) x 6 cm (D)",
    "material": "Structured metal hardcase framed with velvet and pavé-set Austrian crystals.",
    "inStock": true,
    "description": "Designed for red carpets and high-society soirees. Features a polished metallic snap frame, opulent crystal facets, and protective velour interior with card pocket."
  },
  {
    "id": "prod-03",
    "itemCode": "DGF-HB-03",
    "name": "Artisan Heritage Rose Garden Frame Bag",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "40 Pcs / Style",
    "leadTime": "20-25 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.44 PM.jpeg",
    "colors": [
      "#d4af37",
      "#e0c9a6",
      "#2b4736"
    ],
    "colorNames": [
      "Antique Gold",
      "Ivory Pearl",
      "Emerald Green"
    ],
    "dimensions": "24 cm (W) x 16 cm (H) x 7 cm (D)",
    "material": "Generational aari hand-beadwork on reinforced dupion silk with vintage brass handle.",
    "inStock": true,
    "description": "A celebration of 40 years of Pilkhuwa artisan craftsmanship. Hundreds of micro pearls and faceted seed beads harmonize to create an heirloom-worthy statement silhouette."
  },
  {
    "id": "prod-04",
    "itemCode": "DGF-CL-04",
    "name": "Sunset Radiance Shimmer Potli",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "60 Pcs / Style",
    "leadTime": "14-18 Days Production",
    "sampling": "5-7 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (9).jpeg",
    "colors": [
      "#e6b87d",
      "#f2dcd3",
      "#4a154b"
    ],
    "colorNames": [
      "Golden Sunset",
      "Blush Peach",
      "Deep Plum"
    ],
    "dimensions": "21 cm (W) x 23 cm (H) x 6 cm (D)",
    "material": "Rich raw silk with hand-beaded tassels, braided metallic drawstrings, and pearls.",
    "inStock": true,
    "description": "A regal drawstring potli bag accented with dangling pearl latkans and heavy zardozi embroidery. Perfectly sized for phones, keys, makeup, and essentials."
  },
  {
    "id": "prod-05",
    "itemCode": "DGF-TT-05",
    "name": "Grand Classic Quilted Leather Tote",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "75 Pcs / Style",
    "leadTime": "15-20 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.28 PM (2).jpeg",
    "colors": [
      "#3e2723",
      "#212121",
      "#8d6e63"
    ],
    "colorNames": [
      "Rich Cognac",
      "Midnight Black",
      "Warm Caramel"
    ],
    "dimensions": "38 cm (W) x 29 cm (H) x 14 cm (D)",
    "material": "Premium structured vegan leather with gold-tone hardware and water-resistant lining.",
    "inStock": true,
    "description": "Spacious, elegant, and engineered for daily office, laptop, or weekend travel. Features reinforced shoulder straps, central padded laptop compartment, and inner organizer pockets."
  },
  {
    "id": "prod-06",
    "itemCode": "DGF-SL-06",
    "name": "Sleek Metropolitan Shoulder Bag",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "60 Pcs / Style",
    "leadTime": "14-18 Days Production",
    "sampling": "5-7 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.28 PM (3).jpeg",
    "colors": [
      "#1c1d1a",
      "#e6ddcf",
      "#a26b52"
    ],
    "colorNames": [
      "Carbon Black",
      "Vanilla Cream",
      "Terracotta"
    ],
    "dimensions": "27 cm (W) x 17 cm (H) x 8 cm (D)",
    "material": "Supple vegan leather with curved ergonomic shoulder strap and magnetic flap.",
    "inStock": true,
    "description": "A minimalist 90s-inspired baguette silhouette crafted from buttery soft vegan leather. Understated elegance with just the right amount of attitude."
  },
  {
    "id": "prod-07",
    "itemCode": "DGF-HB-07",
    "name": "Emerald Empress Zari Embroidered Envelope",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "40 Pcs / Style",
    "leadTime": "20-25 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (1).jpeg",
    "colors": [
      "#1b4d3e",
      "#191970",
      "#800020"
    ],
    "colorNames": [
      "Deep Emerald",
      "Midnight Navy",
      "Royal Crimson"
    ],
    "dimensions": "26 cm (W) x 15 cm (H) x 4 cm (D)",
    "material": "Deep bottle green velvet with metallic gold zari threading and pearl edging.",
    "inStock": true,
    "description": "Fit for royalty. Heavy metallic dabka and sequin embellishments arranged in symmetric Mughal architectural arch patterns over lush velvet."
  },
  {
    "id": "prod-08",
    "itemCode": "DGF-TT-08",
    "name": "Urban Canvas Structured Shopper Tote",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "100 Pcs / Style",
    "leadTime": "12-16 Days Production",
    "sampling": "5 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (2).jpeg",
    "colors": [
      "#efebe9",
      "#d7ccc8",
      "#5d4037"
    ],
    "colorNames": [
      "Natural Ecru",
      "Oatmeal Beige",
      "Espresso"
    ],
    "dimensions": "42 cm (W) x 32 cm (H) x 16 cm (D)",
    "material": "Heavyweight 16oz cotton canvas with reinforced genuine leather handles & brass feet.",
    "inStock": true,
    "description": "The quintessential heavy-duty everyday companion. Spacious enough for groceries, a 16-inch MacBook, a change of clothes, and all daily carry items."
  },
  {
    "id": "prod-09",
    "itemCode": "DGF-CL-09",
    "name": "Celestial Pearl Micro-Beaded Minaudière",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "40 Pcs / Style",
    "leadTime": "22-26 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (3).jpeg",
    "colors": [
      "#fdfbf7",
      "#f4ede4",
      "#e2d7c9"
    ],
    "colorNames": [
      "Pristine Pearl",
      "Ivory Champagne",
      "Antique Oyster"
    ],
    "dimensions": "19 cm (W) x 12 cm (H) x 5 cm (D)",
    "material": "Over 1,200 hand-set glass pearls on a sculpted oval metal frame.",
    "inStock": true,
    "description": "An iconic bridal and gala silhouette. Each glass pearl is hand-stitched by senior master karigars taking over 14 hours of continuous precision labor per bag."
  },
  {
    "id": "prod-10",
    "itemCode": "DGF-SL-10",
    "name": "Dual-Tone Saddle Crossbody Bag",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "60 Pcs / Style",
    "leadTime": "15-18 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg",
    "colors": [
      "#a0522d",
      "#2f4f4f",
      "#f5deb3"
    ],
    "colorNames": [
      "Sienna & Cream",
      "Forest & Tan",
      "All Cream"
    ],
    "dimensions": "23 cm (W) x 18 cm (H) x 7 cm (D)",
    "material": "Two-tone premium textured vegan leather with magnetic equestrian flap.",
    "inStock": true,
    "description": "Timeless equestrian charm modernized for city living. Features dual interior compartments, zippered coin pocket, and a wide comfortable crossbody strap."
  },
  {
    "id": "prod-11",
    "itemCode": "DGF-TT-11",
    "name": "Riviera Straw Weave Beach & City Tote",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "80 Pcs / Style",
    "leadTime": "16-20 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg",
    "colors": [
      "#d2b48c",
      "#e6c280",
      "#c89d5c"
    ],
    "colorNames": [
      "Natural Straw",
      "Golden Wheat",
      "Caramel Weave"
    ],
    "dimensions": "40 cm (W) x 30 cm (H) x 15 cm (D)",
    "material": "Natural handwoven organic raffia straw with smooth leatherette shoulder trims.",
    "inStock": true,
    "description": "Capture Mediterranean resort lifestyle effortlessly. Lightweight yet surprisingly sturdy with drawstring fabric lining to keep contents secure."
  },
  {
    "id": "prod-12",
    "itemCode": "DGF-HB-12",
    "name": "Champagne Shimmer Mosaic Box Bag",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "18-22 Days Production",
    "sampling": "7-9 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg",
    "colors": [
      "#e5c158",
      "#d1ccc0",
      "#84817a"
    ],
    "colorNames": [
      "Champagne Sparkle",
      "Platinum Ice",
      "Titanium"
    ],
    "dimensions": "18 cm (W) x 12 cm (H) x 6 cm (D)",
    "material": "Hand-cut glass bugle beads in a mosaic chevron arrangement on hard box frame.",
    "inStock": true,
    "description": "Crisp, contemporary box silhouette adorned with geometric metallic threading. The ideal refined companion for weddings, cocktail parties, and festivals."
  },
  {
    "id": "prod-13",
    "itemCode": "DGF-SL-13",
    "name": "Urban Compact Utility Sling",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "75 Pcs / Style",
    "leadTime": "14-16 Days Production",
    "sampling": "5-7 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg",
    "colors": [
      "#353b48",
      "#718093",
      "#c23616"
    ],
    "colorNames": [
      "Carbon Black",
      "Steel Grey",
      "Brick Red"
    ],
    "dimensions": "21 cm (W) x 16 cm (H) x 6 cm (D)",
    "material": "Textured cross-grain leatherette with dual zippered compartments and adjustable strap.",
    "inStock": true,
    "description": "Compact efficiency meets minimalist luxury. Two separate zip chambers keep phone, cards, passport, and cosmetics sorted on flights and commutes."
  },
  {
    "id": "prod-14",
    "itemCode": "DGF-TT-14",
    "name": "Petal Soft Pastel Everyday Tote",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "60 Pcs / Style",
    "leadTime": "15-18 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg",
    "colors": [
      "#ffb8b8",
      "#c7ecee",
      "#f8c291"
    ],
    "colorNames": [
      "Blush Peony",
      "Powder Blue",
      "Peach Blossom"
    ],
    "dimensions": "35 cm (W) x 28 cm (H) x 13 cm (D)",
    "material": "Silky smooth vegan nappa leather with polished pale gold hardware.",
    "inStock": true,
    "description": "Subtle pastel tones paired with butter-soft hand feel. Interior includes zippered security pocket and two quick-drop slots for sunglasses and phone."
  },
  {
    "id": "prod-15",
    "itemCode": "DGF-CL-15",
    "name": "Signature Metallic Hardcase Box Clutch",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "50 Pcs / Style",
    "leadTime": "16-20 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.29 PM (10).jpeg",
    "colors": [
      "#d4af37",
      "#c0c0c0",
      "#b76e79"
    ],
    "colorNames": [
      "Polished Gold",
      "Pure Silver",
      "Rose Bronze"
    ],
    "dimensions": "19 cm (W) x 11 cm (H) x 5.5 cm (D)",
    "material": "Electroplated high-shine metal casing with engraved textural diamond motif.",
    "inStock": true,
    "description": "A striking statement accessory that reflects ambient light magnificently. Opens 90 degrees with side fabric gussets to keep personal items safe."
  },
  {
    "id": "prod-16",
    "itemCode": "DGF-WL-16",
    "name": "Bohemian Tassel Zipper Wallet & Clutch",
    "category": "wallet",
    "categoryLabel": "Pouches & Wallets",
    "moq": "100 Pcs / Style",
    "leadTime": "12-15 Days Production",
    "sampling": "5 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.30 PM.jpeg",
    "colors": [
      "#833471",
      "#006266",
      "#1B1464"
    ],
    "colorNames": [
      "Mulberry",
      "Deep Teal",
      "Midnight Indigo"
    ],
    "dimensions": "20 cm (W) x 10.5 cm (H) x 2.5 cm (D)",
    "material": "Genuine grain vegan leather with braided tassel puller and 8 card slots.",
    "inStock": true,
    "description": "All-in-one wallet organizer featuring 8 card slots, dual currency compartments, center zippered coin pouch, and an exterior smartphone slip pocket."
  },
  {
    "id": "prod-17",
    "itemCode": "DGF-SL-17",
    "name": "Sunny Brunch Crossbody Satchel",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "60 Pcs / Style",
    "leadTime": "15-18 Days Production",
    "sampling": "6-8 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (2).jpeg",
    "colors": [
      "#f5cd79",
      "#f8a5c2",
      "#63cdda"
    ],
    "colorNames": [
      "Sunshine Yellow",
      "Coral Kiss",
      "Aqua Breeze"
    ],
    "dimensions": "25 cm (W) x 19 cm (H) x 8 cm (D)",
    "material": "Smooth structured leatherette with gold push-lock mechanism and top carrying handle.",
    "inStock": true,
    "description": "Playful, relaxed, and full of sunny elegance. Carry it by the ladylike top handle or attach the shoulder strap for carefree brunch and weekend strolling."
  },
  {
    "id": "prod-18",
    "itemCode": "DGF-HB-18",
    "name": "Luxe Gold Chain Day-to-Night Bag",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "18-22 Days Production",
    "sampling": "7-9 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (2).jpeg",
    "colors": [
      "#c69d57",
      "#171815",
      "#ffffff"
    ],
    "colorNames": [
      "Radiant Gold",
      "Jet Black",
      "Pure Ivory"
    ],
    "dimensions": "23 cm (W) x 15 cm (H) x 6 cm (D)",
    "material": "Fine zardozi beadwork with solid curb chain shoulder strap and magnetic lock.",
    "inStock": true,
    "description": "Transition effortlessly from daytime meetings to celebratory evenings. Handcrafted with precision glass cut beads that subtly sparkle with every step."
  },
  {
    "id": "prod-19",
    "itemCode": "DGF-CL-19",
    "name": "Luxe Pastelle Beaded Envelope Clutch",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "16-20 Days Production",
    "sampling": "7 Days Sampling",
    "image": "girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (1).jpeg",
    "colors": [
      "#e5b3c2",
      "#c69d57",
      "#1a1b18"
    ],
    "colorNames": [
      "Blush Rose",
      "Pale Champagne",
      "Onyx Noir"
    ],
    "dimensions": "24 cm (W) x 14 cm (H) x 5 cm (D)",
    "material": "Aari beadwork on premium dupion silk base with concealed magnetic lock.",
    "inStock": true,
    "description": "Sleek envelope profile hand-embroidered with micro glass beads and fine metallic threads. Designed for evening gala soirees and destination weddings."
  },
  {
    "id": "prod-20",
    "itemCode": "DGF-TT-20",
    "name": "Riviera Beach Vibes Handcrafted Canvas Tote",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "75 Pcs / Style",
    "leadTime": "14-18 Days Production",
    "sampling": "5-7 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.30 PM (3).jpeg",
    "colors": [
      "#3b6978",
      "#e97878",
      "#f1d1b5"
    ],
    "colorNames": [
      "Ocean Turquoise",
      "Coral Orange",
      "Natural Sand"
    ],
    "dimensions": "40 cm (W) x 32 cm (H) x 14 cm (D)",
    "material": "Heavy duty 16oz cotton canvas with woven rope handles and inner waterproof pocket.",
    "inStock": true,
    "description": "Vibrant beach-ready aesthetic featuring bold screen-printed typography, reinforced stress points, and generous interior room for resort essentials."
  },
  {
    "id": "prod-21",
    "itemCode": "DGF-SL-21",
    "name": "Bohemian Printed City Shoulder Bag",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "60 Pcs / Style",
    "leadTime": "15-18 Days Production",
    "sampling": "6 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.30 PM (4).jpeg",
    "colors": [
      "#2f3640",
      "#dcdde1",
      "#e1b12c"
    ],
    "colorNames": [
      "Monochrome Black",
      "Dove Grey",
      "Mustard Accent"
    ],
    "dimensions": "28 cm (W) x 20 cm (H) x 8 cm (D)",
    "material": "Printed cotton duck fabric with vegan leather trims and brass zip closures.",
    "inStock": true,
    "description": "Artistic everyday shoulder bag showcasing hand-screened heritage patterns. Features an ergonomic shoulder strap and dual quick-access exterior slip slots."
  },
  {
    "id": "prod-22",
    "itemCode": "DGF-TT-22",
    "name": "Blush Blossom Structured Carryall Handbag",
    "category": "tote",
    "categoryLabel": "Tote Bags",
    "moq": "50 Pcs / Style",
    "leadTime": "16-20 Days Production",
    "sampling": "7 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.30 PM (5).jpeg",
    "colors": [
      "#f8a5c2",
      "#f5cd79",
      "#63cdda"
    ],
    "colorNames": [
      "Blush Pink",
      "Soft Buttercream",
      "Sky Mist"
    ],
    "dimensions": "32 cm (W) x 24 cm (H) x 12 cm (D)",
    "material": "Structured textured PU leather with gold hardware and top rolled handles.",
    "inStock": true,
    "description": "Feminine structured silhouette offering polished elegance for executive lunches and afternoon tea. Includes detachable long crossbody strap."
  },
  {
    "id": "prod-23",
    "itemCode": "DGF-SL-23",
    "name": "Tribal Geometric Bohemian Sling Bag",
    "category": "shoulder",
    "categoryLabel": "Shoulder & Slings",
    "moq": "60 Pcs / Style",
    "leadTime": "14-18 Days Production",
    "sampling": "6 Days Sampling",
    "image": "img/WhatsApp Image 2026-08-12 at 1.39.30 PM (6).jpeg",
    "colors": [
      "#485460",
      "#d2dae2",
      "#ff5e57"
    ],
    "colorNames": [
      "Charcoal Aztec",
      "Chalk White",
      "Crimson Edge"
    ],
    "dimensions": "24 cm (W) x 18 cm (H) x 7 cm (D)",
    "material": "Handloom jacquard weave fabric with antique brass sliders and fringe tassel.",
    "inStock": true,
    "description": "Textured bohemian charm woven with traditional Pilkhuwa yarn-dyed loom techniques. Light, durable, and effortlessly complements denim and casual wear."
  },
  {
    "id": "prod-24",
    "itemCode": "DGF-CL-24",
    "name": "Litchi Ruby Hand-Beaded Fruit Minaudière",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "40 Pcs / Style",
    "leadTime": "20-25 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/lichi-remove.png",
    "colors": [
      "#b31e3d",
      "#2b4736",
      "#d4af37"
    ],
    "colorNames": [
      "Ruby Crimson",
      "Emerald Leaf",
      "Antique Gold Clasp"
    ],
    "dimensions": "19 cm (W) x 13 cm (H) x 6 cm (D)",
    "material": "Sculpted 3D novelty hardcase with thousands of hand-stitched seed beads & glass crystals.",
    "inStock": true,
    "description": "One of our iconic export pieces. Intricate 3D textured beadwork mimicking the organic peel of a ripe litchi fruit, set on a gold-plated oval hardcase."
  },
  {
    "id": "prod-25",
    "itemCode": "DGF-CL-25",
    "name": "Watermelon Slice Hand-Beaded Summer Clutch",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "40 Pcs / Style",
    "leadTime": "20-25 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/w-remove.png",
    "colors": [
      "#eb4d4b",
      "#6ab04c",
      "#130f40"
    ],
    "colorNames": [
      "Watermelon Pink",
      "Lime Rind Green",
      "Black Seed Beads"
    ],
    "dimensions": "22 cm (W) x 12 cm (H) x 5 cm (D)",
    "material": "Hand-strung faceted Japanese beads on semi-circular brass metal frame with chain.",
    "inStock": true,
    "description": "Playful haute couture summer statement bag. Rich ombre bead gradients depicting a fresh slice of watermelon with shimmering black faceted crystal seeds."
  },
  {
    "id": "prod-26",
    "itemCode": "DGF-CL-26",
    "name": "Golden Mango Artisanal Beaded Evening Minaudière",
    "category": "clutch",
    "categoryLabel": "Evening Clutches",
    "moq": "40 Pcs / Style",
    "leadTime": "20-25 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/mango-remove.png",
    "colors": [
      "#f9ca24",
      "#f0932b",
      "#22a6b3"
    ],
    "colorNames": [
      "Alphonso Gold",
      "Ripe Saffron",
      "Teal Leaf"
    ],
    "dimensions": "21 cm (W) x 13 cm (H) x 5.5 cm (D)",
    "material": "Hand-embossed metal hardcase encrusted with multi-faceted golden topaz bugle beads.",
    "inStock": true,
    "description": "A regal Indian motif celebrated worldwide. Sculpted in the graceful paisley mango silhouette with over 12 hours of meticulous hand-needle artisan work."
  },
  {
    "id": "prod-27",
    "itemCode": "DGF-HB-27",
    "name": "Crescent Arch Heritage Embellished Clutch",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "18-22 Days Production",
    "sampling": "7-9 Days Sampling",
    "image": "img/bg-remove-img.png",
    "colors": [
      "#c69d57",
      "#171815",
      "#e5b3c2"
    ],
    "colorNames": [
      "Champagne Shimmer",
      "Jet Black",
      "Rose Gold"
    ],
    "dimensions": "23 cm (W) x 15 cm (H) x 5 cm (D)",
    "material": "Scalloped arch metal frame with dense glass seed bead embroidery and magnetic lock.",
    "inStock": true,
    "description": "Architectural crescent frame inspired by historic Mughal pavilion arches. Features micro-sequin surface texture that shimmers with subtle movement."
  },
  {
    "id": "prod-28",
    "itemCode": "DGF-HB-28",
    "name": "Master Karigar Pearl & Zardozi Frame Bag",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "40 Pcs / Style",
    "leadTime": "22-26 Days Production",
    "sampling": "8-10 Days Sampling",
    "image": "img/img1.png",
    "colors": [
      "#d4af37",
      "#fdfbf7",
      "#2b4736"
    ],
    "colorNames": [
      "Imperial Gold",
      "Ivory Pearl",
      "Vintage Bronze"
    ],
    "dimensions": "25 cm (W) x 16 cm (H) x 6 cm (D)",
    "material": "Pure silk velvet with genuine zardozi bullion wire, glass pearls, and antique handle.",
    "inStock": true,
    "description": "The pinnacle of Pilkhuwa artisan heritage. Complex bullion wire zardozi work paired with graded pearl drops, crafted exclusively for high-end export collections."
  },
  {
    "id": "prod-29",
    "itemCode": "DGF-HB-29",
    "name": "Pilkhuwa Heritage Signature Statement Bag",
    "category": "beaded",
    "categoryLabel": "Handcrafted Beaded",
    "moq": "50 Pcs / Style",
    "leadTime": "18-22 Days Production",
    "sampling": "7-9 Days Sampling",
    "image": "img/54c38b87-b744-4a39-b369-03cc429abbc1.png",
    "colors": [
      "#1e201c",
      "#c69d57",
      "#8c7b64"
    ],
    "colorNames": [
      "Midnight Charcoal",
      "Antique Gold",
      "Smoky Bronze"
    ],
    "dimensions": "24 cm (W) x 17 cm (H) x 6.5 cm (D)",
    "material": "Heavy metallic dabka, cut-glass beads, and reinforced dupion silk base.",
    "inStock": true,
    "description": "Our flagship signature export piece honoring 40 years of precision hand-craftsmanship. Features a structured silhouette with detachable heavy gold curb link chain."
  }
];

const categoryTabs = [
  { id: 'all', label: 'All Catalog Pieces' },
  { id: 'beaded', label: 'Handcrafted Beaded' },
  { id: 'clutch', label: 'Evening Clutches' },
  { id: 'tote', label: 'Tote Bags' },
  { id: 'shoulder', label: 'Shoulder & Slings' },
  { id: 'wallet', label: 'Pouches & Wallets' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured Catalog Edit' },
  { id: 'name-az', label: 'Product Name: A to Z' },
  { id: 'name-za', label: 'Product Name: Z to A' },
  { id: 'moq-low', label: 'MOQ: Lowest First' },
  { id: 'newest', label: 'Newest Factory Additions' },
];

export default function ProductPage({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlistItems, setWishlistItems] = useState(() => getWishlist());
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e && e.detail) setWishlistItems(e.detail);
      else setWishlistItems(getWishlist());
    };
    window.addEventListener('dg_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('dg_wishlist_updated', handleUpdate);
  }, []);

  // Trigger Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // Lock body scroll and listen for Escape key when popup is open
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setQuickViewProduct(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [quickViewProduct]);

  // Toggle Shortlist / Wishlist for Inquiries
  const toggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    toggleWishlistItem({
      id: product.id,
      title: product.name,
      imgSrc: resolveImg(product.image),
      category: product.categoryLabel || product.category,
      itemCode: product.itemCode,
      moq: product.moq
    });
  };

  // WhatsApp B2B Inquiry (No retail price, asks for wholesale quotation & tech-pack)
  const handleWhatsAppInquiry = (product) => {
    const text = encodeURIComponent(
      `Hello D Galore Fashion! I am an international / domestic buyer interested in wholesale & export details for:

• Item Code: ${product.itemCode}
• Product Name: ${product.name}
• Category: ${product.categoryLabel}
• MOQ: ${product.moq}

Please share your export pricing quotation, sample availability, and custom colorway options.`
    );
    window.open(`https://wa.me/919999920003?text=${text}`, '_blank');
  };

  // Open Quick View Specs Modal
  const openQuickView = (product, e) => {
    if (e) e.stopPropagation();
    setQuickViewProduct(product);
    setSelectedColorIndex(0);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = allProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.itemCode.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colorNames.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sorting
    const sorted = [...list];
    switch (sortBy) {
      case 'name-az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'moq-low':
        sorted.sort((a, b) => parseInt(a.moq) - parseInt(b.moq));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.badge.includes('NEW') ? 1 : -1));
        break;
      default:
        // Featured
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Header activePage="product" navigate={navigate} />

      <main className="product-page">
        {/* ========================================================= */}
        {/* 1. CINEMATIC PRODUCT HERO BANNER (MATCHING ABOUT BANNER) */}
        {/* ========================================================= */}
        <section className="prod-top-hero">
          <div className="prod-container">
            <div className="prod-hero-content">
              <span className="prod-hero-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Handcrafted Luxury Catalog · Est. 1984
              </span>

              <h1 className="prod-hero-title">
                The Handbags &amp; <em>Accessories Collection</em>
              </h1>

              <h2 className="prod-hero-subtitle">
                Premier Indian Manufacturer &amp; Exporter of Handcrafted Fashion Accessories Since 1984
              </h2>

              <p className="prod-hero-desc">
                Explore our signature export collection of artisanal hand-beaded clutches, structured leather totes, and statement evening bags.
                Every piece is meticulously handcrafted in our Pilkhuwa (Delhi NCR) integrated manufacturing facility.
              </p>

              {/* Breadcrumbs */}
              <div className="prod-breadcrumb">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigate) navigate('/');
                    else window.location.href = '/';
                  }}
                >
                  Home
                </a>
                <span>/</span>
                <span className="prod-bc-active">Export Product Showcase</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. B2B EXPORTER CREDENTIALS RIBBON */}
        {/* ========================================================= */}
        <section className="prod-trust-bar">
          <div className="prod-container">
            <div className="prod-trust-grid">
              <div className="prod-trust-item">
                <span className="prod-trust-icon">✦</span>
                <div>
                  <strong>100% Handcrafted</strong>
                  <p>Pilkhuwa Master Karigar Craftsmanship</p>
                </div>
              </div>

              <div className="prod-trust-item">
                <span className="prod-trust-icon">✓</span>
                <div>
                  <strong>Certified Export Quality</strong>
                  <p>4-Tier Lab Inspected &amp; Compliant</p>
                </div>
              </div>

              <div className="prod-trust-item">
                <span className="prod-trust-icon">✈</span>
                <div>
                  <strong>Worldwide Export Shipping</strong>
                  <p>Door-to-Port Logistics in 15+ Countries</p>
                </div>
              </div>

              <div className="prod-trust-item">
                <span className="prod-trust-icon">★</span>
                <div>
                  <strong>Direct Manufacturer</strong>
                  <p>Factory-Direct Wholesale Quotations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. FILTER TABS & SEARCH BAR */}
        {/* ========================================================= */}
        <section className="prod-controls-section">
          <div className="prod-container">
            {/* Category Filter Pills */}
            <div className="prod-category-tabs" role="tablist">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === tab.id}
                  className={`prod-tab-btn ${selectedCategory === tab.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-bar: Search, Count & Sort */}
            <div className="prod-sub-bar">
              {/* Search Box */}
              <div className="prod-search-wrapper">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by code, design, or material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="prod-search-input"
                  aria-label="Search Catalog"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="prod-search-clear"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Count & Sorting Dropdown */}
              <div className="prod-sort-controls">
                <span className="prod-count-text">
                  Showing <strong>{filteredProducts.length}</strong> Export Designs
                </span>

                <div className="prod-sort-wrapper">
                  <label htmlFor="prod-sort-select">Sort By:</label>
                  <select
                    id="prod-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="prod-sort-select"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. MASTER PRODUCT GRID (PURE B2B SHOWCASE - NO PRICES) */}
        {/* ========================================================= */}
        <section className="prod-grid-section">
          <div className="prod-container">
            {filteredProducts.length === 0 ? (
              <div className="prod-empty-state">
                <div className="prod-empty-icon">🔍</div>
                <h3>No matching export pieces found</h3>
                <p>Try clearing your search query or choosing another category filter.</p>
                <button
                  type="button"
                  className="ab-btn-primary"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="prod-products-grid">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistItems.some(
                    (it) => it.id === product.id || it.title === product.name
                  );
                  return (
                    <article key={product.id} className="prod-card">
                      {/* Image Frame */}
                      <div className="prod-card-thumb" onClick={() => openQuickView(product)}>
                        <img
                          src={resolveImg(product.image)}
                          alt={product.name}
                          loading="lazy"
                          className="prod-card-img"
                        />

                        {/* Shortlist Dil (Heart) Button */}
                        <button
                          type="button"
                          className={`prod-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                          onClick={(e) => toggleWishlist(product, e)}
                          aria-label="Save to Inquiry Shortlist"
                          title="Save to Inquiry Shortlist"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#c69d57' : 'none'} stroke={isWishlisted ? '#c69d57' : '#171815'} strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>

                        {/* Hover Quick Action Pill */}
                        <div className="prod-hover-overlay">
                          <button
                            type="button"
                            className="prod-quick-view-btn"
                            onClick={(e) => openQuickView(product, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Specifications
                          </button>
                        </div>
                      </div>

                      {/* Card Content (NO PRICES) */}
                      <div className="prod-card-body">
                        <div className="prod-card-meta">
                          <span className="prod-card-category">{product.categoryLabel}</span>
                          <span className="prod-card-sku">{product.itemCode}</span>
                        </div>

                        <h3 className="prod-card-title" onClick={() => openQuickView(product)}>
                          {product.name}
                        </h3>

                        <p className="prod-card-desc-snippet">
                          {product.material.length > 72 ? product.material.substring(0, 72) + '...' : product.material}
                        </p>

                        {/* Action Buttons */}
                        <div className="prod-card-bottom">
                          <button
                            type="button"
                            className="prod-btn-specs"
                            onClick={() => openQuickView(product)}
                            title="View Technical Specifications"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Specs
                          </button>
                          <button
                            type="button"
                            className="prod-btn-whatsapp-inquire"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsAppInquiry(product);
                            }}
                            title="Inquire on WhatsApp"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg>
                            Inquire
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CUSTOM TECH-PACK SAMPLING & OEM B2B BANNER */}
        {/* ========================================================= */}
        <section className="prod-b2b-banner">
          <div className="prod-container">
            <div className="prod-b2b-box">
              <div className="prod-b2b-copy">
                <span className="ab-kicker">Custom OEM &amp; Private Label Services</span>
                <h3>Require Custom Tech-Packs, Prototyping or Bulk Quantities?</h3>
                <p>
                  As an integrated manufacturing export house in Pilkhuwa (Delhi NCR), we collaborate directly with international fashion labels,
                  retail buying houses, and private boutiques. We offer complete custom sample development, pantone dyeing, bespoke metal hardware, and rapid export logistics.
                </p>
              </div>
              <div className="prod-b2b-actions">
                <a
                  href="https://wa.me/919999920003?text=Hello%20D%20Galore%20Fashion!%20I%20would%20like%20to%20discuss%20custom%20sampling%20and%20bulk%20B2B%20manufacturing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Connect on WhatsApp
                </a>
                <a
                  href="mailto:rv8116677@gmail.com?subject=B2B%20Export%20Manufacturing%20Inquiry"
                  className="ab-btn-secondary"
                >
                  Request Factory Tech-Pack
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. TECHNICAL SPECIFICATIONS & INQUIRY MODAL (COMPACT NO-SCROLL) */}
        {/* ========================================================= */}
        {quickViewProduct && createPortal(
          <div className="prod-modal-overlay" onClick={() => setQuickViewProduct(null)}>
            <div className="prod-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="prod-modal-close"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close specifications modal"
              >
                ✕
              </button>

              <div className="prod-modal-grid">
                {/* Modal Left Column: Image & Quick Action */}
                <div className="prod-modal-left">
                  <div className="prod-modal-main-img">
                    <img
                      src={resolveImg(quickViewProduct.image)}
                      alt={quickViewProduct.name}
                    />
                  </div>

                  <button
                    type="button"
                    className="prod-btn-modal-whatsapp"
                    onClick={() => handleWhatsAppInquiry(quickViewProduct)}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Inquire on WhatsApp
                  </button>

                  {/* Save to Wishlist Button in Modal */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '11px 16px',
                      marginTop: '10px',
                      borderRadius: '8px',
                      border: '1px solid #c69d57',
                      background: wishlistItems.some(
                        (it) => it.id === quickViewProduct.id || it.title === quickViewProduct.name
                      )
                        ? '#c69d57'
                        : '#ffffff',
                      color: wishlistItems.some(
                        (it) => it.id === quickViewProduct.id || it.title === quickViewProduct.name
                      )
                        ? '#ffffff'
                        : '#171815',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={
                        wishlistItems.some(
                          (it) => it.id === quickViewProduct.id || it.title === quickViewProduct.name
                        )
                          ? '#ffffff'
                          : 'none'
                      }
                      stroke={
                        wishlistItems.some(
                          (it) => it.id === quickViewProduct.id || it.title === quickViewProduct.name
                        )
                          ? '#ffffff'
                          : '#c69d57'
                      }
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {wishlistItems.some(
                      (it) => it.id === quickViewProduct.id || it.title === quickViewProduct.name
                    )
                      ? 'Saved in Wishlist ✓'
                      : 'Save to Shortlist (♡)'}
                  </button>
                </div>

                {/* Modal Right Column: Technical Details & RFQ */}
                <div className="prod-modal-info">
                  <div className="prod-modal-header">
                    <span className="prod-modal-cat">{quickViewProduct.categoryLabel}</span>
                    <span className="prod-modal-sku">Item Code: <strong>{quickViewProduct.itemCode}</strong></span>
                  </div>

                  <h2 className="prod-modal-title">{quickViewProduct.name}</h2>

                  <p className="prod-modal-desc">{quickViewProduct.description}</p>

                  {/* 2-Column Technical Specifications Grid */}
                  <div className="prod-modal-specs-grid">
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">MOQ:</span>
                      <span className="prod-spec-val">{quickViewProduct.moq}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Lead Time:</span>
                      <span className="prod-spec-val">{quickViewProduct.leadTime}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Dimensions:</span>
                      <span className="prod-spec-val">{quickViewProduct.dimensions}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Sampling:</span>
                      <span className="prod-spec-val">{quickViewProduct.sampling}</span>
                    </div>
                    <div className="prod-spec-cell prod-spec-full">
                      <span className="prod-spec-lbl">Material &amp; Craft:</span>
                      <span className="prod-spec-val">{quickViewProduct.material}</span>
                    </div>
                    <div className="prod-spec-cell prod-spec-full">
                      <span className="prod-spec-lbl">Private Label:</span>
                      <span className="prod-spec-val prod-spec-green">✓ Custom metal badges, linings &amp; OEM branding supported</span>
                    </div>
                  </div>

                  {/* Color / Finish Swatches */}
                  <div className="prod-modal-colors">
                    <label>
                      Sample Swatches: <strong>{quickViewProduct.colorNames[selectedColorIndex]}</strong>
                    </label>
                    <div className="prod-color-options">
                      {quickViewProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`prod-color-btn ${selectedColorIndex === idx ? 'is-selected' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColorIndex(idx)}
                          title={quickViewProduct.colorNames[idx]}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Email RFQ Link */}
                  <a
                    href={`mailto:rv8116677@gmail.com?subject=${encodeURIComponent(`B2B Export Quotation Request: ${quickViewProduct.itemCode} - ${quickViewProduct.name}`)}&body=${encodeURIComponent(`Hello D Galore Fashion Team,\n\nI am interested in receiving an export quotation and technical sample for:\n\n• Item Code: ${quickViewProduct.itemCode}\n• Product Name: ${quickViewProduct.name}\n• Category: ${quickViewProduct.categoryLabel}\n• Desired Quantity:\n• Country/Destination Port:\n\nPlease share lead time and FOB/CIF rates.\n\nThank you!`)}`}
                    className="prod-btn-modal-email"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email RFQ / Request Full Tech Pack
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Floating Notification Toast */}
        {toastMessage && (
          <div className="prod-toast-pill" role="status">
            <span>{toastMessage}</span>
          </div>
        )}
      </main>

      <Footer navigate={navigate} showNewsletter={false} />
    </>
  );
}
