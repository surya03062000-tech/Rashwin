/* =========================================================
   Sajil ❤️ Gino — Wedding Invitation · interactions  v3
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
    const hideGate = () => {
      gate.classList.add("hide");
      setTimeout(() => { gate.style.display = "none"; }, 600);
    };
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      gate.classList.add("opening");
      setTimeout(hideGate, 600);
      Music.start();
    } else {
      // play the intro video, then reveal the site + start music
      Journey.run(() => { hideGate(); Music.start(); });
    }
  });

  /* =========================================================
     INTRO VIDEO  (plays once when the invitation is opened)
     ========================================================= */
  const Journey = (function () {
    const el = $("#journey");
    const vid = $("#introVideo");
    let done = false, timer = null;
    function finish(cb) {
      if (done) return; done = true;
      if (timer) clearTimeout(timer);
      try { vid && vid.pause(); } catch (_) {}
      el.classList.add("done");
      if (cb) cb();
      setTimeout(() => { el.style.display = "none"; }, 850);
    }
    function run(cb) {
      if (!el || !vid) { if (cb) cb(); return; }
      el.style.display = "block";
      const skip = $("#journeySkip");
      skip && skip.addEventListener("click", () => finish(cb), { once: true });
      vid.onended = () => finish(cb);
      vid.currentTime = 0;
      const p = vid.play();
      if (p && p.catch) {
        p.catch(() => {                       // sound blocked → retry muted
          vid.muted = true;
          const p2 = vid.play();
          if (p2 && p2.catch) p2.catch(() => finish(cb));   // can't play at all → skip
        });
      }
      // safety net: never hang longer than 30s even if 'ended' never fires
      timer = setTimeout(() => finish(cb), 30000);
    }
    return { run };
  })();

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
     FLOWER / CONFETTI SHOWER  (engagement reveal · celebration)
     ========================================================= */
  function flowerShower(count, duration) {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const glyphs = ["🌸","🌹","❀","✿","❤","🤍","💛","✦","🌼"];
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;z-index:9600;pointer-events:none;overflow:hidden";
    document.body.appendChild(layer);
    const n = count || 36, life = duration || 2600;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      const startX = Math.random() * 100;
      el.style.cssText =
        `position:absolute;top:-8%;left:${startX}vw;font-size:${14 + Math.random()*22}px;` +
        `will-change:transform,opacity;user-select:none`;
      layer.appendChild(el);
      const drift = (Math.random() * 2 - 1) * 28;
      el.animate(
        [{ transform: "translateY(-10vh) translateX(0) rotate(0)", opacity: 0 },
         { opacity: 1, offset: 0.12 },
         { transform: `translateY(108vh) translateX(${drift}vw) rotate(${(Math.random()*720-360)|0}deg)`, opacity: 0 }],
        { duration: life + Math.random() * 1400, easing: "cubic-bezier(.3,.5,.5,1)", fill: "forwards", delay: Math.random() * 600 }
      );
    }
    setTimeout(() => layer.remove(), life + 2200);
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
  function celebrate() {
    $("#countdown").innerHTML =
      '<p style="font-family:Great Vibes,cursive;font-size:clamp(1.6rem,6vw,2.6rem);color:#fff;text-align:center">We are married! 🎉 God bless us!</p>';
    /* a joyful repeating flower-shower */
    flowerShower(60, 3200);
    let bursts = 0;
    const party = setInterval(() => {
      flowerShower(40, 3000);
      if (++bursts >= 6) clearInterval(party);
    }, 2600);
  }
  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      celebrate();
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
  $$(".reveal, .reveal-scale").forEach(el => io.observe(el));

  /* confetti / flower-shower when the engagement card appears */
  const ecard = $(".engagement-card");
  if (ecard) {
    const ecObs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { flowerShower(34, 2600); ecObs.unobserve(e.target); }
    }), { threshold: 0.35 });
    ecObs.observe(ecard);
  }

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

    /* Plays assets/music.mp3 (add your "Hosanna — Vinnaithaandi Varuvaaya"
       track there). Until the file exists, a gentle synth fallback plays. */
    const MUSIC_FILE = "assets/music.mp3";

    let ctx, master, lp, perc, playing = false, muted = false, usingFile = false,
        schedTimer = null, step = 0, nextTime = 0, fadeLevel = 0;
    const userVol = 0.55;

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
      drone.forEach(n => voice(freq(n), t, 4.2, 0.04, "sine"));
    }
    function thavil(t) {                                             // soft thavil/percussion thump
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(58, t + 0.18);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.09, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
      o.connect(g); g.connect(perc); o.start(t); o.stop(t + 0.3);
    }

    function scheduler() {
      while (nextTime < ctx.currentTime + 0.25) {
        const note = melody[step % melody.length];
        voice(freq(note), nextTime, 0.72, 0.06);                    // lead
        if (step % 8 === 0) drones(nextTime);                       // refresh drone
        if (step % 2 === 0) thavil(nextTime);                       // gentle beat
        if (step % 4 === 2 && Math.random() > 0.5)                  // soft shimmer bell
          voice(freq(note) * 2, nextTime, 1.1, 0.014, "triangle");
        nextTime += STEP;
        step = (step + 1) % (melody.length * 2);
      }
      schedTimer = setTimeout(scheduler, 45);
    }

    function applyGain(dur) {
      if (!master || !ctx) return;
      const v = (muted ? 0 : userVol) * fadeLevel;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
      master.gain.linearRampToValueAtTime(Math.max(0.0001, v), ctx.currentTime + (dur || 0.3));
    }

    /* build + unlock the AudioContext — MUST run inside the click gesture */
    function primeCtx() {
      if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      if (ctx.state === "suspended") ctx.resume();
      master = ctx.createGain(); master.gain.value = 0.0001;
      lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2300;
      perc = ctx.createGain(); perc.gain.value = 1;                 // percussion bus (dry)
      const delay = ctx.createDelay(); delay.delayTime.value = 0.34;
      const fb = ctx.createGain(); fb.gain.value = 0.3;
      const wet = ctx.createGain(); wet.gain.value = 0.28;
      lp.connect(master);
      lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      perc.connect(master);
      master.connect(ctx.destination);
    }
    function runSynth() {
      primeCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      step = 0; nextTime = ctx.currentTime + 0.12;
      scheduler();
      fadeLevel = 1; applyGain(2.0);                                 // smooth fade-in
      usingFile = false; playing = true; setBtn(true);
    }
    function teardownCtx() {
      if (schedTimer) clearTimeout(schedTimer);
      try { ctx && ctx.close(); } catch (_) {}
      ctx = master = perc = null;
    }
    function stopSynth() {
      fadeLevel = 0; applyGain(1.2);                                 // smooth fade-out
      if (schedTimer) clearTimeout(schedTimer);
      setTimeout(teardownCtx, 1400);
    }

    /* ---- file (mp3) path with manual volume fade ---- */
    let fileFade = null;
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
      muteBtn.textContent = muted ? "🔇" : "🔊";
      muteBtn.title = muted ? "Unmute" : "Mute";
      muteBtn.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");
    }

    function start() {
      if (playing) return;
      dock.classList.add("open");
      primeCtx();                                                   // unlock audio in the gesture
      if (MUSIC_FILE) {                                             // real track if provided
        audioEl.volume = 0;
        const p = audioEl.play();
        if (p && p.then) {
          p.then(() => {
            usingFile = true; playing = true; setBtn(true);
            teardownCtx();                                          // don't need the synth
            fadeFile(muted ? 0 : userVol, 1.4);
          }).catch(() => runSynth());                               // no file → synth (ctx already primed)
        } else { runSynth(); }
      } else {
        runSynth();
      }
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

    btn.addEventListener("click", () => playing ? stop() : start());
    muteBtn && muteBtn.addEventListener("click", toggleMute);
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
  const shareMsg =
    "💍✨ *Sajil ❤️ Gino* ✨💍\n" +
    "_With the blessings of our families_\n\n" +
    "You are warmly invited to our wedding celebrations 🌸\n\n" +
    "💍 *Engagement* — Wed, 01 July 2026 · 10:30 AM\n" +
    "    St. Antony's Community Hall, Kurusady, Nagercoil\n\n" +
    "⛪ *Holy Matrimony* — Thu, 02 July 2026 · 10:30 AM\n" +
    "    Holy Family Church, Carmel Nagar, Ramanputhur, Nagercoil\n\n" +
    "🤍 Your presence & blessings will make our day complete.\n\n" +
    "💌 View the full invitation:\n" + SITE_URL + "\n\n#SajilWedsGino";
  const shareUrl = "https://wa.me/?text=" + encodeURIComponent(shareMsg);
  if ($("#shareWhatsApp")) $("#shareWhatsApp").href = shareUrl;
  if ($("#footerShare"))   $("#footerShare").href   = shareUrl;
  if ($("#shareCardWA"))   $("#shareCardWA").addEventListener("click", () => window.open(shareUrl, "_blank", "noopener"));

  /* =========================================================
     ADD TO CALENDAR  (Google Calendar template)
     ========================================================= */
  function calUrl() {
    const start = "20260702T050000Z";          // 10:30 IST
    const end   = "20260702T070000Z";          // 12:30 IST
    const text  = "Sajil ❤️ Gino — Holy Matrimony";
    const det   = "With the blessings of our parents, join us for the Holy Matrimony of Sajil & Gino. Engagement: 01 July 2026, St. Antony's Community Hall, Kurusady. #SajilWedsGino";
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
     Primary: EmailJS  ·  Fallback: FormSubmit  ·  Last: mailto
     ========================================================= */
  const wishForm = $("#wishForm"), wishSuccess = $("#wishSuccess"), wishSubmit = $("#wishSubmit");
  const WISH_TO  = "rashwinxavier6@gmail.com";
  const WISH_ENDPOINT = "https://formsubmit.co/ajax/" + WISH_TO;

  /* ---- EmailJS config — fill these from your emailjs.com dashboard ---- */
  const EMAILJS = {
    publicKey:  "",     // e.g. "AbCdEf123..."
    serviceId:  "",     // e.g. "service_xxx"
    templateId: ""      // e.g. "template_xxx"
  };
  const emailjsReady = () =>
    window.emailjs && EMAILJS.publicKey && EMAILJS.serviceId && EMAILJS.templateId;
  if (window.emailjs && EMAILJS.publicKey) {
    try { window.emailjs.init({ publicKey: EMAILJS.publicKey }); } catch (_) {}
  }

  function showWishSuccess() {
    if (wishForm) { wishForm.hidden = true; wishForm.classList.add("sent"); }
    if (wishSuccess) { wishSuccess.hidden = false; wishSuccess.classList.add("in"); }
  }
  function mailtoFallback(name, msg) {
    const subject = encodeURIComponent("New Wedding Wish — Sajil & Gino");
    const body    = encodeURIComponent("From: " + name + "\n\n" + msg + "\n\n—\nSent from the wedding invitation website.");
    const a = document.createElement("a");
    a.href = "mailto:" + WISH_TO + "?subject=" + subject + "&body=" + body;
    a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  function sendViaFormSubmit(name, msg) {
    return fetch(WISH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, message: msg, _subject: "New Wedding Wish for Sajil & Gino", _template: "box" })
    }).then(r => { if (!r.ok) throw new Error("send failed"); });
  }

  wishForm && wishForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#wishName").value.trim(), msg = $("#wishMsg").value.trim();
    if (!name || !msg) return;
    wishSubmit.classList.add("sending"); wishSubmit.textContent = "Sending…";

    const send = emailjsReady()
      ? window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
          from_name: name, message: msg, to_email: WISH_TO,
          subject: "New Wedding Wish for Sajil & Gino"
        })
      : sendViaFormSubmit(name, msg);

    send
      .then(() => showWishSuccess())
      .catch(() => { mailtoFallback(name, msg); showWishSuccess(); });
  });

})();
