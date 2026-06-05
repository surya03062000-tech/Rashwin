/* =========================================================
   Sajil ❤️ Jino — Wedding Invitation · interactions  v3
   3D gate · synth Christian music · add-to-calendar ·
   save-the-date share · Tamil · gallery · wishes
   ========================================================= */
(function () {
  "use strict";

  /* ----- Config ----- */
  const WEDDING_DATE  = new Date("2026-07-01T10:30:00+05:30");
  const SITE_URL      = window.location.href;
  const VENUE_QUERY   = "St Antony's Community Hall Kurusady Nagercoil";
  const VENUE_FULL    = "St. Antony's Community Hall, Kurusady, Nagercoil, Tamil Nadu";

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
     FLOATING HEARTS  (bright red)
     ========================================================= */
  (function () {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const wrap = document.createElement("div");
    wrap.className = "hearts"; wrap.setAttribute("aria-hidden", "true");
    document.body.appendChild(wrap);
    const glyphs = ["❤", "❤", "♥", "❥"];
    const count  = window.innerWidth < 600 ? 9 : 16;
    for (let i = 0; i < count; i++) {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = glyphs[i % glyphs.length];
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 12 + Math.random() * 20 + "px";
      h.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
      const dur = 10 + Math.random() * 12;
      h.style.animationDuration = dur + "s";
      h.style.animationDelay = -Math.random() * dur + "s";
      wrap.appendChild(h);
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
        '<p style="font-family:Great Vibes,cursive;font-size:clamp(1.4rem,5vw,2rem);color:#fff;text-align:center">We are engaged! 🎉 God bless us!</p>';
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
     BACKGROUND MUSIC  —  elegant Tamil/Indian wedding instrumental
     Uses assets/music.mp3 if present; otherwise plays a gentle
     synthesised "Mangala Vadyam" (Mohanam raga) — nadaswaram-style
     lead over a tanpura-like drone.  Play/Pause · Volume · Mute ·
     smooth fade-in / fade-out.
     ========================================================= */
  const Music = (function () {
    const audioEl = $("#bgMusic");
    const btn   = $("#musicToggle");
    const dock  = $("#musicDock");
    const muteBtn = $("#muteToggle");
    const volEl = $("#volSlider");

    let ctx, master, lp, playing = false, muted = false, usingFile = false,
        schedTimer = null, step = 0, nextTime = 0, fadeLevel = 0, userVol = 0.45,
        fileFade = null;

    /* Mohanam raga (pentatonic) — a serene, auspicious South-Indian scale */
    const STEP   = 0.5;
    const melody = ["C4","D4","E4","G4","A4","G4","E4","D4",
                    "E4","G4","A4","C5","A4","G4","E4","D4",
                    "G4","A4","C5","D5","C5","A4","G4","E4",
                    "C4","D4","E4","G4","E4","D4","C4","D4"];
    const drone  = ["C2","G2"];

    const freq = n => {
      const m = { C:0,"C#":1,D:2,"D#":3,E:4,F:5,"F#":6,G:7,"G#":8,A:9,"A#":10,B:11 };
      const name = n.slice(0, -1), oct = +n.slice(-1);
      const midi = (oct + 1) * 12 + m[name];
      return 440 * Math.pow(2, (midi - 69) / 12);
    };

    function voice(f, t, dur, g, type) {
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), gain = ctx.createGain();
      o.type = type || "sawtooth"; o.frequency.value = f;            // reedy nadaswaram-ish lead
      o2.type = "sine"; o2.frequency.value = f; o2.detune.value = 6;
      o.connect(gain); o2.connect(gain); gain.connect(lp);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(g, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    }
    function drones(t) {                                             // tanpura-like sustained drone
      drone.forEach((n, i) => voice(freq(n), t, 4.2, 0.035, "sine"));
    }

    function scheduler() {
      while (nextTime < ctx.currentTime + 0.2) {
        const note = melody[step % melody.length];
        voice(freq(note), nextTime, 0.7, 0.05);                     // lead
        if (step % 8 === 0) drones(nextTime);                       // refresh drone
        if (step % 4 === 2 && Math.random() > 0.5)                  // soft shimmer bell
          voice(freq(note) * 2, nextTime, 1.1, 0.012, "triangle");
        nextTime += STEP;
        step = (step + 1) % (melody.length * 2);
      }
      schedTimer = setTimeout(scheduler, 40);
    }

    function applyGain(dur) {
      if (!master || !ctx) return;
      const v = (muted ? 0 : userVol) * fadeLevel;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
      master.gain.linearRampToValueAtTime(v, ctx.currentTime + (dur || 0.3));
    }

    function startSynth() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.0001;
      lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2200;
      const delay = ctx.createDelay(); delay.delayTime.value = 0.34;
      const fb = ctx.createGain(); fb.gain.value = 0.3;
      const wet = ctx.createGain(); wet.gain.value = 0.28;
      lp.connect(master);
      lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      master.connect(ctx.destination);
      step = 0; nextTime = ctx.currentTime + 0.12;
      scheduler();
      fadeLevel = 1; applyGain(2.2);                                 // smooth fade-in
      usingFile = false; playing = true; setBtn(true);
    }
    function stopSynth() {
      fadeLevel = 0; applyGain(1.2);                                 // smooth fade-out
      if (schedTimer) clearTimeout(schedTimer);
      setTimeout(() => { try { ctx && ctx.close(); } catch (_) {} ctx = master = null; }, 1400);
    }

    /* ---- file (mp3) path with manual volume fade ---- */
    function fadeFile(target, dur, after) {
      clearInterval(fileFade);
      const start = audioEl.volume, t0 = performance.now();
      fileFade = setInterval(() => {
        const k = Math.min(1, (performance.now() - t0) / (dur * 1000));
        audioEl.volume = Math.max(0, Math.min(1, start + (target - start) * k));
        if (k >= 1) { clearInterval(fileFade); if (after) after(); }
      }, 40);
    }

    function setBtn(on) {
      btn.classList.toggle("playing", on);
      btn.querySelector(".music-icon").textContent = on ? "❚❚" : "♪";
      btn.title = on ? "Pause music" : "Play music";
      btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
      dock.classList.toggle("open", on);
    }
    function setMuteBtn() {
      if (!muteBtn) return;
      const off = muted || userVol === 0;
      muteBtn.textContent = off ? "🔇" : "🔊";
      muteBtn.title = off ? "Unmute" : "Mute";
      muteBtn.setAttribute("aria-label", off ? "Unmute music" : "Mute music");
    }

    function start() {
      if (playing) return;
      dock.classList.add("open");
      audioEl.volume = 0;
      audioEl.play()
        .then(() => { usingFile = true; playing = true; setBtn(true); fadeFile(muted ? 0 : userVol, 1.4); })
        .catch(() => { startSynth(); });                            // no file → synth
    }
    function stop() {
      if (!playing) return;
      if (usingFile) fadeFile(0, 1.0, () => audioEl.pause()); else stopSynth();
      playing = false; usingFile = false; setBtn(false);
    }
    function toggleMute() {
      muted = !muted;
      if (usingFile) fadeFile(muted ? 0 : userVol, 0.4); else applyGain(0.4);
      setMuteBtn();
    }
    function setVolume(v) {
      userVol = Math.max(0, Math.min(1, v));
      if (userVol > 0 && muted) muted = false;
      if (!muted) { if (usingFile) audioEl.volume = userVol; else applyGain(0.15); }
      setMuteBtn();
    }

    btn.addEventListener("click", () => playing ? stop() : start());
    muteBtn && muteBtn.addEventListener("click", toggleMute);
    volEl && volEl.addEventListener("input", e => setVolume(e.target.value / 100));
    if (volEl) userVol = volEl.value / 100;
    setMuteBtn();
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
    "You're invited to Sajil ❤️ Jino's Engagement Ceremony on 01 July 2026 at St. Antony's Community Hall, Nagercoil! View the invitation: " + SITE_URL);
  if ($("#shareWhatsApp")) $("#shareWhatsApp").href = shareUrl;
  if ($("#footerShare"))   $("#footerShare").href   = shareUrl;
  if ($("#shareCardWA"))   $("#shareCardWA").addEventListener("click", () => window.open(shareUrl, "_blank", "noopener"));

  /* =========================================================
     ADD TO CALENDAR  (Google Calendar template)
     ========================================================= */
  function calUrl() {
    const start = "20260701T050000Z";          // 10:30 IST
    const end   = "20260701T070000Z";          // 12:30 IST
    const text  = "Sajil ❤️ Jino — Engagement Ceremony";
    const det   = "With the blessings of our parents, join us for the Engagement Ceremony of Sajil & Jino. #SajilWedsJino";
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
     WEDDING WISHES  — private: emailed to the couple, not shown
     ========================================================= */
  const wishForm = $("#wishForm"), wishSuccess = $("#wishSuccess"), wishSubmit = $("#wishSubmit");
  const WISH_TO  = "rashwinxavier6@gmail.com";
  const WISH_ENDPOINT = "https://formsubmit.co/ajax/" + WISH_TO;

  function showWishSuccess() {
    if (wishForm) { wishForm.hidden = true; wishForm.classList.add("sent"); }
    if (wishSuccess) { wishSuccess.hidden = false; wishSuccess.classList.add("in"); }
  }
  function mailtoFallback(name, msg) {
    const subject = encodeURIComponent("New Wedding Wish — Sajil & Jino");
    const body    = encodeURIComponent("From: " + name + "\n\n" + msg + "\n\n—\nSent from the wedding invitation website.");
    const a = document.createElement("a");
    a.href = "mailto:" + WISH_TO + "?subject=" + subject + "&body=" + body;
    a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  wishForm && wishForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#wishName").value.trim(), msg = $("#wishMsg").value.trim();
    if (!name || !msg) return;
    wishSubmit.classList.add("sending"); wishSubmit.textContent = "Sending…";

    fetch(WISH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: name,
        message: msg,
        _subject: "New Wedding Wish for Sajil & Jino",
        _template: "box"
      })
    })
      .then(r => { if (!r.ok) throw new Error("send failed"); showWishSuccess(); })
      .catch(() => { mailtoFallback(name, msg); showWishSuccess(); });
  });

})();
