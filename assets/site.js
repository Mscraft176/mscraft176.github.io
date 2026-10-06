(() => {
  "use strict";
  const content = window.SITE_CONTENT || {};
  const profile = content.profile || {};
  const byId = id => document.getElementById(id);
  const items = value => Array.isArray(value) ? value : [];
  const escape = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
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
    return `<a class="${className}" href="${escape(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escape(label)}<span aria-hidden="true">↗</span></a>`;
  };
  function setMenu(open) {
    byId("navigation").classList.toggle("is-open", open);
    byId("menu-toggle").setAttribute("aria-expanded", String(open));
    byId("menu-toggle").setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  function render() {
    const name = String(profile.name || "Panhuan Shi");
    byId("site-name").textContent = profile.shortName || name;
    byId("hero-name").textContent = name;
    byId("footer-name").textContent = name;
    document.title = name;
    document.querySelector('meta[name="description"]').content = profile.description || name;
    const cvUrl = safeUrl(profile.cv);
    byId("cv-block").hidden = !cvUrl;
    if (cvUrl) byId("cv-link").href = cvUrl;
    const portraitUrl = safeUrl(profile.portrait);
    const portrait = byId("portrait");
    portrait.hidden = !portraitUrl;
    byId("hero-art").hidden = Boolean(portraitUrl);
    if (portraitUrl) {
      portrait.onerror = () => { portrait.hidden = true; byId("hero-art").hidden = false; };
      portrait.alt = name;
      portrait.src = portraitUrl;
    }
    byId("about-content").innerHTML = items(content.about).map(paragraph => `<p>${escape(paragraph)}</p>`).join("");
    byId("interests-block").hidden = !items(content.researchInterests).length;
    byId("interests-list").innerHTML = items(content.researchInterests).map(interest => `<li>${escape(interest)}</li>`).join("");
    // Empty sections and their navigation links stay hidden until content is added.
    ["research", "publications", "notes"].forEach(id => {
      const hidden = !items(content[id]).length;
      byId(id).hidden = hidden;
      byId("navigation").querySelector(`a[href="#${id}"]`).hidden = hidden;
    });
    byId("research-list").innerHTML = items(content.research).map(item => `<article class="research-item"><h3>${escape(item.title)}</h3>${item.description ? `<p>${escape(item.description)}</p>` : ""}${items(item.tags).length ? `<div class="tag-list">${items(item.tags).map(tag => `<span class="tag">${escape(tag)}</span>`).join("")}</div>` : ""}${items(item.links).length ? `<div class="research-links">${items(item.links).map(link => anchor(link.label, link.url)).join("")}</div>` : ""}${safeUrl(item.url) ? `<div class="item-link">${anchor("Learn more", item.url)}</div>` : ""}</article>`).join("");
    byId("publication-list").innerHTML = items(content.publications).map(paper => `<article class="publication"><div class="publication-year">${escape(paper.year)}</div><div><h3>${escape(paper.title)}</h3>${paper.authors ? `<p>${escape(paper.authors)}</p>` : ""}${paper.venue || paper.status ? `<p>${escape(paper.venue)}${paper.status ? `<span class="status">${escape(paper.status)}</span>` : ""}</p>` : ""}<div class="publication-links">${items(paper.links).map(link => anchor(link.label, link.url)).join("")}</div></div></article>`).join("");
    byId("notes-list").innerHTML = items(content.notes).map(note => `<article class="note">${note.type || note.date ? `<p class="note-meta"><span>${escape(note.type)}</span><span>${escape(note.date)}</span></p>` : ""}<h3>${safeUrl(note.url) ? anchor(note.title, note.url, "note-title-link") : escape(note.title)}</h3>${note.description ? `<p>${escape(note.description)}</p>` : ""}</article>`).join("");
    byId("education-block").hidden = !items(content.education).length;
    byId("education-list").innerHTML = items(content.education).map(item => `<div class="timeline-row"><span class="date">${escape(item.period)}</span><div><p>${escape(item.institution)}</p><p class="timeline-secondary">${escape(item.degree)}</p></div></div>`).join("");
    byId("news-block").hidden = !items(content.news).length;
    byId("news-list").innerHTML = items(content.news).map(item => `<div class="timeline-row"><span class="date">${escape(item.date)}</span><p>${safeUrl(item.url) ? anchor(item.text, item.url) : escape(item.text)}</p></div>`).join("");
    const email = String(profile.email || "").trim();
    const emailLink = email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? anchor(`Email: ${email}`, `mailto:${email}`, "contact-link") : "";
    byId("contact-links").innerHTML = emailLink + items(content.links).map(link => anchor(link.label, link.url, "contact-link")).join("");
    byId("current-year").textContent = String(new Date().getFullYear());
    byId("last-updated").hidden = !content.lastUpdated;
    byId("last-updated").textContent = content.lastUpdated ? `Last updated: ${content.lastUpdated}` : "";
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
    document.querySelectorAll("main .section:not([hidden])").forEach(section => observer.observe(section));
  }
})();
