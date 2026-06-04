/* =========================================================
   Sajil ❤️ Jino — Wedding Invitation · interactions  v3
   3D gate · synth Christian music · add-to-calendar ·
   save-the-date share · Tamil · gallery · wishes
   ========================================================= */
(function () {
  "use strict";

  /* ----- Config ----- */
  const WEDDING_DATE  = new Date("2026-07-02T10:30:00+05:30");
  const SITE_URL      = window.location.href;
  const VENUE_QUERY   = "Holy Family Church Carmel Nagar Ramanputhur Nagercoil";
  const VENUE_FULL    = "Holy Family Church, Carmel Nagar, Ramanputhur, Nagercoil, Tamil Nadu";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* =========================================================
     LOADER
     ========================================================= */
  window.addEventListener("load", () => {
    setTimeout(() => $("#loader").classList.add("hide"), 1400);
  });

  /* =========================================================
     GATE — 3D doors + sparkle burst
     ========================================================= */
  const gate    = $("#gate");
  const openBtn = $("#openInvite");

  /* stagger-in the card lines */
  [".gate-seal",".gate-pre",".gate-pre2",".gate-names",".gate-verse",".gate-date",".gate-venue",".gate-btn"]
    .forEach((sel, i) => {
      const el = $(sel, gate);
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity .55s ease ${.5 + i * .1}s, transform .55s ease ${.5 + i * .1}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
      }));
    });

  openBtn.addEventListener("click", () => {
    const r = openBtn.getBoundingClientRect();
    burstSparkles(r.left + r.width / 2, r.top + r.height / 2);
    gate.classList.add("opening");
    Music.start();                 // begin music on user gesture
    setTimeout(() => {
      gate.classList.add("hide");
      setTimeout(() => { gate.style.display = "none"; }, 600);
    }, 1350);
  });

  function burstSparkles(cx, cy) {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const colors = ["#e6c66b","#c9a227","#f8e4a0","#ffffff","#e8b4b8","#fff3d0"];
    const shapes = ["●","★","✦","✧","•","◆","❀"];
    for (let i = 0; i < 44; i++) {
      const el = document.createElement("span");
      el.style.cssText =
        `position:fixed;z-index:10000;pointer-events:none;left:${cx}px;top:${cy}px;` +
        `font-size:${6 + Math.random() * 13}px;color:${colors[(Math.random()*colors.length)|0]};` +
        `user-select:none;will-change:transform,opacity;`;
      el.textContent = shapes[(Math.random() * shapes.length) | 0];
      document.body.appendChild(el);
      const a = Math.random() * Math.PI * 2;
      const d = 90 + Math.random() * 240;
      el.animate(
        [{ transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 },
         { transform: `translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px)) scale(0) rotate(${(Math.random()*540-270)|0}deg)`, opacity: 0 }],
        { duration: 750 + Math.random() * 750, easing: "cubic-bezier(0,.9,.57,1)", fill: "forwards" }
      ).onfinish = () => el.remove();
    }
  }

  /* =========================================================
     FLOATING PETALS
     ========================================================= */
  (function () {
    const wrap   = $("#petals");
    const glyphs = ["❀","✿","❁","🌸","❋","✾"];
    const colors = ["#e8b4b8","#c9a227","#c98a92","#e6c66b","#fff","#f3d2d5"];
    const count  = window.innerWidth < 600 ? 12 : 22;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = glyphs[i % glyphs.length];
      p.style.left = Math.random() * 100 + "vw";
      p.style.fontSize = 12 + Math.random() * 16 + "px";
      p.style.color = colors[(Math.random() * colors.length) | 0];
      const dur = 9 + Math.random() * 12;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = -Math.random() * dur + "s";
      wrap.appendChild(p);
    }
  })();

  /* =========================================================
     NAVIGATION
     ========================================================= */
  const nav = $("#nav"), burger = $("#navBurger"), navClose = $("#navClose"),
        menu = $("#navMenu"), overlay = $("#navOverlay");
  function openMenu(){menu.classList.add("open");burger.classList.add("open");burger.setAttribute("aria-expanded","true");overlay.classList.add("show");document.body.style.overflow="hidden";}
  function closeMenu(){menu.classList.remove("open");burger.classList.remove("open");burger.setAttribute("aria-expanded","false");overlay.classList.remove("show");document.body.style.overflow="";}
  burger.addEventListener("click", () => menu.classList.contains("open") ? closeMenu() : openMenu());
  navClose && navClose.addEventListener("click", closeMenu);
  overlay && overlay.addEventListener("click", closeMenu);
  $$("#navMenu a").forEach(a => a.addEventListener("click", closeMenu));
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 60), { passive:true });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* =========================================================
     COUNTDOWN
     ========================================================= */
  const cd = { d:$("#cd-days"), h:$("#cd-hours"), m:$("#cd-mins"), s:$("#cd-secs") };
  const pad = n => String(n).padStart(2,"0");
  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      $("#countdown").innerHTML =
        '<p style="font-family:Great Vibes,cursive;font-size:clamp(1.4rem,5vw,2rem);color:#fff;text-align:center">We are married! 🎉 God bless us!</p>';
      clearInterval(timer); return;
    }
    const DAY=864e5, HR=36e5, MIN=6e4;
    cd.d.textContent = pad(Math.floor(diff/DAY));
    cd.h.textContent = pad(Math.floor((diff%DAY)/HR));
    cd.m.textContent = pad(Math.floor((diff%HR)/MIN));
    cd.s.textContent = pad(Math.floor((diff%MIN)/1000));
  }
  tick(); const timer = setInterval(tick, 1000);

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),
    { threshold:0.1, rootMargin:"0px 0px -40px 0px" }
  );
  $$(".reveal").forEach(el => io.observe(el));

  /* =========================================================
     BACKGROUND MUSIC  —  gentle "Canon in D" synth
     (falls back to assets/music.mp3 if you add the file)
     ========================================================= */
  const Music = (function () {
    const audioEl = $("#bgMusic");
    const btn = $("#musicToggle");
    let ctx, master, delay, lp, playing = false, usingFile = false,
        schedTimer = null, step = 0, nextTime = 0;

    /* progression — Pachelbel Canon in D (public domain) */
    const STEP = 0.42;                     // eighth-note length (s)
    const arps = [
      ["F#4","A4","D5","A4"], // D
      ["E4","A4","C#5","A4"], // A
      ["D4","F#4","B4","F#4"],// Bm
      ["C#4","F#4","A4","F#4"],//F#m
      ["D4","G4","B4","G4"],  // G
      ["F#4","A4","D5","A4"], // D
      ["D4","G4","B4","G4"],  // G
      ["E4","A4","C#5","A4"], // A
    ];
    const bass = ["D2","A2","B2","F#2","G2","D2","G2","A2"];

    const freq = n => {
      const m = { C:0,"C#":1,D:2,"D#":3,E:4,F:5,"F#":6,G:7,"G#":8,A:9,"A#":10,B:11 };
      const name = n.slice(0, -1), oct = +n.slice(-1);
      const midi = (oct + 1) * 12 + m[name];
      return 440 * Math.pow(2, (midi - 69) / 12);
    };

    function voice(f, t, dur, g, type) {
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), gain = ctx.createGain();
      o.type = type || "triangle"; o.frequency.value = f;
      o2.type = "sine"; o2.frequency.value = f; o2.detune.value = 5;
      o.connect(gain); o2.connect(gain); gain.connect(lp);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(g, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    }

    function scheduler() {
      while (nextTime < ctx.currentTime + 0.15) {
        const chord = (step / 4) | 0 % arps.length;
        const idx = step % 4;
        const ci = chord % arps.length;
        voice(freq(arps[ci][idx]), nextTime, 0.55, 0.06);      // arpeggio
        if (idx === 0) voice(freq(bass[ci]), nextTime, 1.7, 0.05, "sine"); // bass
        if (idx === 0 && Math.random() > 0.6)                  // soft sparkle bell
          voice(freq(arps[ci][2]) * 2, nextTime, 0.9, 0.015, "sine");
        nextTime += STEP;
        step = (step + 1) % (arps.length * 4);
      }
      schedTimer = setTimeout(scheduler, 30);
    }

    function startSynth() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0;
      lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2400;
      delay = ctx.createDelay(); delay.delayTime.value = 0.33;
      const fb = ctx.createGain(); fb.gain.value = 0.28;
      const wet = ctx.createGain(); wet.gain.value = 0.25;
      lp.connect(master);
      lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      master.connect(ctx.destination);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);  // gentle fade-in
      step = 0; nextTime = ctx.currentTime + 0.1;
      scheduler();
      playing = true; setBtn(true);
    }
    function stopSynth() {
      if (schedTimer) clearTimeout(schedTimer);
      if (master && ctx) {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        setTimeout(() => { try { ctx.close(); } catch (_) {} ctx = null; }, 800);
      }
    }
    function setBtn(on) {
      btn.classList.toggle("playing", on);
      btn.title = on ? "Pause music" : "Play music";
      btn.setAttribute("aria-label", on ? "Pause background music" : "Play background music");
    }

    function start() {
      if (playing) return;
      audioEl.volume = 0.45;
      audioEl.play()
        .then(() => { usingFile = true; playing = true; setBtn(true); })
        .catch(() => { startSynth(); });   // no file → synth
    }
    function stop() {
      if (usingFile) audioEl.pause(); else stopSynth();
      playing = false; usingFile = false; setBtn(false);
    }
    btn.addEventListener("click", () => playing ? stop() : start());
    return { start, stop };
  })();

  /* =========================================================
     VENUE directions
     ========================================================= */
  const dirBtn = $("#directionsBtn");
  if (dirBtn) dirBtn.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(VENUE_QUERY);

  /* =========================================================
     WHATSAPP SHARE
     ========================================================= */
  const shareUrl = "https://wa.me/?text=" + encodeURIComponent(
    "You're invited to Sajil ❤️ Jino's wedding on 02 July 2026 at Holy Family Church, Nagercoil! View the invitation: " + SITE_URL);
  if ($("#shareWhatsApp")) $("#shareWhatsApp").href = shareUrl;
  if ($("#footerShare"))   $("#footerShare").href   = shareUrl;
  if ($("#shareCardWA"))   $("#shareCardWA").addEventListener("click", () => window.open(shareUrl, "_blank", "noopener"));

  /* =========================================================
     ADD TO CALENDAR  (Google Calendar template)
     ========================================================= */
  function calUrl() {
    const start = "20260702T050000Z";          // 10:30 IST
    const end   = "20260702T070000Z";          // 12:30 IST
    const text  = "Sajil ❤️ Jino — Holy Matrimony";
    const det   = "With the blessings of our parents, join us for the Nuptial Mass of Sajil & Jino. #SajilWedsJino";
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(text) +
      "&dates=" + start + "/" + end +
      "&details=" + encodeURIComponent(det) +
      "&location=" + encodeURIComponent(VENUE_FULL);
  }
  function openCalendar() { window.open(calUrl(), "_blank", "noopener"); }
  $("#heroCalendar") && $("#heroCalendar").addEventListener("click", openCalendar);
  $("#addCalendar")  && $("#addCalendar").addEventListener("click", openCalendar);


  /* =========================================================
     WEDDING WISHES (localStorage)
     ========================================================= */
  const wishForm = $("#wishForm"), wishList = $("#wishList"), KEY = "sajiljino_wishes_v2";
  const esc = s => { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
  function renderWishes(w){
    wishList.innerHTML = "";
    w.slice().reverse().forEach(x => {
      const el = document.createElement("div"); el.className = "wish";
      el.innerHTML = `<div class="wish-head"><div class="wish-avatar">${esc((x.name[0]||"?").toUpperCase())}</div>`+
        `<span class="wish-name">${esc(x.name)}</span></div><p class="wish-msg">${esc(x.msg)}</p>`;
      wishList.appendChild(el);
    });
  }
  function loadWishes(){
    let w = [];
    try { w = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
    if (!w.length) w = [
      { name:"Aunty Mary",   msg:"Wishing you a lifetime of love and God's abundant blessings! 🙏" },
      { name:"Rahul",        msg:"So happy for you both. Congratulations on your big day! ❤️" },
      { name:"Priya Thomas", msg:"May God shower you with joy, peace and endless love. God bless! ✝️" },
    ];
    renderWishes(w);
  }
  wishForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#wishName").value.trim(), msg = $("#wishMsg").value.trim();
    if (!name || !msg) return;
    let w = []; try { w = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) {}
    w.push({ name, msg });
    localStorage.setItem(KEY, JSON.stringify(w));
    renderWishes(w); wishForm.reset();
    /* notify the couple via email */
    const subject = encodeURIComponent("Wedding Wish from " + name + " — #SajilWedsJino");
    const body    = encodeURIComponent("From: " + name + "\n\n" + msg + "\n\n—\nSent from the wedding invitation website.");
    const a = document.createElement("a");
    a.href = "mailto:sajiljino.wedding@gmail.com?subject=" + subject + "&body=" + body;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    /* brief confirmation toast */
    const toast = document.createElement("div");
    toast.textContent = "✓ Wish sent! Your blessing means the world to them.";
    toast.style.cssText = "position:fixed;bottom:max(90px,calc(20px + env(safe-area-inset-bottom)));left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7a1f2b,#5a1620);color:#e6c66b;padding:12px 22px;border-radius:30px;font-family:'Poppins',sans-serif;font-size:.88rem;font-weight:500;letter-spacing:.5px;box-shadow:0 10px 28px -8px rgba(90,22,32,.6);z-index:9999;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .4s";
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = "1"; setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 3200); });
  });
  loadWishes();

})();
