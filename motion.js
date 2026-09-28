/*
 * motion.js — scroll-driven animation for the portfolio, built on GSAP +
 * ScrollTrigger, with Lenis for smooth scrolling.
 *
 * Design rules, in priority order:
 *
 *  1. Content is NEVER hidden by CSS. Every entrance uses gsap.from(), which
 *     animates from a synthetic start state to the element's natural state.
 *     If GSAP fails to load, or this file throws, the page renders complete
 *     and static. There is no "stuck invisible" failure mode by construction.
 *  2. prefers-reduced-motion disables everything: no Lenis, no ScrollTriggers,
 *     no transforms. The page is simply static.
 *  3. The app is React and re-renders on route change, so all triggers are
 *     tracked and torn down before each rebuild. Nothing leaks between pages.
 */
(function () {
  "use strict";

  var root = document.getElementById("root");
  if (!root) return;

  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  var EASE = "power3.out";

  // No smooth-scroll library. Lenis was trialled and removed: with it mounted,
  // wheel input produced no scroll movement at all in testing while the End key
  // still worked, i.e. it swallowed the wheel without applying its own scroll.
  // A portfolio that might not scroll by mouse wheel is not worth a cosmetic
  // easing curve, so this runs on native scroll. ScrollTrigger handles that
  // natively; the listener below is belt-and-braces for programmatic jumps.
  try {
    window.addEventListener("scroll", function () { ScrollTrigger.update(); }, { passive: true });
  } catch (e) {}

  // ── Teardown ──────────────────────────────────────────────────────────────
  // Track the tweens, not just their triggers. Killing a trigger mid-tween
  // strands its target at whatever opacity it had reached, and the rebuilt
  // once:true trigger cannot re-fire if the element is already scrolled past.
  // So every teardown first jumps each tween to its end state, which is the
  // element's natural appearance, and only then kills it.
  var tweens = [];
  function teardown() {
    for (var i = 0; i < tweens.length; i++) {
      try {
        tweens[i].progress(1, false);
        if (tweens[i].scrollTrigger) tweens[i].scrollTrigger.kill();
        tweens[i].kill();
      } catch (e) {}
    }
    tweens = [];
    // Anything pre-hidden but never reached by its trigger is restored here,
    // so a route change can never leave an off-screen element stuck at zero.
    for (var j = 0; j < prehidden.length; j++) {
      try { gsap.set(prehidden[j], { clearProps: "opacity,transform" }); } catch (e) {}
    }
    prehidden = [];
  }
  function track(tween) {
    if (tween) tweens.push(tween);
    return tween;
  }

  // ── Entrance helper ───────────────────────────────────────────────────────
  // Two cases, because one size does not fit both:
  //
  //   Already on screen -> animate straight away with gsap.from(). Nothing is
  //     pre-hidden, so there is no flash and no dependency on a trigger.
  //   Below the fold    -> pre-hide with gsap.set(), then animate TO the
  //     natural state when it scrolls in. Pre-hiding off-screen is invisible
  //     to the viewer, which is what removes the snap-to-zero flash you get
  //     from immediateRender:false.
  //
  // Everything pre-hidden is recorded so teardown can restore it. That keeps
  // the guarantee: content is never left invisible.
  var prehidden = [];

  // Elements already given an entrance this build. Without this, a card DIV
  // and the H3 inside it both get their own tween and their own trigger; if
  // the parent's fires and the child's does not, the heading sits at opacity
  // 0 inside a visible card. Claiming an element also claims its subtree.
  var claimed = [];
  function isClaimed(el) {
    for (var i = 0; i < claimed.length; i++) {
      if (claimed[i] === el || claimed[i].contains(el)) return true;
    }
    return false;
  }

  function entrance(targets, opts) {
    var els = Array.prototype.slice.call(targets || []).filter(Boolean).filter(function (el) {
      return !isClaimed(el);
    });
    if (!els.length) return;
    els.forEach(function (el) { claimed.push(el); });
    opts = opts || {};
    var from = { opacity: 0, y: opts.y == null ? 26 : opts.y };
    var dur = opts.duration || 0.7;
    var stagger = opts.stagger == null ? Math.min(0.08, 0.5 / els.length) : opts.stagger;
    var trigger = opts.trigger || null;
    var start = opts.start || "top 90%";

    var fold = window.innerHeight * 0.94;
    var onscreen = [], below = [];
    els.forEach(function (el) {
      (el.getBoundingClientRect().top > fold ? below : onscreen).push(el);
    });

    if (onscreen.length) {
      track(gsap.from(onscreen, { opacity: 0, y: from.y, duration: dur, ease: EASE, stagger: stagger }));
    }
    if (below.length) {
      gsap.set(below, from);
      below.forEach(function (el) { if (prehidden.indexOf(el) === -1) prehidden.push(el); });
      track(
        gsap.to(below, {
          opacity: 1,
          y: 0,
          duration: dur,
          ease: EASE,
          stagger: stagger,
          scrollTrigger: { trigger: trigger || below[0], start: start, once: true },
        })
      );
    }
  }

  // ── Individual behaviors ──────────────────────────────────────────────────

  // Hero: the plate drifts up more slowly than the page, and dims slightly, so
  // the band gains depth as you leave it.
  function heroParallax() {
    var plate = root.querySelector(".sd-hero-img");
    var hero = root.querySelector(".sd-hero");
    if (!plate || !hero) return;
    gsap.set(plate, { scale: 1.12, transformOrigin: "50% 50%" });
    track(
      gsap.to(plate, {
        yPercent: 14,
        scale: 1.02,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
      })
    );
  }

  // Hero type: eyebrow then headline, once, on arrival.
  function heroIntro() {
    var eyebrow = root.querySelector(".sd-hero-eyebrow");
    var line = root.querySelector(".sd-hero-line");
    if (!line) return;
    var tl = gsap.timeline();
    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 14, duration: 0.6, ease: EASE }, 0.15);
    tl.from(line, { opacity: 0, y: 22, duration: 0.85, ease: EASE }, 0.28);
  }

  // Section headings wipe in behind a mask rather than just fading.
  function headings() {
    var hs = root.querySelectorAll("h1, h2:not(.sd-hero-line), h3");
    hs.forEach(function (h) {
      entrance([h], { y: 18, stagger: 0, trigger: h, start: "top 94%" });
    });
  }

  // Rows and cards: staggered entrance per group, so a list cascades.
  function groups() {
    var sections = root.querySelectorAll("section");
    sections.forEach(function (sec) {
      var kids = Array.prototype.slice.call(sec.children).filter(function (el) {
        return !/^H[1-6]$/.test(el.tagName);
      });
      // A section whose body is a single grid: animate the grid's children.
      if (kids.length === 1 && kids[0].children.length > 1) {
        kids = Array.prototype.slice.call(kids[0].children);
      }
      if (!kids.length) return;
      entrance(kids, { y: 26, trigger: sec, start: "top 92%" });
    });
  }

  // The CV timeline rail draws downward as the section scrolls past.
  function timeline() {
    var rows = root.querySelectorAll(".sd-tl-row");
    if (!rows.length) return;
    rows.forEach(function (row) {
      var rail = row.querySelector('[aria-hidden="true"] > span:first-child');
      var dot = row.querySelector(".sd-tl-dot");
      if (rail) {
        gsap.set(rail, { transformOrigin: "50% 0%" });
        track(
          gsap.from(rail, {
            scaleY: 0,
            duration: 0.6,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: row, start: "top 95%", once: true },
          })
        );
      }
      if (dot) {
        track(
          gsap.from(dot, {
            scale: 0,
            duration: 0.45,
            ease: "back.out(2.2)",
            immediateRender: false,
            scrollTrigger: { trigger: row, start: "top 95%", once: true },
          })
        );
      }
    });
  }

  // Counters in the stats band count up once, in view.
  function counters() {
    var nums = root.querySelectorAll("[data-count]");
    nums.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) return;
      var suffix = el.getAttribute("data-suffix") || "";
      if (!el.firstChild || el.firstChild.nodeType !== 3) el.textContent = "0";
      var node = el.firstChild;
      var obj = { v: 0 };
      track(
        gsap.to(obj, {
          v: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          // Write through the existing text node. Assigning el.textContent
          // replaces the node, which is a childList mutation, which wakes the
          // MutationObserver below ~60 times a second and makes it rebuild
          // every trigger mid-scroll. characterData changes are not observed.
          onUpdate: function () {
            node.nodeValue = Math.round(obj.v).toLocaleString() + suffix;
          },
          onComplete: function () {
            node.nodeValue = target.toLocaleString() + suffix;
          },
        })
      );
    });
  }

  // Project cards lift slightly toward the pointer's side. Cheap, no layout.
  function cardTilt() {
    var cards = root.querySelectorAll(".proj-card");
    cards.forEach(function (card) {
      if (card.__tilt) return;
      card.__tilt = true;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        gsap.to(card, { rotateY: dx * 2.2, duration: 0.5, ease: "power2.out", transformPerspective: 900 });
      });
      card.addEventListener("pointerleave", function () {
        gsap.to(card, { rotateY: 0, duration: 0.6, ease: "power2.out" });
      });
    });
  }

  // The nav gains a hairline shadow once the page has moved.
  function navShade() {
    var nav = document.querySelector("nav");
    if (!nav) return;
    track(
      gsap.to(nav, {
        boxShadow: "0 1px 18px rgba(0,0,0,0.07)",
        duration: 0.3,
        scrollTrigger: { trigger: document.body, start: "top -40", toggleActions: "play none none reverse" },
      })
    );
  }

  // ── Orchestration ─────────────────────────────────────────────────────────
  var firstRun = true;
  function build() {
    try {
      teardown();
      claimed = [];
      if (firstRun) { heroIntro(); firstRun = false; }
      heroParallax();
      // Order matters: groups() claims section bodies (cards, rows) first, so
      // headings() then only animates the section-level headings left over.
      groups();
      headings();
      timeline();
      counters();
      cardTilt();
      navShade();
      ScrollTrigger.refresh();
    } catch (e) {
      // Any failure leaves the page in its natural, fully visible state.
      teardown();
    }
  }

  // Re-arm on route change. React swaps the whole page body, so debounce to a
  // frame and rebuild once the new tree has settled.
  var pending = null;
  var lastPage = "";
  function schedule() {
    if (pending) clearTimeout(pending);
    pending = setTimeout(function () {
      pending = null;
      // Only treat this as a route change if the page content actually
      // changed. Rebuilding (and jumping to the top) on every incidental
      // mutation fights the visitor's own scrolling.
      var sig = (root.textContent || "").slice(0, 120);
      var routeChanged = sig !== lastPage;
      lastPage = sig;
      build();
      if (routeChanged) window.scrollTo(0, 0);
    }, 120);
  }

  try {
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { schedule(); return; }
      }
    }).observe(root, { childList: true, subtree: true });
  } catch (e) {}

  if (document.readyState === "complete") build();
  else window.addEventListener("load", build);
})();
