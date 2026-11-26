/* =====================================================================
   Barbilla tour site · behaviour
   You normally don't need to edit this file. Content lives in
   content/content.js
   ===================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  var TOUR = S.tours[0];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);

  /* ---------------- Language ---------------- */
  var lang = (function () {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "es") return q;
    try { var s = localStorage.getItem("wwn-lang"); if (s === "en" || s === "es") return s; } catch (e) {}
    return S.defaultLanguage || "en";
  })();

  function tr(obj) {
    if (obj == null) return "";
    if (typeof obj === "string" || typeof obj === "number") return String(obj);
    return obj[lang] != null ? obj[lang] : (obj.en || "");
  }
  function isTodo(obj) { return !!(S.showPlaceholderMarkers && obj && obj.todo); }
  function markTodo(el, obj) {
    el.classList.toggle("is-todo", isTodo(obj));
    if (isTodo(obj)) el.title = tr(S.text.placeholderBadge); else el.removeAttribute("title");
  }
  function setText(el, obj) { el.textContent = tr(obj); markTodo(el, obj); }
  function textAt(path) {
    return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, S.text);
  }
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return el;
  }
  function icon(name, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", cls || "ic"); svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(ns, "use"); use.setAttribute("href", "#i-" + name);
    svg.appendChild(use); return svg;
  }
  function photo(key, sizes, eager) {
    var p = S.PHOTOS[key];
    if (!p) return h("div", { class: "missing" });
    return h("img", {
      src: "assets/img/" + p.file + "-s.jpg",
      srcset: "assets/img/" + p.file + "-s.jpg 800w, assets/img/" + p.file + "-l.jpg 1800w",
      sizes: sizes || "(max-width: 900px) 100vw, 50vw",
      alt: tr(p.alt), loading: eager ? "eager" : "lazy", decoding: "async"
    });
  }
  function money(n) {
    try { return new Intl.NumberFormat("en-US", { style: "currency", currency: TOUR.currency, maximumFractionDigits: 0 }).format(n); }
    catch (e) { return "$" + n; }
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function locale() { return lang === "es" ? "es-CR" : "en-GB"; }

  /* ---------------- Static text ---------------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(function (el) {
      var obj = textAt(el.getAttribute("data-t"));
      if (obj) setText(el, obj);
    });
    $$("[data-tour]").forEach(function (el) { setText(el, TOUR[el.getAttribute("data-tour")]); });
    var lt = $("#langToggle");
    var spans = lt.querySelectorAll("span[aria-hidden]");
    spans[0].classList.toggle("on", lang === "en");
    spans[2].classList.toggle("on", lang === "es");
    lt.setAttribute("aria-label", tr(S.text.langToggle));
    var vt = $("#motionToggle .sr"); if (vt) vt.textContent = tr(heroPaused ? S.text.hero.play : S.text.hero.pause);
  }

  /* ---------------- Contact ---------------- */
  function renderContact() {
    var c = S.contact;
    $$("[data-contact]").forEach(function (el) {
      var k = el.getAttribute("data-contact");
      var span = el.querySelector("span:not([data-t])");
      if (k === "organisation") el.textContent = c.organisation;
      if (k === "email") { el.href = "mailto:" + c.email; (span || el).textContent = c.email; }
      if (k === "emailAlt") { el.hidden = !c.emailAlt; if (c.emailAlt) { el.href = "mailto:" + c.emailAlt; (span || el).textContent = c.emailAlt; } }
      if (k === "phone") { el.href = "tel:" + c.phoneInternational; if (span) span.textContent = "+506 " + c.phone; }
      if (k === "whatsapp") { el.href = "https://wa.me/" + c.phoneInternational.replace(/\D/g, ""); el.hidden = !c.whatsapp; }
      if (k === "website") el.href = c.website;
    });
    $("#waBtn").hidden = !c.whatsapp;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------------- Hero ---------------- */
  var heroPaused = false;
  function renderFacts() {
    var f = S.text.facts, dl = $("#heroFacts");
    dl.innerHTML = "";
    var hexes = h("span", { class: "hexes" });
    for (var i = 1; i <= 3; i++) hexes.appendChild(icon("hex", i <= TOUR.difficulty ? "on" : ""));
    var rows = [
      ["clock", f.duration, [h("span", null, [tr(TOUR.durationHours)])], TOUR.durationHours],
      ["mountain", f.difficulty, [hexes, h("span", null, [tr(f.levels[TOUR.difficulty - 1])])]],
      ["users", f.group, [h("span", null, [tr(f.upTo) + " " + TOUR.groupMax + " "]), h("small", null, [tr(f.people)])]],
      ["tag", f.price, [h("span", null, [money(TOUR.pricePerPerson) + " "]), h("small", null, [tr(f.perPerson)])], TOUR.priceIsPlaceholder ? { todo: true } : null]
    ];
    rows.forEach(function (r) {
      var dd = h("dd", null, r[2]); if (r[3]) markTodo(dd, r[3]);
      dl.appendChild(h("div", { class: "fact" }, [h("dt", null, [icon(r[0]), tr(r[1])]), dd]));
    });
  }

  /* Hero: one photo split into depth layers that pan slowly and tilt in 3D */
  function setupHero() {
    var cfg = S.heroScene || {}, hero = $("#hero"), scene = $("#scene"), btn = $("#motionToggle");
    var p = S.PHOTOS[cfg.photo || "parkLandscape"];
    scene.setAttribute("aria-label", tr(p.alt));
    if (cfg.mist === false) $$(".mist", scene).forEach(function (m) { m.style.display = "none"; });
    var layers = $$(".layer", scene).map(function (el) { return { el: el, d: parseFloat(el.dataset.depth) || 1, mist: el.classList.contains("mist") }; });
    var D = cfg.depth == null ? 1 : cfg.depth, period = (cfg.panSeconds || 60) * 1000;
    var W = 0, H = 0, sw = 0, sh = 0, mouse = null, cur = { x: 0, y: 0 }, running = false, raf, t0 = performance.now(), offset = 0;

    function size() {
      W = hero.clientWidth; H = hero.clientHeight;
      var over = 1.14;                        // a bit bigger than the hero, so edges never show
      sw = Math.max(W, H * 1.5) * over; sh = sw / 1.5;
      scene.style.width = sw + "px"; scene.style.height = sh + "px";
      scene.style.marginLeft = (-sw / 2) + "px"; scene.style.marginTop = (-sh / 2) + "px";
    }
    function draw(now) {
      var t = now - t0 + offset, ph = t / period * Math.PI * 2;
      var pan = Math.sin(ph);
      // where the viewer "looks": the mouse on computers, a slow drift on phones
      var tx = mouse ? mouse.x : Math.sin(t / 17000) * 0.45;
      var ty = mouse ? mouse.y : Math.sin(t / 23000) * 0.3;
      cur.x += (tx - cur.x) * 0.04; cur.y += (ty - cur.y) * 0.04;
      var sc = Math.min(1.2, Math.max(0, window.scrollY / Math.max(H, 1)));
      var zoom = 1 + 0.03 * (1 - Math.cos(ph * 0.5)) / 2;
      scene.style.transform = "translate3d(0," + (sc * H * 0.18).toFixed(1) + "px,0) rotateY(" + (cur.x * 2.4 * D).toFixed(3) + "deg) rotateX(" + (-cur.y * 1.6 * D).toFixed(3) + "deg) scale(" + zoom.toFixed(4) + ")";
      layers.forEach(function (L) {
        var k = L.d * D;
        var x = -(pan * 0.016 + cur.x * 0.012) * k * sw;
        var y = (-cur.y * 0.008 * k - sc * 0.05 * k) * sh;
        if (L.mist) x += Math.sin(t / 21000 + L.d) * 0.02 * sw;
        L.el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
      });
    }
    function loop(now) { draw(now); if (running) raf = requestAnimationFrame(loop); }
    function setRunning(on) {
      if (on === running) return;
      running = on; cancelAnimationFrame(raf);
      if (on) { t0 = performance.now(); raf = requestAnimationFrame(loop); }
      else offset += performance.now() - t0;
    }
    size(); draw(performance.now());
    window.addEventListener("resize", function () { size(); draw(performance.now()); });
    if (reduceMotion) return;                 // still photo for people who prefer less motion

    var paused = false, visible = true;
    function update() { setRunning(!paused && visible && !document.hidden); }
    hero.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      mouse = { x: (e.clientX / W) * 2 - 1, y: (e.clientY / H) * 2 - 1 };
    });
    hero.addEventListener("pointerleave", function () { mouse = null; });
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }).observe(hero);
    document.addEventListener("visibilitychange", update);
    btn.hidden = false;
    btn.addEventListener("click", function () {
      paused = !paused; heroPaused = paused; update();
      btn.querySelector("use").setAttribute("href", paused ? "#i-play" : "#i-pause");
      btn.querySelector(".sr").textContent = tr(paused ? S.text.hero.play : S.text.hero.pause);
    });
    update();
  }

  /* Fireflies: small glowing particles drifting over the hero */
  function fireflies() {
    var c = $("#fireflies"); if (!c || reduceMotion) return;
    var ctx = c.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W, H, flies = [], running = true, raf;
    function size() { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    var n = W < 640 ? 18 : 36;
    for (var i = 0; i < n; i++) flies.push({
      x: Math.random() * W, y: H * (0.25 + Math.random() * 0.75), r: 1 + Math.random() * 1.8,
      vx: (Math.random() - .5) * .25, vy: -(.05 + Math.random() * .2), ph: Math.random() * 6.28, sp: .01 + Math.random() * .02,
      hue: Math.random() < .7 ? "202,226,96" : "111,203,128"
    });
    function tick() {
      ctx.clearRect(0, 0, W, H);
      flies.forEach(function (f) {
        f.ph += f.sp; f.x += f.vx + Math.sin(f.ph) * .3; f.y += f.vy;
        if (f.y < H * .15) { f.y = H + 10; f.x = Math.random() * W; }
        if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10;
        var a = .25 + .75 * Math.max(0, Math.sin(f.ph * 1.3));
        var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7);
        g.addColorStop(0, "rgba(" + f.hue + "," + (a * .9) + ")"); g.addColorStop(1, "rgba(" + f.hue + ",0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 7, 0, 6.283); ctx.fill();
      });
      if (running) raf = requestAnimationFrame(tick);
    }
    new IntersectionObserver(function (es) {
      running = es[0].isIntersecting && !document.hidden;
      cancelAnimationFrame(raf); if (running) tick();
    }).observe(c);
    document.addEventListener("visibilitychange", function () { running = !document.hidden; cancelAnimationFrame(raf); if (running) tick(); });
  }

  /* ---------------- Ribbon ---------------- */
  function renderRibbon() {
    var keys = S.ribbon, a = $("#ribbonA"), b = $("#ribbonB");
    a.innerHTML = ""; b.innerHTML = "";
    var half = Math.ceil(keys.length / 2);
    [[a, keys.slice(0, half)], [b, keys.slice(half)]].forEach(function (pair) {
      var list = pair[1].concat(pair[1], pair[1], pair[1]); // repeat for a seamless loop
      list.forEach(function (k) { pair[0].appendChild(h("figure", null, [photo(k, "260px")])); });
    });
  }

  /* ---------------- Tour stops ---------------- */
  var tagStyle = { reforestation: "clay", macaws: "lime", frogs: "moon", arboretum: "clay", reserve: "", watchtower: "lime" };
  function renderStops() {
    var ol = $("#stops"); ol.innerHTML = "";
    var total = TOUR.stops.length;
    TOUR.stops.forEach(function (s, i) {
      var n = pad(i + 1);
      var tag = h("span", { class: "tag " + (tagStyle[s.key] || "") }, [icon("hex", ""), tr(s.tag)]);
      var title = h("h3"); setText(title, s.title);
      var para = h("p"); setText(para, s.text);
      var body = h("div", { class: "stop-body" }, [
        h("span", { class: "stop-num" }, [tr(S.text.tour.stop) + " " + n + " / " + pad(total)]), tag, title, para
      ]);
      if (s.photoNote && S.showPlaceholderMarkers) body.appendChild(h("span", { class: "todo-note" }, [tr(s.photoNote)]));
      if (s.impact) {
        // one or more big numbers that count up, e.g. trees planted and hectares restored
        var stats = [].concat(s.impact).map(function (st) {
          var lab = h("p"); setText(lab, st.label);
          return h("div", { class: "impact-stat" }, [
            h("div", { class: "impact-num" }, [h("span", { class: "count", "data-value": st.value }, ["0"]), st.unit ? h("small", null, [st.unit]) : null]),
            lab
          ]);
        });
        body.appendChild(h("div", { class: "impact" }, stats));
      }
      var media;
      if (s.layout === "mosaic") {
        media = h("div", { class: "mosaic" }, s.photos.map(function (k, j) {
          return h("figure", { tabindex: "0" }, [photo(k, j === 0 ? "(max-width: 640px) 100vw, 30vw" : "(max-width: 640px) 50vw, 15vw"), h("figcaption", null, [tr(S.PHOTOS[k].alt)])]);
        }));
      } else {
        media = h("div", { class: "collage" }, s.photos.slice(0, 3).map(function (k, j) {
          return h("figure", { class: "c" + (j + 1) + (j ? " parallax" : ""), "data-speed": j === 1 ? "0.08" : "-0.06" }, [photo(k, j ? "(max-width: 640px) 50vw, 25vw" : "(max-width: 900px) 100vw, 45vw")]);
        }));
      }
      var marker = h("div", { class: "stop-marker", "aria-hidden": "true" }, [icon("hex", ""), h("b", null, [String(i + 1)])]);
      ol.appendChild(h("li", { class: "stop reveal", id: "stop-" + s.key }, [marker, body, h("div", { class: "stop-media" }, [media])]));
    });
  }

  /* ---------------- Partners ---------------- */
  function renderPartners() {
    var ul = $("#partnerList"); ul.innerHTML = "";
    S.text.partners.items.forEach(function (p, i) {
      var visual;
      if (p.logo) {
        var L = S.LOGOS[p.logo];
        visual = h("div", { class: "plate" }, [h("img", { src: L.file, alt: L.name, loading: "lazy" })]);
      } else {
        visual = h("div", { class: "icon-plate" }, [icon("hex", "bg"), icon(p.icon)]);
      }
      var title = h("h3"); setText(title, p.title);
      var text = h("p"); setText(text, p.text);
      ul.appendChild(h("li", { class: "partner reveal" }, [visual, h("div", null, [title, text])]));
    });
    var P = S.text.partners;
    if (P.others && P.others.length) {
      var head = h("h3"); setText(head, P.othersTitle);
      ul.appendChild(h("li", { class: "partner-others reveal" }, [head, h("ul", { class: "chips" }, P.others.map(function (o) {
        var note = h("small"); setText(note, o.note);
        return h("li", null, [h("b", null, [o.name]), note]);
      }))]));
    }
  }

  /* ---------------- Logistics ---------------- */
  function renderLogistics() {
    var L = TOUR.logistics, g = $("#logGrid"); g.innerHTML = "";
    function card(num, ic, block, extra, cls) {
      var title = h("h3"); setText(title, block.title);
      var kids = [h("span", { class: "num" }, [pad(num)]), h("div", { class: "log-head" }, [icon(ic), title])];
      if (extra) kids.push(extra);
      if (block.text) { var p = h("p"); setText(p, block.text); kids.push(p); }
      if (block.items) {
        kids.push(h("ul", { class: "checklist" }, block.items.map(function (it) {
          var sp = h("span"); setText(sp, it); return h("li", null, [icon("hex", ""), sp]);
        })));
      }
      return h("article", { class: "log-card reveal " + (cls || "") }, kids);
    }
    var big = h("p", { class: "log-big" }, [money(TOUR.pricePerPerson), h("small", null, [tr(S.text.facts.perPerson)])]);
    markTodo(big, TOUR.priceIsPlaceholder ? { todo: true } : null);
    var dur = h("p", { class: "log-big" }); setText(dur, TOUR.durationHours);
    g.appendChild(card(1, "calendar", L.reserve));
    g.appendChild(card(2, "tag", L.pricing, big));
    g.appendChild(card(3, "clock", L.duration, dur));
    g.appendChild(h("div", { class: "log-photo" }, [photo("guide", "50vw")]));
    g.appendChild(card(4, "check", L.included, null, "wide"));
    g.appendChild(card(5, "leaf", L.bring, null, "wide bring"));
  }

  /* ---------------- Footer logos ---------------- */
  function renderLogos() {
    var box = $("#footerLogos"); box.innerHTML = "";
    ["workWithNature", "adoptRainforest", "sinac", "barbilla"].forEach(function (k) {
      var L = S.LOGOS[k];
      box.appendChild(h("div", { class: "plate" }, [h("img", { src: L.file, alt: L.name, loading: "lazy" })]));
    });
    $("#bookingBg").src = "assets/img/" + S.PHOTOS.mistCanopy.file + "-l.jpg";
  }

  /* =================================================================
     BOOKING
     ================================================================= */
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var A = TOUR.availability;
  var minDate = new Date(today); minDate.setDate(minDate.getDate() + (A.minDaysAhead || 0));
  var maxDate = new Date(today); maxDate.setMonth(maxDate.getMonth() + (A.maxMonthsAhead || 12));
  var B = { date: null, adults: Math.min(2, TOUR.groupMax), children: 0, guideLang: lang === "es" ? 1 : 0,
            view: new Date(minDate.getFullYear(), minDate.getMonth(), 1), refTail: Math.random().toString(36).slice(2, 6).toUpperCase(), sent: false };

  function available(d) {
    if (d < minDate || d > maxDate) return false;
    if (A.daysOfWeek && A.daysOfWeek.indexOf(d.getDay()) === -1) return false;
    if (A.closedDates && A.closedDates.indexOf(iso(d)) !== -1) return false;
    return true;
  }

  function renderCalendar(focusIso) {
    var cal = $("#calendar"), b = S.text.booking; cal.innerHTML = "";
    var y = B.view.getFullYear(), m = B.view.getMonth();
    var title = new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(B.view); title = title.charAt(0).toUpperCase() + title.slice(1);
    var prev = h("button", { type: "button", "aria-label": tr(b.prevMonth) }, [icon("left")]);
    var next = h("button", { type: "button", "aria-label": tr(b.nextMonth) }, [icon("right")]);
    prev.disabled = new Date(y, m, 1) <= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    next.disabled = new Date(y, m + 1, 1) > maxDate;
    prev.onclick = function () { B.view = new Date(y, m - 1, 1); renderCalendar(); };
    next.onclick = function () { B.view = new Date(y, m + 1, 1); renderCalendar(); };
    cal.appendChild(h("div", { class: "cal-head" }, [h("span", { class: "cal-title", "aria-live": "polite" }, [title]), h("div", { class: "cal-nav" }, [prev, next])]));

    var table = h("table", { class: "cal-grid", role: "grid" });
    var head = h("tr");
    var wd = new Intl.DateTimeFormat(locale(), { weekday: "short" });
    for (var i = 0; i < 7; i++) { var ref = new Date(2024, 0, 1 + i); head.appendChild(h("th", { scope: "col", abbr: new Intl.DateTimeFormat(locale(), { weekday: "long" }).format(ref) }, [wd.format(ref).replace(".", "").slice(0, 2)])); }
    table.appendChild(h("thead", null, [head]));
    var tbody = h("tbody"), row = h("tr");
    var first = new Date(y, m, 1), offset = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    for (var e = 0; e < offset; e++) row.appendChild(h("td"));
    var longFmt = new Intl.DateTimeFormat(locale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var tabbable = null;
    for (var d = 1; d <= days; d++) {
      var date = new Date(y, m, d), key = iso(date), ok = available(date);
      var selected = B.date && iso(B.date) === key;
      var btn = h("button", {
        type: "button", class: "day" + (+date === +today ? " today" : ""), "data-date": key,
        "aria-pressed": selected ? "true" : "false",
        "aria-label": longFmt.format(date) + (ok ? "" : " · " + tr(b.unavailable)), tabindex: "-1"
      }, [String(d)]);
      btn.disabled = !ok;
      if (ok && (selected || (!tabbable && !B.date))) tabbable = btn;
      if (selected) tabbable = btn;
      row.appendChild(h("td", null, [btn]));
      if ((offset + d) % 7 === 0) { tbody.appendChild(row); row = h("tr"); }
    }
    if (row.children.length) tbody.appendChild(row);
    table.appendChild(tbody); cal.appendChild(table);
    var firstOk = $$(".day:not(:disabled)", table)[0];
    (tabbable || firstOk || {}).tabIndex = 0;
    cal.appendChild(h("div", { class: "cal-legend", "aria-hidden": "true" }, [h("span", null, [tr(b.available)]), h("span", { class: "sel" }, [tr(b.selected)]), h("span", { class: "off" }, [tr(b.unavailable)])]));

    table.onclick = function (ev) {
      var t = ev.target.closest(".day"); if (!t || t.disabled) return;
      var p = t.getAttribute("data-date").split("-");
      B.date = new Date(+p[0], +p[1] - 1, +p[2]);
      setError("date", "");
      renderCalendar(t.getAttribute("data-date")); updateSummary();
    };
    table.onkeydown = function (ev) {
      var t = ev.target.closest(".day"); if (!t) return;
      var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[ev.key];
      if (!step) return;
      ev.preventDefault();
      var p = t.getAttribute("data-date").split("-"), nd = new Date(+p[0], +p[1] - 1, +p[2] + step);
      if (nd < new Date(minDate.getFullYear(), minDate.getMonth(), 1) || nd > maxDate) return;
      if (nd.getMonth() !== m) { B.view = new Date(nd.getFullYear(), nd.getMonth(), 1); renderCalendar(iso(nd)); }
      else focusDay(iso(nd));
    };
    if (focusIso) focusDay(focusIso);
  }
  function focusDay(key) {
    var el = $('.day[data-date="' + key + '"]'); if (!el) return;
    $$(".day").forEach(function (b) { b.tabIndex = -1; });
    el.tabIndex = 0; el.focus();
  }

  function renderGuideLang() {
    var seg = $("#guideLang"); seg.innerHTML = "";
    S.text.booking.languages.forEach(function (l, i) {
      var b = h("button", { type: "button", role: "radio", "aria-checked": B.guideLang === i ? "true" : "false", tabindex: B.guideLang === i ? "0" : "-1" }, [tr(l)]);
      b.onclick = function () { B.guideLang = i; renderGuideLang(); updateSummary(); seg.children[i].focus(); };
      b.onkeydown = function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); B.guideLang = 1 - B.guideLang; renderGuideLang(); updateSummary(); seg.children[B.guideLang].focus(); } };
      seg.appendChild(b);
    });
  }

  function setupSteppers() {
    $$(".stepper").forEach(function (st) {
      var field = st.getAttribute("data-field");
      $$(".step-btn", st).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var v = B[field] + (+btn.getAttribute("data-step"));
          var min = field === "adults" ? Math.max(1, TOUR.groupMin) : 0;
          if (v < min) return;
          if (B.adults + B.children + (+btn.getAttribute("data-step")) > TOUR.groupMax) { setError("group", tr(S.text.booking.errors.group).replace("{max}", TOUR.groupMax)); return; }
          B[field] = v; setError("group", ""); updateSummary();
        });
      });
    });
  }

  function groupTotal() {
    var child = TOUR.childPricePerPerson != null ? TOUR.childPricePerPerson : TOUR.pricePerPerson;
    return B.adults * TOUR.pricePerPerson + B.children * child;
  }
  function reference() {
    return B.date ? "BRB-" + iso(B.date).slice(2).replace(/-/g, "") + "-" + B.refTail : "BRB-" + B.refTail;
  }

  function updateSummary() {
    var b = S.text.booking;
    $$(".stepper").forEach(function (st) {
      var f = st.getAttribute("data-field");
      st.querySelector("output").textContent = B[f];
      var btns = st.querySelectorAll(".step-btn");
      btns[0].disabled = B[f] <= (f === "adults" ? Math.max(1, TOUR.groupMin) : 0);
      btns[1].disabled = B.adults + B.children >= TOUR.groupMax;
    });
    var dl = $("#summaryList"); dl.innerHTML = "";
    var dateTxt = B.date ? new Intl.DateTimeFormat(locale(), { weekday: "short", day: "numeric", month: "long", year: "numeric" }).format(B.date) : tr(b.noDate);
    var people = B.adults + " " + tr(b.adults).toLowerCase() + (B.children ? " + " + B.children + " " + tr(b.children).split(" (")[0].toLowerCase() : "");
    [["pin", S.tours[0].name, tr(TOUR.name)], ["calendar", b.date, dateTxt], ["users", S.text.facts.group, people],
     ["chat", b.language, tr(b.languages[B.guideLang])]].forEach(function (r) {
      dl.appendChild(h("div", null, [h("dt", null, [icon(r[0]), r[0] === "pin" ? tr(S.text.nav.tour) : tr(r[1])]), h("dd", null, [r[2]])]));
    });
    $("#summaryTotal").textContent = money(groupTotal());
    markTodo($("#summaryTotal"), TOUR.priceIsPlaceholder ? { todo: true } : null);
    $("#bookRef").textContent = reference();
  }

  function setError(field, msg) {
    var el = $("#err-" + field); if (el) el.textContent = msg;
    var input = $("#f-" + field); if (input) { input.classList.toggle("invalid", !!msg); input.setAttribute("aria-invalid", msg ? "true" : "false"); if (msg) input.setAttribute("aria-describedby", "err-" + field); }
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validate() {
    var e = S.text.booking.errors, ok = true, firstBad = null;
    var name = $("#f-name").value.trim(), email = $("#f-email").value.trim();
    if (!B.date) { setError("date", tr(e.date)); ok = false; firstBad = firstBad || $(".day[tabindex='0']"); }
    if (!name) { setError("name", tr(e.name)); ok = false; firstBad = firstBad || $("#f-name"); }
    if (!validEmail(email)) { setError("email", tr(e.email)); ok = false; firstBad = firstBad || $("#f-email"); }
    if (firstBad) firstBad.focus();
    return ok;
  }

  function requestText() {
    var b = S.text.booking, f = function (k) { return $("#f-" + k).value.trim(); };
    var dateTxt = B.date ? new Intl.DateTimeFormat(locale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(B.date) : "";
    return [
      tr(b.emailSubject) + " · " + reference(),
      "",
      tr(S.text.nav.tour) + ": " + tr(TOUR.name) + " (" + tr(TOUR.place) + ")",
      tr(b.date) + ": " + dateTxt + " (" + (B.date ? iso(B.date) : "") + ")",
      tr(b.adults) + ": " + B.adults,
      tr(b.children) + ": " + B.children,
      tr(b.language) + ": " + tr(b.languages[B.guideLang]),
      tr(b.total) + ": " + money(groupTotal()),
      "",
      tr(b.name) + ": " + f("name"),
      tr(b.email) + ": " + f("email"),
      tr(b.phone) + ": " + (f("phone") || "-"),
      "",
      tr(b.notes) + " " + (f("notes") || "-")
    ].join("\n");
  }

  function payload() {
    return { reference: reference(), tour: TOUR.id, date: B.date ? iso(B.date) : null, adults: B.adults, children: B.children,
      guideLanguage: ["en", "es"][B.guideLang], estimatedTotal: groupTotal(), currency: TOUR.currency,
      name: $("#f-name").value.trim(), email: $("#f-email").value.trim(), phone: $("#f-phone").value.trim(),
      notes: $("#f-notes").value.trim(), siteLanguage: lang };
  }

  function sendEmail() {
    var subject = tr(S.text.booking.emailSubject) + " " + reference() + " · " + (B.date ? iso(B.date) : "");
    location.href = "mailto:" + S.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(requestText());
    $("#sentNote").hidden = false;
  }

  function setupForm() {
    var form = $("#bookForm");
    ["name", "email"].forEach(function (k) {
      var input = $("#f-" + k);
      input.addEventListener("blur", function () {
        var v = input.value.trim(); if (!v) return;
        if (k === "email" && !validEmail(v)) setError("email", tr(S.text.booking.errors.email));
      });
      input.addEventListener("input", function () { setError(k, ""); });
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!validate()) return;
      var D = S.bookingDelivery || {};
      if (D.method === "endpoint" && D.endpointUrl) {
        fetch(D.endpointUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload()) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); $("#sentNote").hidden = false; })
          .catch(sendEmail);
      } else {
        sendEmail();
      }
      document.dispatchEvent(new CustomEvent("booking:request", { detail: payload() }));
    });
    $("#waBtn").addEventListener("click", function () {
      if (!validate()) return;
      window.open("https://wa.me/" + S.contact.phoneInternational.replace(/\D/g, "") + "?text=" + encodeURIComponent(requestText()), "_blank", "noopener");
    });
  }

  /* =================================================================
     MOTION: reveal, trail, parallax, header
     ================================================================= */
  function setupReveal() {
    var items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("in"); countUp(el); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); countUp(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
  function countUp(root) {
    var box = root.querySelector && root.querySelector(".impact"); if (!box || box.dataset.done) return;
    box.dataset.done = "1";
    var sep = lang === "es" ? "." : ",";
    function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep); }
    box.querySelectorAll(".count").forEach(function (el) {
      var v = +el.dataset.value;
      if (reduceMotion) { el.textContent = fmt(v); return; }
      var t0 = null;
      (function step(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 1600); el.textContent = fmt(Math.round(v * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); })(performance.now());
    });
  }

  function setupScroll() {
    var header = $(".site-header"), lastY = window.scrollY, ticking = false;
    var trail = $(".trail"), fill = $("#trailFill");
    var navLinks = $$(".main-nav a"), sections = navLinks.map(function (a) { return $(a.getAttribute("href")); });
    function frame() {
      ticking = false;
      var y = window.scrollY, vh = window.innerHeight;
      header.classList.toggle("solid", y > 40);
      header.classList.toggle("hide", y > vh && y > lastY + 4 && !$("#mainNav").classList.contains("open"));
      if (y < lastY - 4) header.classList.remove("hide");
      lastY = y;
      // trail progress
      var r = trail.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / (r.height - parseFloat(getComputedStyle(trail).paddingBottom))));
      fill.style.height = (p * 100) + "%";
      $$(".stop").forEach(function (s) { var sr = s.getBoundingClientRect(); s.classList.toggle("active", sr.top < vh * 0.55 && sr.bottom > vh * 0.2); });
      // parallax
      if (!reduceMotion) $$(".parallax").forEach(function (el) {
        var b = el.parentNode.getBoundingClientRect(); if (b.bottom < 0 || b.top > vh) return;
        var off = (b.top + b.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
        el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
      });
      // active nav
      var current = -1;
      sections.forEach(function (sec, i) { if (sec && sec.getBoundingClientRect().top < vh * 0.4) current = i; });
      navLinks.forEach(function (a, i) { a.classList.toggle("active", i === current); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    window.addEventListener("resize", frame);
    frame();
  }

  function setupUI() {
    var menu = $("#menuBtn"), nav = $("#mainNav");
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", open);
    });
    $$("#mainNav a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); menu.focus(); } });
    function toggleLang() {
      lang = lang === "en" ? "es" : "en";
      try { localStorage.setItem("wwn-lang", lang); } catch (e) {}
      renderAll(true);
    }
    $("#langToggle").addEventListener("click", toggleLang);
    $$("[data-lang-toggle]").forEach(function (b) { b.addEventListener("click", toggleLang); });
    // light that follows the pointer on primary buttons
    document.addEventListener("pointermove", function (e) {
      var b = e.target.closest && e.target.closest(".btn-primary"); if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty("--mx", (e.clientX - r.left) + "px"); b.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---------------- Boot ---------------- */
  function renderAll(again) {
    renderStatic(); renderFacts(); renderRibbon(); renderStops(); renderPartners(); renderLogistics(); renderLogos();
    renderCalendar(); renderGuideLang(); updateSummary();
    if (again) { $$(".reveal").forEach(function (el) { el.classList.add("in"); countUp(el); }); }
    if (again) { $("#scene").setAttribute("aria-label", tr(S.PHOTOS[(S.heroScene || {}).photo || "parkLandscape"].alt)); }
  }
  renderContact();
  renderAll(false);
  setupHero(); fireflies(); setupSteppers(); setupForm(); setupReveal(); setupScroll(); setupUI();
})();
