// S.D.R WORLD SCHOOL - site interactions

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      menuBtn.textContent = "☰";
    });
  });
}

// Automatically update the footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const imageSrc = item.dataset.src || image?.src;

    if (imageSrc && lightbox && lightboxImg) {
      lightboxImg.src = imageSrc;
      lightboxImg.alt = image?.alt || "School gallery image";
      lightbox.hidden = false;
      if (closeLightbox) closeLightbox.focus();
    }
  });
});

function hideLightbox() {
  if (lightbox) lightbox.hidden = true;
}

if (closeLightbox) closeLightbox.addEventListener("click", hideLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) hideLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideLightbox();
});

// Contact form: prepares an email in the visitor's email application.
// This does not send the email automatically.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent("Admission Enquiry - S.D.R WORLD SCHOOL");
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\n` +
      `Phone: ${formData.get("phone")}\n` +
      `Message: ${formData.get("message")}`
    );

    const email = "habibur630@gmail@gmail.com";
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

    const status = document.getElementById("formStatus");
    if (status) {
      status.textContent = "Your email application is opening. Please review and send the enquiry.";
    }

    window.location.href = mailto;
  });
}
