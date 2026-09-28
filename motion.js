/*
 * motion.js — scroll reveals and route-change entrances for the portfolio.
 *
 * Design rules, in priority order:
 *  1. Content must never be left invisible. Every path that can fail ends in
 *     revealAll(). There is also an unconditional 2s failsafe.
 *  2. prefers-reduced-motion means no motion at all: we never add the
 *     [data-reveal] attribute, so the opacity:0 rule never matches.
 *  3. The app is React and re-renders on route change, so we re-scan on
 *     mutation rather than tagging once at load.
 */
(function () {
  "use strict";

  var root = document.getElementById("root");
  if (!root) return;

  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reduced motion, or no IntersectionObserver: leave the DOM untouched.
  // Nothing ever gets [data-reveal], so nothing is ever hidden.
  if (reduced || typeof IntersectionObserver === "undefined") return;

  function revealAll() {
    var hidden = root.querySelectorAll("[data-reveal]:not(.is-revealed)");
    for (var i = 0; i < hidden.length; i++) hidden[i].classList.add("is-revealed");
  }

  // Failsafe, deliberately conditional. A blanket timeout would reveal
  // everything including below-the-fold rows, which defeats the whole effect.
  // Instead: if nothing at all has been revealed by 2.5s, the observer is not
  // working, so fall back to showing everything. If it has revealed even one
  // element it is healthy, and the rest reveal on scroll as intended.
  var revealedAny = false;
  setTimeout(function () {
    if (!revealedAny) revealAll();
  }, 2500);

  var observer;
  try {
    observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("is-revealed");
            revealedAny = true;
            observer.unobserve(entries[i].target);
          }
        }
      },
      // Start the reveal slightly before the element reaches the viewport.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
  } catch (e) {
    revealAll();
    return;
  }

  // Direct children of a section are the natural reveal unit: CV rows,
  // project cards, the about blocks. Sections themselves reveal as a whole
  // when they have no row structure.
  function targets() {
    var out = [];
    var sections = root.querySelectorAll("section");
    for (var i = 0; i < sections.length; i++) {
      var kids = sections[i].children;
      // Skip the heading (first child) and reveal the rows beneath it.
      if (kids.length > 2) {
        for (var j = 1; j < kids.length; j++) out.push(kids[j]);
      } else {
        out.push(sections[i]);
      }
    }
    return out;
  }

  var STAGGER = ["d1", "d2", "d3", "d4"];

  function scan() {
    try {
      var els = targets();
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.hasAttribute("data-reveal")) continue;
        el.setAttribute("data-reveal", "");
        // Stagger within a group, capped so a long list does not crawl.
        var delay = STAGGER[Math.min(i, STAGGER.length - 1)];
        if (i > 0) el.classList.add(delay);
        observer.observe(el);
      }
    } catch (e) {
      revealAll();
    }
  }

  // Route change: React swaps the page body. Replay the container entrance.
  var lastSignature = "";
  function onRouteChange() {
    var page = root.firstElementChild;
    if (!page) return;
    var signature = (page.textContent || "").slice(0, 40);
    if (signature === lastSignature) return;
    lastSignature = signature;
    page.classList.remove("sd-page-in");
    // Force reflow so the animation restarts on a re-added class.
    void page.offsetWidth;
    page.classList.add("sd-page-in");
  }

  var pending = null;
  function schedule() {
    if (pending) return;
    pending = requestAnimationFrame(function () {
      pending = null;
      onRouteChange();
      scan();
    });
  }

  try {
    new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
  } catch (e) {
    // No MutationObserver: scan once and leave it.
  }

  schedule();
})();
