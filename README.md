# Sajil ❤️ Jino — Wedding Invitation Website

A premium, mobile-first digital wedding invitation for the Christian wedding of
**Sajil & Jino**, celebrating their Holy Matrimony on **Thursday, 02 July 2026**
at **Holy Family Church, Carmel Nagar, Ramanputhur, Nagercoil**.

Built as a fast, SEO-friendly static site (HTML · CSS · vanilla JS) — no build
step required — and ready to deploy to **Vercel**.

## ✨ Features

- **Cinematic entrance** — animated loader + "Open Invitation" gate
- **Hero** with *Sajil ❤️ Jino*, the wedding date and a Bible verse
- **Live countdown timer** to the ceremony (02 Jul 2026, 10:30 AM IST)
- **Floating flower-petal** animation across the page
- **Background music toggle** (add `assets/music.mp3`)
- **Floating navigation** + **WhatsApp share** button
- Sections: Welcome · Our Story (timeline) · Wedding Events · Family ·
  Venue (Google Maps + directions) · Gallery (lightbox) · RSVP (→ WhatsApp) ·
  Travel & Accommodation · Wedding Wishes · Footer
- **RSVP form** sends responses to the host via WhatsApp (no backend)
- **Wedding Wishes** wall saved in the browser (localStorage)
- Glassmorphism, smooth scroll reveals, royal gold / ivory / maroon / blush palette
- Fully responsive, reduced-motion friendly

## 🛠 Customising

All the editable details live at the top of `script.js`:

```js
const WEDDING_DATE  = new Date("2026-07-02T10:30:00+05:30");
const HOST_WHATSAPP = "919876543210";  // number that receives RSVPs
const VENUE_QUERY   = "Holy Family Church Carmel Nagar Ramanputhur Nagercoil";
```

- Names, dates, events, family and travel details → edit `index.html`.
- Photos & music → see `assets/README.md`.
- Replace the placeholder phone numbers / emails / social links in the footer.

## 🚀 Deploy to Vercel

This is a zero-config static site.

**Option A — Dashboard**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository.
3. Framework Preset: **Other** · leave build & output settings empty.
4. Click **Deploy** — done.

**Option B — CLI**
```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Vercel serves `index.html` automatically; `vercel.json` adds clean URLs and
sensible caching/security headers.

## 📂 Structure

```
.
├── index.html      # all sections / content
├── styles.css      # theme, layout, animations, responsive
├── script.js       # countdown, petals, gallery, RSVP, wishes, music
├── vercel.json     # static hosting config
└── assets/
    ├── favicon.svg
    ├── music.mp3   # (add your own)
    └── README.md
```

Made with ❤️ for Sajil & Jino · #SajilWedsJino
