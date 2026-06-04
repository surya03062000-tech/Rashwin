/* Generate premium OG preview + Save-the-Date share card PNGs
   Run:  node scripts/generate-images.mjs
   Requires: sharp + (Great Vibes / Playfair / Cormorant fonts installed) */
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";

mkdirSync("assets", { recursive: true });

const GOLD = "#d8b454", GOLD_L = "#f0d98a", GOLD_D = "#a8821a";
const MAROON = "#7a1f2b", MAROON_D = "#46101a", IVORY = "#fff8ec";

/* shared decorative defs */
const defs = `
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="75%">
      <stop offset="0%"  stop-color="#8f2533"/>
      <stop offset="55%" stop-color="${MAROON}"/>
      <stop offset="100%" stop-color="${MAROON_D}"/>
    </radialGradient>
    <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GOLD_L}"/>
      <stop offset="50%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_D}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="50%">
      <stop offset="0%" stop-color="rgba(240,217,138,0.22)"/>
      <stop offset="100%" stop-color="rgba(240,217,138,0)"/>
    </radialGradient>
  </defs>`;

/* corner flourish (mandala-ish) */
function corner(x, y, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot})" fill="none" stroke="url(#goldgrad)" stroke-width="2" opacity="0.85">
    <path d="M0 60 Q0 0 60 0"/>
    <path d="M12 60 Q12 12 60 12" opacity="0.6"/>
    <path d="M0 30 Q30 30 30 0" opacity="0.5"/>
    <circle cx="0" cy="60" r="3" fill="url(#goldgrad)" stroke="none"/>
    <circle cx="60" cy="0" r="3" fill="url(#goldgrad)" stroke="none"/>
    <path d="M30 0 Q40 14 30 28 Q20 14 30 0 Z" fill="url(#goldgrad)" stroke="none" opacity="0.55"/>
    <path d="M0 30 Q14 40 28 30 Q14 20 0 30 Z" fill="url(#goldgrad)" stroke="none" opacity="0.55"/>
  </g>`;
}

/* floral sprig divider */
function sprig(cx, cy, w) {
  return `<g transform="translate(${cx},${cy})" stroke="url(#goldgrad)" fill="url(#goldgrad)">
    <line x1="${-w}" y1="0" x2="${w}" y2="0" stroke-width="1.4"/>
    <circle cx="0" cy="0" r="5" stroke="none"/>
    <circle cx="${-w}" cy="0" r="2.5" stroke="none"/>
    <circle cx="${w}"  cy="0" r="2.5" stroke="none"/>
    <path d="M-18 0 Q-9 -8 0 0 Q-9 8 -18 0 Z" stroke="none" opacity="0.85"/>
    <path d="M18 0 Q9 -8 0 0 Q9 8 18 0 Z"  stroke="none" opacity="0.85"/>
  </g>`;
}

/* ---------- 1) OG preview (1200 x 630) ---------- */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${defs}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <!-- double frame -->
  <rect x="26" y="26" width="1148" height="578" fill="none" stroke="url(#goldgrad)" stroke-width="2.5"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="url(#goldgrad)" stroke-width="1" opacity="0.55"/>
  ${corner(60,60,0)} ${corner(1140,60,90)} ${corner(1140,570,180)} ${corner(60,570,270)}
  <!-- cross emblem -->
  <g transform="translate(600,128)">
    <circle r="34" fill="none" stroke="url(#goldgrad)" stroke-width="1.5" opacity="0.7"/>
    <text x="0" y="16" text-anchor="middle" font-family="Playfair Display, serif" font-size="46" fill="url(#goldgrad)">✚</text>
  </g>
  <text x="600" y="208" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="30" letter-spacing="7" fill="${GOLD_L}">TOGETHER WITH OUR FAMILIES</text>
  <!-- names -->
  <text x="600" y="350" text-anchor="middle" font-family="Great Vibes, cursive" font-size="150" fill="url(#goldgrad)">Sajil</text>
  <text x="600" y="350" text-anchor="middle" font-family="Great Vibes, cursive" font-size="150" fill="url(#goldgrad)" opacity="0"></text>
  <text x="320" y="430" text-anchor="middle" font-family="Great Vibes, cursive" font-size="96" fill="${IVORY}">Sajil</text>
  <text x="600" y="438" text-anchor="middle" font-family="Playfair Display, serif" font-size="60" fill="#f1b8bf">❤</text>
  <text x="880" y="430" text-anchor="middle" font-family="Great Vibes, cursive" font-size="96" fill="${IVORY}">Jino</text>
  ${sprig(600,470,120)}
  <text x="600" y="528" text-anchor="middle" font-family="Playfair Display, serif" font-weight="600" font-size="40" letter-spacing="8" fill="${IVORY}">02 · 07 · 2026  ·  THURSDAY</text>
  <text x="600" y="568" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="26" letter-spacing="3" fill="${GOLD_L}">Holy Family Church · Nagercoil · 10:30 AM</text>
</svg>`;

/* fix: remove the empty/duplicate big name line above (kept layout clean) */
const ogSvgClean = ogSvg
  .replace(/<text x="600" y="350"[^>]*>Sajil<\/text>\s*/,"")
  .replace(/<text x="600" y="350"[^>]*opacity="0">[^<]*<\/text>\s*/,"");

await sharp(Buffer.from(ogSvgClean)).png().toFile("assets/og-image.png");
console.log("✓ assets/og-image.png  (1200×630)");

/* ---------- 2) Save-the-Date story card (1080 x 1350) — deep navy + champagne ---------- */
const navyDefs = `
  <defs>
    <radialGradient id="nbg" cx="50%" cy="38%" r="75%">
      <stop offset="0%"  stop-color="#1e3d7a"/>
      <stop offset="55%" stop-color="#102258"/>
      <stop offset="100%" stop-color="#070f2e"/>
    </radialGradient>
    <linearGradient id="ngold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GOLD_L}"/>
      <stop offset="50%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_D}"/>
    </linearGradient>
    <radialGradient id="nglow" cx="50%" cy="42%" r="50%">
      <stop offset="0%" stop-color="rgba(200,182,100,0.18)"/>
      <stop offset="100%" stop-color="rgba(200,182,100,0)"/>
    </radialGradient>
  </defs>`;

function navyCorner(x, y, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot})" fill="none" stroke="url(#ngold)" stroke-width="2" opacity="0.85">
    <path d="M0 60 Q0 0 60 0"/>
    <path d="M12 60 Q12 12 60 12" opacity="0.6"/>
    <circle cx="0" cy="60" r="3" fill="url(#ngold)" stroke="none"/>
    <circle cx="60" cy="0" r="3" fill="url(#ngold)" stroke="none"/>
    <path d="M30 0 Q40 14 30 28 Q20 14 30 0 Z" fill="url(#ngold)" stroke="none" opacity="0.55"/>
  </g>`;
}
function navySprig(cx, cy, w) {
  return `<g transform="translate(${cx},${cy})" stroke="url(#ngold)" fill="url(#ngold)">
    <line x1="${-w}" y1="0" x2="${w}" y2="0" stroke-width="1.4"/>
    <circle cx="0" cy="0" r="5" stroke="none"/>
    <circle cx="${-w}" cy="0" r="2.5" stroke="none"/>
    <circle cx="${w}" cy="0" r="2.5" stroke="none"/>
    <path d="M-18 0 Q-9 -8 0 0 Q-9 8 -18 0 Z" stroke="none" opacity="0.85"/>
    <path d="M18 0 Q9 -8 0 0 Q9 8 18 0 Z"  stroke="none" opacity="0.85"/>
  </g>`;
}

const cardSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  ${navyDefs}
  <rect width="1080" height="1350" fill="url(#nbg)"/>
  <rect width="1080" height="1350" fill="url(#nglow)"/>
  <rect x="34" y="34" width="1012" height="1282" fill="none" stroke="url(#ngold)" stroke-width="3"/>
  <rect x="52" y="52" width="976" height="1246" fill="none" stroke="url(#ngold)" stroke-width="1" opacity="0.5"/>
  ${navyCorner(80,80,0)} ${navyCorner(1000,80,90)} ${navyCorner(1000,1270,180)} ${navyCorner(80,1270,270)}

  <g transform="translate(540,210)">
    <circle r="48" fill="none" stroke="url(#ngold)" stroke-width="2" opacity="0.7"/>
    <circle r="38" fill="none" stroke="url(#ngold)" stroke-width="1" opacity="0.4"/>
    <text x="0" y="22" text-anchor="middle" font-family="Playfair Display, serif" font-size="64" fill="url(#ngold)">✚</text>
  </g>

  <text x="540" y="330" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="34" letter-spacing="10" fill="${GOLD_L}">SAVE THE DATE</text>
  ${navySprig(540,378,150)}

  <text x="540" y="470" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="30" letter-spacing="4" fill="${IVORY}" opacity="0.9">We are getting married</text>

  <text x="540" y="640" text-anchor="middle" font-family="Great Vibes, cursive" font-size="160" fill="${IVORY}">Sajil</text>
  <text x="540" y="740" text-anchor="middle" font-family="Playfair Display, serif" font-size="80" fill="#f1c0c8">❤</text>
  <text x="540" y="880" text-anchor="middle" font-family="Great Vibes, cursive" font-size="160" fill="${IVORY}">Jino</text>

  ${navySprig(540,960,170)}

  <text x="540" y="1070" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="74" letter-spacing="10" fill="url(#ngold)">02 · 07 · 2026</text>
  <text x="540" y="1130" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="36" letter-spacing="8" fill="${IVORY}">THURSDAY · 10:30 AM</text>

  <line x1="300" y1="1180" x2="780" y2="1180" stroke="url(#ngold)" stroke-width="1" opacity="0.5"/>
  <text x="540" y="1230" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="34" fill="${GOLD_L}">Holy Family Church</text>
  <text x="540" y="1272" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="27" letter-spacing="2" fill="${IVORY}" opacity="0.85">Carmel Nagar · Ramanputhur · Nagercoil</text>
</svg>`;

await sharp(Buffer.from(cardSvg)).png().toFile("assets/save-the-date.png");
console.log("✓ assets/save-the-date.png  (1080×1350)");

/* also export a JP-quality OG for platforms that prefer jpg */
await sharp(Buffer.from(ogSvgClean)).jpeg({ quality: 90 }).toFile("assets/og-image.jpg");
console.log("✓ assets/og-image.jpg");
