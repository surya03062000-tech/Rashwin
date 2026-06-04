/* =========================================================
   Sajil ❤️ Jino — Wedding Invitation · interactions  v2
   ========================================================= */
(function () {
  "use strict";

  /* ----- Config ----- */
  const WEDDING_DATE  = new Date("2026-07-02T10:30:00+05:30");
  const HOST_WHATSAPP = "919876543210";
  const SITE_URL      = window.location.href;
  const VENUE_QUERY   = "Holy Family Church Carmel Nagar Ramanputhur Nagercoil";

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* =========================================================
     LOADER  →  show for 1.4 s then reveal gate
     ========================================================= */
  window.addEventListener("load", () => {
    setTimeout(() => {
      $("#loader").classList.add("hide");
    }, 1400);
  });

  /* =========================================================
     GATE  —  cinematic double-door opening
     ========================================================= */
  const gate     = $("#gate");
  const gateCard = $("#gateCard");
  const openBtn  = $("#openInvite");

  /* Stagger-in the card text lines on load */
  const gateLines = [".gate-pre",".gate-names",".gate-verse",".gate-date",".gate-venue",".gate-btn"];
  gateLines.forEach((sel, i) => {
    const el = $(sel, gate);
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity .55s ease ${.55 + i * .12}s, transform .55s ease ${.55 + i * .12}s`;
    /* trigger reflow then animate in */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }));
  });

  openBtn.addEventListener("click", (e) => {
    /* 1. Burst golden sparkles from button center */
    const rect = openBtn.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    burstSparkles(cx, cy);

    /* 2. Slide doors apart */
    gate.classList.add("opening");

    /* 3. Try to play music on this user gesture */
    tryPlayMusic();

    /* 4. Hide gate after animation completes */
    setTimeout(() => {
      gate.classList.add("hide");
      setTimeout(() => { gate.style.display = "none"; }, 600);
    }, 1250);
  });

  /* ----- Golden sparkle burst ----- */
  function burstSparkles(cx, cy) {
    const colors  = ["#e6c66b","#c9a227","#f8e4a0","#ffffff","#e8b4b8","#fff3d0"];
    const shapes  = ["●","★","✦","✧","•","◆"];
    const count   = window.matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 38;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.style.cssText = `
        position:fixed; z-index:10000; pointer-events:none;
        left:${cx}px; top:${cy}px;
        font-size:${6 + Math.random() * 12}px;
        color:${colors[Math.floor(Math.random() * colors.length)]};
        user-select:none; will-change:transform,opacity;
      `;
      el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const dist  = 80  + Math.random() * 220;
      const dur   = 700 + Math.random() * 700;

      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      el.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)",    opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
        ],
        { duration: dur, easing: "cubic-bezier(0,.9,.57,1)", fill: "forwards" }
      ).onfinish = () => el.remove();
    }
  }

  /* =========================================================
     FLOATING PETALS
     ========================================================= */
  (function spawnPetals() {
    const wrap   = $("#petals");
    const glyphs = ["❀","✿","❁","🌸","❋","✾"];
    const colors = ["#e8b4b8","#c9a227","#c98a92","#e6c66b","#fff","#f3d2d5"];
    const count  = window.innerWidth < 600 ? 12 : 22;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = glyphs[i % glyphs.length];
      p.style.left  = Math.random() * 100 + "vw";
      p.style.fontSize = 12 + Math.random() * 16 + "px";
      p.style.color    = colors[Math.floor(Math.random() * colors.length)];
      const dur = 9 + Math.random() * 12;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay   = -Math.random() * dur + "s";
      wrap.appendChild(p);
    }
  })();

  /* =========================================================
     NAVIGATION
     ========================================================= */
  const nav      = $("#nav");
  const burger   = $("#navBurger");
  const navClose = $("#navClose");
  const menu     = $("#navMenu");
  const overlay  = $("#navOverlay");

  function openMenu() {
    menu.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => menu.classList.contains("open") ? closeMenu() : openMenu());
  if (navClose)  navClose.addEventListener("click", closeMenu);
  if (overlay)   overlay.addEventListener("click", closeMenu);

  $$("#navMenu a").forEach(a => a.addEventListener("click", closeMenu));

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  /* Close menu on Escape */
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* =========================================================
     LIVE COUNTDOWN
     ========================================================= */
  const cd = {
    d: $("#cd-days"),
    h: $("#cd-hours"),
    m: $("#cd-mins"),
    s: $("#cd-secs"),
  };
  const pad = n => String(n).padStart(2, "0");

  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      $("#countdown").innerHTML =
        '<p style="font-family:Great Vibes,cursive;font-size:clamp(1.4rem,5vw,2rem);color:#fff;text-align:center">We are married! 🎉 God bless us!</p>';
      clearInterval(timer);
      return;
    }
    const DAY = 86400000, HR = 3600000, MIN = 60000;
    cd.d.textContent = pad(Math.floor(diff / DAY));
    cd.h.textContent = pad(Math.floor((diff % DAY)  / HR));
    cd.m.textContent = pad(Math.floor((diff % HR)   / MIN));
    cd.s.textContent = pad(Math.floor((diff % MIN)  / 1000));
  }
  tick();
  const timer = setInterval(tick, 1000);

  /* =========================================================
     REVEAL  on scroll (Intersection Observer)
     ========================================================= */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach(el => io.observe(el));

  /* =========================================================
     BACKGROUND MUSIC
     ========================================================= */
  const audio    = $("#bgMusic");
  const musicBtn = $("#musicToggle");
  let musicOn    = false;

  function tryPlayMusic() {
    if (musicOn) return;
    audio.volume = 0.45;
    audio.play()
      .then(() => {
        musicOn = true;
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause music");
        musicBtn.setAttribute("aria-label", "Pause background music");
      })
      .catch(() => { /* no file / autoplay blocked */ });
  }

  musicBtn.addEventListener("click", () => {
    if (musicOn) {
      audio.pause();
      musicOn = false;
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("title", "Play music");
      musicBtn.setAttribute("aria-label", "Play background music");
    } else {
      tryPlayMusic();
    }
  });

  /* =========================================================
     VENUE — directions button
     ========================================================= */
  const dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(VENUE_QUERY);
  const dirBtn = $("#directionsBtn");
  if (dirBtn) dirBtn.href = dirUrl;

  /* =========================================================
     WHATSAPP SHARE
     ========================================================= */
  function buildShareUrl() {
    const text = "You're invited to Sajil ❤️ Jino's wedding on 02 July 2026 at Holy Family Church, Nagercoil! View the invitation: ";
    return "https://wa.me/?text=" + encodeURIComponent(text + SITE_URL);
  }
  const shareLink   = $("#shareWhatsApp");
  const footerShare = $("#footerShare");
  if (shareLink)   shareLink.href   = buildShareUrl();
  if (footerShare) footerShare.href = buildShareUrl();

  /* =========================================================
     GALLERY + LIGHTBOX
     ========================================================= */
  const photoIds = [
    "1519741497674-611481863552",
    "1606800052052-a08af7148866",
    "1583939003579-730e3918a45a",
    "1511285560929-80b456fea0bc",
    "1465495976277-4387d4b0b4c6",
    "1522673607200-164d1b6ce486",
    "1537633552985-df8429e8048b",
    "1530653333484-8e3c6c1c3a1f",
  ];

  const imgUrls = photoIds.map(
    id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`
  );

  const grid = $("#galleryGrid");
  imgUrls.forEach((url, i) => {
    const fig = document.createElement("figure");
    fig.className = "reveal";
    const img = document.createElement("img");
    img.src     = url;
    img.alt     = `Wedding gallery photo ${i + 1}`;
    img.loading = "lazy";
    img.decoding = "async";
    fig.appendChild(img);
    fig.addEventListener("click", () => openLightbox(i));
    /* keyboard accessible */
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", `View wedding photo ${i + 1}`);
    fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } });
    grid.appendChild(fig);
  });

  /* re-observe new gallery figures */
  $$(".gallery-grid figure.reveal").forEach(el => io.observe(el));

  const lb    = $("#lightbox");
  const lbImg = $("#lbImg");
  let lbIdx   = 0;

  function openLightbox(i) {
    lbIdx = i;
    lbImg.src = imgUrls[i];
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    lbImg.focus();
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
  }
  function step(dir) {
    lbIdx = (lbIdx + dir + imgUrls.length) % imgUrls.length;
    /* brief fade transition */
    lbImg.style.opacity = "0";
    setTimeout(() => { lbImg.src = imgUrls[lbIdx]; lbImg.style.opacity = "1"; }, 160);
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbNext").addEventListener("click",  () => step(1));
  $("#lbPrev").addEventListener("click",  () => step(-1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });

  /* touch swipe for lightbox */
  let touchSX = 0;
  lb.addEventListener("touchstart", e => { touchSX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend",   e => {
    const dx = e.changedTouches[0].clientX - touchSX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape")      closeLightbox();
    if (e.key === "ArrowRight")  step(1);
    if (e.key === "ArrowLeft")   step(-1);
  });

  /* smooth lightbox image transition */
  lbImg.style.transition = "opacity .16s ease";

  /* =========================================================
     RSVP  —  send via WhatsApp
     ========================================================= */
  $("#rsvpForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    const msg =
      `*Wedding RSVP — Sajil ❤️ Jino*%0A` +
      `Name: ${encodeURIComponent(f.guestName.value)}%0A` +
      `Phone: ${encodeURIComponent(f.guestPhone.value)}%0A` +
      `Guests: ${f.guestCount.value}%0A` +
      `Attendance: ${encodeURIComponent(f.attendance.value)}%0A` +
      `Notes: ${encodeURIComponent(f.notes.value || "—")}`;
    window.open(`https://wa.me/${HOST_WHATSAPP}?text=${msg}`, "_blank", "noopener");
    f.reset();
  });

  /* =========================================================
     WEDDING WISHES  (localStorage)
     ========================================================= */
  const wishForm = $("#wishForm");
  const wishList = $("#wishList");
  const KEY      = "sajiljino_wishes_v2";

  function escHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function renderWishes(wishes) {
    wishList.innerHTML = "";
    wishes.slice().reverse().forEach(w => {
      const el = document.createElement("div");
      el.className = "wish";
      el.innerHTML =
        `<div class="wish-head">` +
        `<div class="wish-avatar">${escHtml((w.name[0] || "?").toUpperCase())}</div>` +
        `<span class="wish-name">${escHtml(w.name)}</span>` +
        `</div>` +
        `<p class="wish-msg">${escHtml(w.msg)}</p>`;
      wishList.appendChild(el);
    });
  }

  function loadWishes() {
    let wishes = [];
    try { wishes = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
    if (!wishes.length) {
      wishes = [
        { name: "Aunty Mary",   msg: "Wishing you a lifetime of love and God's abundant blessings! 🙏" },
        { name: "Rahul",        msg: "So happy for you both. Congratulations on your big day! ❤️" },
        { name: "Priya Thomas", msg: "May God shower you with joy, peace and endless love. God bless! ✝️" },
      ];
    }
    renderWishes(wishes);
  }

  wishForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#wishName").value.trim();
    const msg  = $("#wishMsg").value.trim();
    if (!name || !msg) return;
    let wishes = [];
    try { wishes = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
    wishes.push({ name, msg });
    localStorage.setItem(KEY, JSON.stringify(wishes));
    renderWishes(wishes);
    wishForm.reset();
    /* scroll to first wish */
    wishList.firstElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  loadWishes();

})();
