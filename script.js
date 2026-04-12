/* ===============================
   CLEANED + FINAL VERSION
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =========================
     THEME TOGGLE
  ========================== */

  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn?.querySelector("i");
  const siteLogo = document.getElementById("site-logo");

  const storedTheme = localStorage.getItem("portfolio-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    body.classList.remove("light", "dark");
    body.classList.add(storedTheme);
    updateIcon(storedTheme);
  } else {
    body.classList.add("dark");
    updateIcon("dark");
  }

  function updateIcon(theme) {
    if (!themeIcon) return;
    themeIcon.classList.remove("fa-moon", "fa-sun");
    themeIcon.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
  }

  function updateLogo() {
    if (!siteLogo) return;
    siteLogo.src = body.classList.contains("light")
      ? "logo-dark.svg"
      : "logo.svg";
  }

  updateLogo();

  themeBtn?.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    body.classList.remove("light", "dark");
    body.classList.add(newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

    updateIcon(newTheme);
    updateLogo();
  });

  /* =========================
     HAMBURGER MENU
  ========================== */

  const hamburgerBtn = document.getElementById("hamburger");
  const navList = document.getElementById("nav-list");
  const hamburgerIcon = hamburgerBtn?.querySelector("i");

  hamburgerBtn?.addEventListener("click", () => {
    const open = navList?.classList.toggle("open");

    hamburgerBtn.setAttribute("aria-expanded", String(Boolean(open)));

    hamburgerIcon?.classList.toggle("fa-bars");
    hamburgerIcon?.classList.toggle("fa-times");
  });

  // Close menu on link click
  document.querySelectorAll(".nav__list a").forEach((link) => {
    link.addEventListener("click", () => {
      navList?.classList.remove("open");
      hamburgerBtn?.setAttribute("aria-expanded", "false");
      hamburgerIcon?.classList.add("fa-bars");
      hamburgerIcon?.classList.remove("fa-times");
    });
  });

  /* =========================
     SCROLL TO TOP BUTTON
  ========================== */

  const scrollBtn = document.querySelector(".scroll-top");

  if (scrollBtn) scrollBtn.style.display = "none";

  window.addEventListener("scroll", () => {
    if (!scrollBtn) return;
    scrollBtn.style.display = window.scrollY > 500 ? "block" : "none";
  });

  scrollBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================
     TYPEWRITER EFFECT
  ========================== */

  const roles = [
    "Software Engineer",
    "Machine Learning Engineer",
    "Data & Infrastructure Engineer",
    "Platform & Cloud Engineer"
  ];

  const typedElement = document.getElementById("typed-role");

  if (typedElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        charIndex++;
        typedElement.textContent = currentRole.slice(0, charIndex);

        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeRole, 1500);
          return;
        }
      } else {
        charIndex--;
        typedElement.textContent = currentRole.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeRole, isDeleting ? 40 : 80);
    }

    setTimeout(typeRole, 600);
  }

  /* =========================
     CARD HOVER LIGHT EFFECT
  ========================== */

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
  });

  /* =========================
     FOOTER YEAR
  ========================== */

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
