/* ===============================
   CLEANED + STABLE VERSION
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  /* =========================
     THEME TOGGLE
  ========================== */

  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn?.querySelector("i");

  const storedTheme = localStorage.getItem("portfolio-theme");

  // Default theme
  if (storedTheme) {
    body.classList.add(storedTheme);
    updateIcon(storedTheme);
  } else {
    body.classList.add("dark"); // default
    updateIcon("dark");
  }

  function updateIcon(theme) {
    if (!themeIcon) return;

    themeIcon.classList.remove("fa-moon", "fa-sun");
    themeIcon.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
  }

  themeBtn?.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");

    body.classList.toggle("dark", !isDark);
    body.classList.toggle("light", isDark);

    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("portfolio-theme", newTheme);

    updateIcon(newTheme);
  });

  /* =========================
     HAMBURGER MENU
  ========================== */

  const hamburgerBtn = document.getElementById("hamburger");
  const navList = document.querySelector(".nav__list");
  const hamburgerIcon = hamburgerBtn?.querySelector("i");

  hamburgerBtn?.addEventListener("click", () => {
    navList.classList.toggle("display-nav-list");

    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", String(!expanded));

    hamburgerIcon?.classList.toggle("fa-bars");
    hamburgerIcon?.classList.toggle("fa-times");
  });

  // Close nav when clicking link (mobile UX improvement)
  document.querySelectorAll(".nav__list a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("display-nav-list");
      hamburgerBtn?.setAttribute("aria-expanded", "false");
      hamburgerIcon?.classList.add("fa-bars");
      hamburgerIcon?.classList.remove("fa-times");
    });
  });

  /* =========================
     SCROLL TO TOP BUTTON
  ========================== */

  const scrollBtn = document.querySelector(".scroll-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn?.addEventListener("click", () => {
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

});
