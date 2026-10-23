/* ==========================================================================
   Stagstone Protection — site script
   --------------------------------------------------------------------------
   EDIT HERE: contact details, navigation and site-wide settings.
   Every page picks these up automatically (header, footer, contact links).
   ========================================================================== */
const SITE = {
  company: "Stagstone Protection Ltd",
  shortName: "Stagstone",
  tagline: "Discreet protective security and estate support for private clients.",
  phone: "", // leave blank to hide the phone number across the site

  email: "scott@stagstoneprotection.com",
  website: "stagstoneprotection.com",

  // Shown in the footer. Add the registered company number and office once confirmed.
  companyNumber: "",
  registeredOffice: "",

  // Optional: paste a form endpoint (e.g. Formspree) to send enquiries without opening
  // the visitor's email app. Leave blank to use a pre-filled email instead.
  formEndpoint: "",

  // Set to false before going live to remove the "Preview" badge.
  preview: true,

  nav: [
    { id: "home", label: "Home", href: "" },
    { id: "experience", label: "Experience", href: "experience/" },
    { id: "estate", label: "Estate Management", href: "estate-management/" },
    { id: "rst-cpo", label: "RST & CPO", href: "rst-cpo/" },
    { id: "about", label: "About", href: "about/" },
    { id: "contact", label: "Contact", href: "contact/" },
  ],
};

/* ---------- Nothing below normally needs editing ---------- */
(function () {
  const doc = document.documentElement;
  doc.classList.add("js");
  const root = doc.dataset.root || "";
  const page = doc.dataset.page || "";
  const telHref = "tel:" + SITE.phone.replace(/[^\d+]/g, "");
  const year = new Date().getFullYear();

  const arrow = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5"/></svg>';
  const brand = (extraClass) => `
    <a class="brand ${extraClass || ""}" href="${root || "./"}" aria-label="${SITE.company} — home">
      <img class="brand__mark" src="${root}assets/img/stagstone-mark-light.png" alt="" width="210" height="258">
      <span class="brand__text"><span class="brand__name">STAGSTONE</span><span class="brand__sub">PROTECTION</span></span>
    </a>`;

  const navItems = SITE.nav
    .map((n) => `<li><a href="${root}${n.href || ""}"${n.id === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`)
    .join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="site-header__inner">
      ${brand()}
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span><span class="visually-hidden">Menu</span>
      </button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main">
        <ul>${navItems}</ul>
      </nav>
    </div>`;
  document.body.prepend(header);

  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "Skip to content";
  document.body.prepend(skip);

  const legalBits = [SITE.company];
  if (SITE.companyNumber) legalBits.push("Company No. " + SITE.companyNumber);
  if (SITE.registeredOffice) legalBits.push("Registered office: " + SITE.registeredOffice);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          ${brand()}
          <p>${SITE.tagline} Every enquiry is handled in confidence.</p>
        </div>
        <div>
          <span class="footer-title">Explore</span>
          <ul class="footer-links">${SITE.nav.map((n) => `<li><a href="${root}${n.href}">${n.label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <span class="footer-title">Contact</span>
          <ul class="footer-links">
            ${SITE.phone ? `<li><a href="${telHref}">${SITE.phone}</a></li>` : ""}
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="${root}contact/">Arrange a confidential conversation</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-legal">&copy; ${year} ${legalBits.join(" · ")}. References to Royal protection describe the professional experience of our founder; ${SITE.company} is an independent company and is not endorsed by, or affiliated with, the Royal Household.</p>
        <p><a href="${root}privacy/">Privacy notice</a></p>
      </div>
    </div>`;
  document.body.append(footer);

  if (SITE.preview) {
    const badge = document.createElement("div");
    badge.className = "preview-badge";
    badge.textContent = "Preview — for review";
    document.body.append(badge);
  }

  // Contact bindings: <a data-contact="phone|email"></a>
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const type = el.dataset.contact;
    if (type === "phone") {
      if (!SITE.phone) { (el.closest("li") || el).remove(); return; }
      el.href = telHref; el.textContent = SITE.phone;
    }
    if (type === "email") { el.href = "mailto:" + SITE.email; el.textContent = SITE.email; }
    if (type === "website") { el.href = "https://" + SITE.website; el.textContent = SITE.website; }
  });

  // Inject arrow icons into buttons: <a class="btn"><span class="btn__label">..</span></a>
  document.querySelectorAll(".btn").forEach((btn) => {
    if (!btn.querySelector(".btn__icon")) btn.insertAdjacentHTML("beforeend", `<span class="btn__icon" aria-hidden="true">${arrow}</span>`);
  });
  document.querySelectorAll(".link-arrow").forEach((l) => {
    if (!l.querySelector("svg")) l.insertAdjacentHTML("beforeend", arrow);
  });

  // Header state on scroll
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile navigation
  const toggle = header.querySelector(".nav-toggle");
  const setNav = (open) => {
    doc.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setNav(!doc.classList.contains("nav-open")));
  header.querySelectorAll(".primary-nav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  // Reveal on scroll + count-up stats
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const countUp = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  // Enquiry form
  const form = document.querySelector("[data-enquiry-form]");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get("company_website")) return; // spam trap
      if (SITE.formEndpoint) {
        status.textContent = "Sending…";
        try {
          const res = await fetch(SITE.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error();
          form.reset();
          status.textContent = "Thank you. Your enquiry has been received and we will be in touch shortly.";
        } catch {
          status.textContent = "Sorry, something went wrong. Please email " + SITE.email + (SITE.phone ? " or call " + SITE.phone : "") + ".";
        }
        return;
      }
      const body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Phone: " + (data.get("phone") || "—"),
        "Preferred contact: " + data.get("preferred"),
        "Enquiry: " + data.get("topic"),
        "",
        data.get("message"),
      ].join("\n");
      const subject = "Confidential enquiry — " + data.get("topic");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should now open with your message ready to send.";
    });
  }
})();
