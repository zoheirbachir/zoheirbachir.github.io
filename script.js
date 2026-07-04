(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Project filtering
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".projects-grid .card");

  function applyFilter(value) {
    cards.forEach(function (card) {
      var match = value === "all" || card.getAttribute("data-category") === value;
      card.style.display = match ? "" : "none";
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".section-head, .card, .skill-group, .tl-item, .contact-link, .hero-actions");
  revealEls.forEach(function (el, i) {
    el.classList.add("reveal");
    if (el.classList.contains("card")) {
      el.style.setProperty("--delay", (i % 3) * 0.06 + "s");
    }
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
