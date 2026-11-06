(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const modal = document.getElementById("accessModal");
  const form = document.getElementById("accessForm");
  const formNote = document.getElementById("formNote");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function setMenu(open) {
    if (!menuButton || !nav) return;
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menuButton.innerHTML = open ? '<span aria-hidden="true">×</span>' : '<span aria-hidden="true">⋮</span>';
  }

  function openAccessModal() {
    if (!modal) return;
    setMenu(false);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const nameField = document.getElementById("fullName");
    if (nameField) window.setTimeout(() => nameField.focus(), 160);
  }

  function closeAccessModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Direct listeners plus delegation make the menu reliable on touch and mouse devices.
  if (menuButton) {
    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });
  }

  document.addEventListener("click", (event) => {
    const accessTrigger = event.target.closest("[data-open-access]");
    const closeTrigger = event.target.closest("[data-close-access]");
    const navLink = event.target.closest(".nav a");

    if (accessTrigger) {
      event.preventDefault();
      openAccessModal();
      return;
    }
    if (closeTrigger) {
      event.preventDefault();
      closeAccessModal();
      return;
    }
    if (navLink) setMenu(false);
    if (nav && nav.classList.contains("open") &&
        !event.target.closest(".nav") && !event.target.closest(".menu-toggle")) {
      setMenu(false);
    }
    if (event.target === modal) closeAccessModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      closeAccessModal();
    }
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = (document.getElementById("fullName")?.value || "").trim();
      if (formNote) {
        formNote.textContent = `ACCESS REQUEST READY${name ? ", " + name.toUpperCase() : ""}. FRONT-END DEMO ONLY — NO DATA WAS SENT.`;
        formNote.classList.add("success");
      }
      const submit = form.querySelector('button[type="submit"]');
      if (submit) submit.innerHTML = "REQUEST PREPARED ✓";
    });
  }

  const revealItems = document.querySelectorAll(".intro-grid, .feature-card, .future-visual, .future-copy");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("revealed"));
  }
})();
