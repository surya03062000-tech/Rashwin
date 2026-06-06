# Sajil ❤️ Gino — Wedding Invitation Website

A premium, mobile-first digital invitation for the Christian wedding of
**Sajil & Gino** — Engagement on **01 July 2026** (St. Antony's Community Hall,
Kurusady) and the **Holy Matrimony** on **Thursday, 02 July 2026** at
**Holy Family Church, Carmel Nagar, Ramanputhur, Nagercoil**.

Fast, SEO-friendly static site (HTML · CSS · vanilla JS) — no build step — ready
to deploy to **Vercel**.

## ✨ Features

- **Light-themed entrance** — loader → invitation card with a wax seal →
  golden sparkle burst on "Open Invitation"
- **~15s cinematic journey** when the invitation is opened: from space → spinning
  Earth → a map pin at Ramanputhur, Nagercoil → the church with doors opening →
  the couple revealed → the wedding date & time (Skip button included)
- **Bilingual** — elegant Tamil (Noto Serif Tamil) alongside English throughout
- **Live countdown** to the Holy Matrimony (02 Jul 2026, 10:30 AM IST) in a luxury Cinzel face
- **Background music** — plays `assets/music.mp3` (drop in your *Hosanna —
  Vinnaithaandi Varuvaaya* track); a gentle synth plays until the file is added.
  Play/pause + mute + smooth fade-in/out.
- **Confetti / flower-shower** when the events card appears and a full
  celebration once the countdown reaches the big day
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

- **Hero photo** → drop your image at **`assets/hero.jpg`** (used as the hero backdrop).
- **Couple photo** → drop the engagement portrait at **`assets/couple.jpg`** — it
  is revealed walking out of the church in the cinematic intro. Until added, the
  hero image stands in.
- **Music** → save your audio as **`assets/music.mp3`** (e.g. *Hosanna*). Please
  use a track you have the rights to; copyrighted songs are not bundled here.
- Names, dates, events, family, Tamil text → edit `index.html`.
- **Wishes email** → works out-of-the-box via FormSubmit (the owner confirms a
  one-time activation email). For EmailJS instead, fill `EMAILJS` keys in `script.js`.
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

Made with ❤️ for Sajil & Gino · #SajilWedsGino
