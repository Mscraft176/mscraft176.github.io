(() => {
  "use strict";
  const content = window.SITE_CONTENT || {};
  const profile = content.profile || {};
  const translations = {
    en: {
      skip: "Skip to content", homepage: "Personal homepage", about: "About", research: "Research",
      publications: "Publications", notes: "Notes", contact: "Contact", explore: "Explore my research",
      cv: "Curriculum vitae", welcome: "A space for thinking & sharing.", scroll: "Scroll to discover",
      aboutAside: "A brief introduction.", researchAside: "Questions I keep returning to.",
      publicationsAside: "Papers & preprints.", notesAside: "Ideas, one page at a time.",
      education: "Education", news: "Recent updates", backToTop: "Back to top", role: "Position",
      affiliation: "Affiliation", department: "Department", location: "Location", email: "Email",
      pending: "To be added", papersEmpty: "Publications coming soon",
      papersHint: "Papers, preprints, and related materials will appear here.",
      notesEmpty: "Notes & expositions", notesHint: "Reading notes and longer-form ideas will appear here.",
      projectsEmpty: "Projects & resources", projectsHint: "A place for code, materials, and useful connections.",
      comingSoon: "Coming soon", more: "Learn more", read: "Read", updated: "Last updated",
      contactEmpty: "Contact details will be added soon.", openMenu: "Open menu", closeMenu: "Close menu"
    }
  };
  const language = "en";
  const byId = id => document.getElementById(id);
  const local = value => {
    if (value == null) return "";
    if (typeof value === "object") return String(value[language] || value.en || value.zh || "");
    return String(value);
  };
  const escape = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  const text = value => escape(local(value));
  // Accept normal web/email links and relative file paths; reject executable schemes.
  const safeUrl = value => {
    const url = String(value || "").trim();
    if (!url || /[\x00-\x20\\]/.test(url)) return "";
    if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//")) return "";
    return url;
  };
  const anchor = (label, url, className = "text-link") => {
    const href = safeUrl(url);
    if (!href) return "";
    const external = /^https?:\/\//i.test(href);
    return `<a class="${className}" href="${escape(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text(label)}<span aria-hidden="true">↗</span></a>`;
  };
  const items = value => Array.isArray(value) ? value : [];
  function setMenu(open) {
    byId("navigation").classList.toggle("is-open", open);
    byId("menu-toggle").setAttribute("aria-expanded", String(open));
    byId("menu-toggle").setAttribute("aria-label", translations[language][open ? "closeMenu" : "openMenu"]);
  }
  function render() {
    const t = translations[language];
    document.documentElement.lang = "en";
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = t[element.dataset.i18n]; });
    const name = local(profile.name) || "Your Name";
    byId("site-name").textContent = local(profile.shortName) || name;
    byId("hero-name").textContent = name;
    byId("footer-name").textContent = name;
    byId("hero-tagline").textContent = local(profile.tagline);
    byId("hero-affiliation").textContent = local(profile.affiliation);
    byId("hero-affiliation").hidden = !local(profile.affiliation);
    document.title = `${name} — ${t.homepage}`;
    document.querySelector('meta[name="description"]').content = local(profile.description) || t.homepage;
    const cvUrl = safeUrl(profile.cv);
    byId("cv-link").hidden = !cvUrl;
    if (cvUrl) byId("cv-link").href = cvUrl;
    const portraitUrl = safeUrl(profile.portrait);
    const portrait = byId("portrait");
    portrait.hidden = !portraitUrl;
    byId("hero-art").hidden = Boolean(portraitUrl);
    if (portraitUrl) {
      portrait.onerror = () => { portrait.hidden = true; byId("hero-art").hidden = false; };
      portrait.alt = name;
      if (portrait.getAttribute("src") !== portraitUrl) portrait.src = portraitUrl;
    }
    byId("about-content").innerHTML = items(content.about).map(paragraph => `<p>${text(paragraph)}</p>`).join("");
    byId("profile-details").innerHTML = ["role", "affiliation", "department", "location"]
      .filter(key => local(profile[key])).map(key => `<div><dt>${t[key]}</dt><dd>${text(profile[key])}</dd></div>`).join("");
    byId("research-list").innerHTML = items(content.research).map((item, index) => `<article class="research-item"><span class="item-number">${String(index + 1).padStart(2, "0")}</span><h3>${text(item.title)}</h3><p>${text(item.description)}</p>${items(item.tags).length ? `<div class="tag-list">${items(item.tags).map(tag => `<span class="tag">${text(tag)}</span>`).join("")}</div>` : ""}${item.url ? `<div class="item-link">${anchor(t.more, item.url)}</div>` : ""}</article>`).join("");
    if (!items(content.research).length) byId("research-list").innerHTML = `<p class="contact-empty">${t.comingSoon}</p>`;
    const hasPublications = items(content.publications).length > 0;
    byId("publications").hidden = !hasPublications;
    byId("navigation").querySelector('a[href="#publications"]').hidden = !hasPublications;
    document.querySelectorAll("main .section:not([hidden])").forEach((section, index) => {
      section.querySelector(".section-index").textContent = `${String(index + 1).padStart(2, "0")} /`;
    });
    byId("publication-list").innerHTML = items(content.publications).length
      ? items(content.publications).map(paper => `<article class="publication"><div class="publication-year">${text(paper.year)}</div><div><h3>${text(paper.title)}</h3>${paper.authors ? `<p>${text(paper.authors)}</p>` : ""}${paper.venue || paper.status ? `<p>${text(paper.venue)}${paper.status ? `<span class="status">${text(paper.status)}</span>` : ""}</p>` : ""}<div class="publication-links">${items(paper.links).map(link => anchor(link.label, link.url)).join("")}</div></div></article>`).join("")
      : `<div class="empty-publications"><span class="empty-symbol" aria-hidden="true">≡</span><div><h3>${t.papersEmpty}</h3><p>${t.papersHint}</p></div></div>`;
    byId("notes-list").innerHTML = items(content.notes).length
      ? items(content.notes).map(note => `<article class="note"><p class="note-meta"><span>${text(note.type)}</span><span>${text(note.date)}</span></p><h3>${text(note.title)}</h3><p>${text(note.description)}</p>${safeUrl(note.url) ? `<div class="item-link">${anchor(t.read, note.url)}</div>` : ""}</article>`).join("")
      : [ [t.notesEmpty, t.notesHint], [t.projectsEmpty, t.projectsHint] ].map(([title, description]) => `<article class="note"><p class="note-meta">${t.comingSoon}</p><h3>${title}</h3><p>${description}</p></article>`).join("");
    byId("education-block").hidden = !items(content.education).length;
    byId("education-list").innerHTML = items(content.education).map(item => `<div class="timeline-row"><span class="date">${text(item.period)}</span><div><p>${text(item.institution)}</p><p class="timeline-secondary">${text(item.degree)}</p></div></div>`).join("");
    byId("news-block").hidden = !items(content.news).length;
    byId("news-list").innerHTML = items(content.news).map(item => `<div class="timeline-row"><span class="date">${text(item.date)}</span><p>${safeUrl(item.url) ? anchor(item.text, item.url) : text(item.text)}</p></div>`).join("");
    byId("contact-message").textContent = local(content.contactMessage);
    const email = String(profile.email || "").trim();
    const emailLink = email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? anchor(email, `mailto:${encodeURIComponent(email)}`, "contact-link") : "";
    const contactLinks = emailLink + items(content.links).map(link => anchor(link.label, link.url, "contact-link")).join("");
    byId("contact-links").innerHTML = contactLinks || `<p class="contact-empty">${t.contactEmpty}</p>`;
    byId("current-year").textContent = String(new Date().getFullYear());
    byId("last-updated").hidden = !local(content.lastUpdated);
    byId("last-updated").textContent = `${t.updated}: ${local(content.lastUpdated)}`;
    byId("navigation").setAttribute("aria-label", "Main navigation");
    document.querySelector(".wordmark").setAttribute("aria-label", "Home");
    setMenu(false);
  }
  byId("menu-toggle").addEventListener("click", () => setMenu(byId("menu-toggle").getAttribute("aria-expanded") !== "true"));
  byId("navigation").querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => { if (event.key === "Escape") setMenu(false); });
  const mobile = window.matchMedia("(max-width: 760px)");
  if (mobile.addEventListener) mobile.addEventListener("change", () => setMenu(false));
  render();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        byId("navigation").querySelectorAll("a").forEach(link => {
          if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    document.querySelectorAll("main section").forEach(section => observer.observe(section));
  }
})();
