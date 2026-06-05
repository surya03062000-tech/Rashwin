# Sajil ❤️ Jino — Engagement Invitation Website

A premium, mobile-first digital invitation for the Christian engagement of
**Sajil & Jino**, celebrating their Engagement Ceremony on **Wednesday, 01 July 2026**
at **St. Antony's Community Hall, Kurusady, Nagercoil**.

Fast, SEO-friendly static site (HTML · CSS · vanilla JS) — no build step — ready
to deploy to **Vercel**.

## ✨ Features

- **Cinematic 3D entrance** — loader → invitation card with a wax seal → twin
  doors swing open in 3D with radiant light-rays and a golden sparkle burst
- **Bilingual** — elegant Tamil (Noto Serif Tamil) alongside English throughout
- **Live countdown** to the ceremony (01 Jul 2026, 10:30 AM IST) in a luxury Cinzel face
- **Background music** — an elegant Tamil/Indian *Mangala Vadyam* (Mohanam raga)
  instrumental synthesised via the Web Audio API (no file needed) with play/pause,
  volume slider, mute and smooth fade-in/out; drop in `assets/music.mp3` to use your own track
- **Save the Date** section — premium gold/cream/white card, downloadable + WhatsApp share
- **Add to Calendar** — one tap adds the ceremony to Google Calendar
- **Floating flower petals + bright-red floating hearts**, floating nav, WhatsApp share
- **Private Wedding Wishes** — guest messages are emailed to the couple (FormSubmit,
  with a `mailto:` fallback); not shown publicly
- Sections: Welcome · Save the Date · The Celebration · Family ·
  Venue (Google Maps + directions + QR) · Travel & Queries · Wedding Wishes · Footer
- Royal gold / ivory / maroon / blush palette, glassmorphism, floral dividers,
  scroll reveals, mandala motifs
- **Fully responsive** — phones, tablets, iPad, laptop, desktop; iOS safe-area
  insets, 44px touch targets, landscape + reduced-motion support
- Rich **Open Graph** preview image for beautiful WhatsApp link cards

## 🛠 Customising

Editable details live at the top of `script.js`:

```js
const WEDDING_DATE = new Date("2026-07-02T10:30:00+05:30");
const VENUE_QUERY  = "Holy Family Church Carmel Nagar Ramanputhur Nagercoil";
```

- Names, dates, events, family, Tamil text → edit `index.html`.
- Photos & music → see `assets/README.md`.
- Footer phone / email / social links → edit `index.html`.

### Regenerating the share images (optional)

`assets/og-image.png` and `assets/save-the-date.png` are pre-generated and
committed. To re-create them after a text change:

```bash
npm install sharp
node scripts/generate-images.mjs
```

## 🚀 Deploy to Vercel

Zero-config static site.

1. Push to GitHub → [vercel.com/new](https://vercel.com/new) → import the repo.
2. Framework Preset: **Other** · leave build & output empty.
3. **Deploy.** `vercel.json` adds clean URLs + caching/security headers.

## 📂 Structure

```
.
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── scripts/generate-images.mjs   # regenerates the share cards (dev only)
└── assets/
    ├── favicon.svg
    ├── og-image.png / .jpg        # WhatsApp/social link preview
    ├── save-the-date.png          # downloadable share card
    └── music.mp3                  # (optional — synth plays if absent)
```

Made with ❤️ for Sajil & Jino · #SajilWedsJino
