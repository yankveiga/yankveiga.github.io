const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const copyButton = document.querySelector(".copy-email");
const revealItems = document.querySelectorAll(".reveal");
const backToTopButton = document.querySelector(".back-to-top");
const scrollProgress = document.querySelector(".scroll-progress");
const projectImages = document.querySelectorAll(".project-media img");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

const closeMenu = () => {
  nav?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menu");
};

const updateThemeControls = (theme) => {
  const isDark = theme === "dark";
  const action = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  themeToggle?.setAttribute("aria-label", action);
  themeToggle?.setAttribute("title", action);
  themeColor?.setAttribute("content", isDark ? "#122c46" : "#faf8f0");
};

updateThemeControls(document.documentElement.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  updateThemeControls(nextTheme);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch {
    // The theme still works when browser storage is unavailable.
  }
});

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuButton?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (nav?.classList.contains("open") && !nav.contains(event.target) && !menuButton?.contains(event.target)) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 840) {
    closeMenu();
  }
});

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  const copyLabel = copyButton.querySelector(".contact-label");
  try {
    await navigator.clipboard.writeText(email);
    if (copyLabel) {
      copyLabel.textContent = "E-mail copiado";
    }
    setTimeout(() => {
      if (copyLabel) {
        copyLabel.textContent = "Copiar e-mail";
      }
    }, 1800);
  } catch {
    if (copyLabel) {
      copyLabel.textContent = email;
    }
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
  });
});

let scrollTicking = false;

const updateScrollEffects = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  scrollProgress?.style.setProperty("transform", `scaleX(${progress})`);
  backToTopButton?.classList.toggle("visible", window.scrollY > 560);

  if (!prefersReducedMotion.matches && window.innerWidth > 840) {
    projectImages.forEach((image) => {
      const bounds = image.getBoundingClientRect();
      const distanceFromCenter = bounds.top + bounds.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-10, Math.min(10, distanceFromCenter * -0.025));
      image.style.setProperty("--media-shift", `${shift}px`);
    });
  }

  scrollTicking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();
