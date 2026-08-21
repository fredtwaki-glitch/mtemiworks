/**
 * MTEMI SWIFT RIDES — SHARED SITE BEHAVIOR
 * Runs on every page. Depends on config.js being loaded first.
 */
(function () {
  const cfg = window.MTEMI_CONFIG || {};
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Populate configurable contact / social values ---------- */
  document.querySelectorAll("[data-cfg-phone]").forEach((el) => (el.textContent = cfg.contact?.phone || "[PHONE NUMBER]"));
  document.querySelectorAll("[data-cfg-phone-href]").forEach((el) => (el.href = `tel:${cfg.contact?.phoneHref || (cfg.contact?.phone || "").replace(/[^\d+]/g, "")}`));
  document.querySelectorAll("[data-cfg-whatsapp]").forEach((el) => (el.textContent = cfg.contact?.whatsapp || "[WHATSAPP NUMBER]"));
  document.querySelectorAll("[data-cfg-email]").forEach((el) => (el.textContent = cfg.contact?.email || "[EMAIL ADDRESS]"));
  document.querySelectorAll("[data-cfg-email-href]").forEach((el) => (el.href = `mailto:${cfg.contact?.email || ""}`));
  document.querySelectorAll("[data-cfg-location]").forEach((el) => (el.textContent = cfg.contact?.location || "Nakuru, Kenya"));
  document.querySelectorAll("[data-cfg-area]").forEach((el) => (el.textContent = cfg.contact?.operatingArea || "Kenya & Beyond"));
  document.querySelectorAll("[data-cfg-ceo-name]").forEach((el) => (el.textContent = cfg.ceo?.name || "[CEO/Founder Name]"));
  document.querySelectorAll("[data-cfg-ig]").forEach((el) => (el.href = cfg.social?.instagram || "#"));
  document.querySelectorAll("[data-cfg-fb]").forEach((el) => (el.href = cfg.social?.facebook || "#"));
  document.querySelectorAll("[data-cfg-tiktok]").forEach((el) => (el.href = cfg.social?.tiktok || "#"));
  document.querySelectorAll("[data-cfg-yt]").forEach((el) => (el.href = cfg.social?.youtube || "#"));

  function buildWhatsAppLink(message) {
    let number = (cfg.contact?.whatsappIntl || cfg.contact?.whatsapp || "").replace(/[^\d]/g, "");
    if (number.startsWith("0")) number = "254" + number.slice(1); // convert Kenyan local format to intl
    const text = encodeURIComponent(message || cfg.whatsapp?.baseMessage || "Hi Mtemi Swift Rides, I'd like to enquire about a ride.");
    return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
  }
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.href = buildWhatsAppLink(el.getAttribute("data-whatsapp-message"));
    el.target = "_blank";
    el.rel = "noopener";
  });
  window.MTEMI_buildWhatsAppLink = buildWhatsAppLink;

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".navbar-toggle");
  const links = document.querySelector(".navbar-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Active nav link ---------- */
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar-links a[href]").forEach((a) => {
    const href = a.getAttribute("href").toLowerCase();
    if (href === current || (current === "" && href === "index.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Roadline scroll progress (signature element) ---------- */
  const roadProgress = document.querySelector(".roadline-progress");
  if (roadProgress && !prefersReduced) {
    const updateRoad = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      roadProgress.style.height = pct + "%";
    };
    document.addEventListener("scroll", updateRoad, { passive: true });
    updateRoad();
  } else if (roadProgress) {
    roadProgress.style.height = "100%";
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      document.querySelectorAll(".accordion-item").forEach((other) => {
        other.setAttribute("data-open", "false");
        other.querySelector(".accordion-panel").style.maxHeight = null;
        other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.setAttribute("data-open", "true");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
