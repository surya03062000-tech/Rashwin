/* =========================================================
   Sajil ❤️ Jino — Wedding Invitation · interactions
   ========================================================= */
(function () {
  "use strict";

  /* ----- Config (edit these) ----- */
  const WEDDING_DATE = new Date("2026-07-02T10:30:00+05:30"); // Holy Matrimony
  const HOST_WHATSAPP = "919876543210";      // host number for RSVP (no + sign)
  const SITE_URL = window.location.href;
  const VENUE_QUERY = "Holy Family Church Carmel Nagar Ramanputhur Nagercoil";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ========== Loader + Gate ========== */
  window.addEventListener("load", () => {
    setTimeout(() => $("#loader").classList.add("hide"), 1400);
  });

  const gate = $("#gate");
  $("#openInvite").addEventListener("click", () => {
    gate.classList.add("hide");
    // attempt to start music on this user gesture
    tryPlayMusic();
    setTimeout(() => (gate.style.display = "none"), 900);
  });

  /* ========== Floating Petals ========== */
  (function petals() {
    const wrap = $("#petals");
    const glyphs = ["❀", "✿", "❁", "🌸", "❋", "✾"];
    const count = window.innerWidth < 600 ? 12 : 22;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      p.style.left = Math.random() * 100 + "vw";
      p.style.fontSize = 12 + Math.random() * 18 + "px";
      const dur = 9 + Math.random() * 12;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = -Math.random() * dur + "s";
      const hues = ["#e8b4b8", "#c9a227", "#c98a92", "#e6c66b", "#fff"];
      p.style.color = hues[Math.floor(Math.random() * hues.length)];
      wrap.appendChild(p);
    }
  })();

  /* ========== Navigation ========== */
  const nav = $("#nav");
  const burger = $("#navBurger");
  const menu = $("#navMenu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$("#navMenu a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    })
  );

  /* ========== Countdown ========== */
  const cd = {
    d: $("#cd-days"),
    h: $("#cd-hours"),
    m: $("#cd-mins"),
    s: $("#cd-secs"),
  };
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      cd.d.textContent = cd.h.textContent = cd.m.textContent = cd.s.textContent = "00";
      $("#countdown").innerHTML =
        '<p style="font-family:Great Vibes,cursive;font-size:2rem;color:#fff">We are married! 🎉</p>';
      clearInterval(timer);
      return;
    }
    const day = 86400000, hr = 3600000, min = 60000;
    cd.d.textContent = pad(Math.floor(diff / day));
    cd.h.textContent = pad(Math.floor((diff % day) / hr));
    cd.m.textContent = pad(Math.floor((diff % hr) / min));
    cd.s.textContent = pad(Math.floor((diff % min) / 1000));
  }
  tick();
  const timer = setInterval(tick, 1000);

  /* ========== Reveal on scroll ========== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ========== Background Music ========== */
  const audio = $("#bgMusic");
  const musicBtn = $("#musicToggle");
  let musicOn = false;

  function tryPlayMusic() {
    if (musicOn) return;
    audio.volume = 0.5;
    audio.play().then(() => {
      musicOn = true;
      musicBtn.classList.add("playing");
      musicBtn.title = "Pause music";
    }).catch(() => {
      /* no audio file present or autoplay blocked — ignore */
    });
  }
  musicBtn.addEventListener("click", () => {
    if (musicOn) {
      audio.pause();
      musicOn = false;
      musicBtn.classList.remove("playing");
      musicBtn.title = "Play music";
    } else {
      tryPlayMusic();
    }
  });

  /* ========== Venue directions + Maps ========== */
  const dirUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(VENUE_QUERY);
  $("#directionsBtn").href = dirUrl;

  /* ========== WhatsApp share ========== */
  const shareText =
    "You're invited to Sajil ❤️ Jino's wedding on 02 July 2026 at Holy Family Church, Nagercoil! View the invitation: ";
  const waShare =
    "https://wa.me/?text=" + encodeURIComponent(shareText + SITE_URL);
  $("#shareWhatsApp").href = waShare;
  if ($("#footerShare")) $("#footerShare").href = waShare;

  /* ========== Gallery + Lightbox ========== */
  const photos = [
    "1519741497674-611481863552",
    "1606800052052-a08af7148866",
    "1583939003579-730e3918a45a",
    "1511285560929-80b456fea0bc",
    "1465495976277-4387d4b0b4c6",
    "1522673607200-164d1b6ce486",
    "1537633552985-df8429e8048b",
    "1530653333484-8e3c6c1c3a1f",
  ];
  const grid = $("#galleryGrid");
  const imgUrls = photos.map(
    (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`
  );
  imgUrls.forEach((url, i) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Wedding gallery photo " + (i + 1);
    img.loading = "lazy";
    fig.appendChild(img);
    fig.addEventListener("click", () => openLightbox(i));
    grid.appendChild(fig);
  });

  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    lbImg.src = imgUrls[i];
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
  }
  function step(dir) {
    lbIndex = (lbIndex + dir + imgUrls.length) % imgUrls.length;
    lbImg.src = imgUrls[lbIndex];
  }
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbNext").addEventListener("click", () => step(1));
  $("#lbPrev").addEventListener("click", () => step(-1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* ========== RSVP -> WhatsApp ========== */
  $("#rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const msg =
      `*Wedding RSVP — Sajil ❤️ Jino*%0A` +
      `Name: ${f.guestName.value}%0A` +
      `Phone: ${f.guestPhone.value}%0A` +
      `Guests: ${f.guestCount.value}%0A` +
      `Attendance: ${f.attendance.value}%0A` +
      `Notes: ${f.notes.value || "—"}`;
    window.open(`https://wa.me/${HOST_WHATSAPP}?text=${msg}`, "_blank");
    f.reset();
  });

  /* ========== Wedding Wishes (localStorage) ========== */
  const wishForm = $("#wishForm");
  const wishList = $("#wishList");
  const KEY = "sajiljino_wishes";

  function loadWishes() {
    let wishes = [];
    try {
      wishes = JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (_) {}
    if (!wishes.length) {
      wishes = [
        { name: "Aunty Mary", msg: "Wishing you a lifetime of love and God's abundant blessings! 🙏" },
        { name: "Rahul", msg: "So happy for you both. Congratulations on your big day! ❤️" },
      ];
    }
    render(wishes);
  }
  function render(wishes) {
    wishList.innerHTML = "";
    wishes.slice().reverse().forEach((w) => {
      const el = document.createElement("div");
      el.className = "wish";
      el.innerHTML =
        `<div class="wish-head"><div class="wish-avatar">${(w.name[0] || "?").toUpperCase()}</div>` +
        `<span class="wish-name">${escapeHtml(w.name)}</span></div>` +
        `<p class="wish-msg">${escapeHtml(w.msg)}</p>`;
      wishList.appendChild(el);
    });
  }
  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }
  wishForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#wishName").value.trim();
    const msg = $("#wishMsg").value.trim();
    if (!name || !msg) return;
    let wishes = [];
    try {
      wishes = JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (_) {}
    wishes.push({ name, msg });
    localStorage.setItem(KEY, JSON.stringify(wishes));
    render(wishes);
    wishForm.reset();
  });
  loadWishes();
})();
