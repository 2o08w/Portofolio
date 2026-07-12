const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const fadeSections = document.querySelectorAll(".fade-section");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.classList.toggle("is-open", !isOpen);
    navMenu.classList.toggle("is-open", !isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.classList.remove("is-open");
    navMenu?.classList.remove("is-open");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  fadeSections.forEach((section) => observer.observe(section));
} else {
  fadeSections.forEach((section) => section.classList.add("is-visible"));
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Mohon lengkapi nama, email, dan pesan.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = "Format email belum valid.";
    return;
  }

  formStatus.textContent = "Terima kasih, pesan Anda sudah siap dikirim.";
  contactForm.reset();
});
