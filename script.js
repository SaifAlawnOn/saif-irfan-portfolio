const scrollToTarget = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

document.querySelectorAll(".nav-card").forEach((card) => {
  const target = card.getAttribute("data-target");
  card.addEventListener("click", () => scrollToTarget(target));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  const target = link.getAttribute("data-target");
  link.addEventListener("click", () => scrollToTarget(target));
});

const heroTerminal = document.querySelector(".hero-terminal");
if (heroTerminal) {
  const updateTilt = (event) => {
    const rect = heroTerminal.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -6;
    const rotateY = x * 6;
    heroTerminal.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const resetTilt = () => {
    heroTerminal.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  heroTerminal.addEventListener("mousemove", updateTilt);
  heroTerminal.addEventListener("mouseleave", resetTilt);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".section, .project-card, .shot-card").forEach((el) => {
  el.classList.add("is-observing");
  observer.observe(el);
});