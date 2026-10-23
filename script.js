const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "×" : "☰";
});

nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
  if (menuBtn) menuBtn.textContent = "☰";
}));

document.querySelector("#year").textContent = new Date().getFullYear();

// Front-end enquiry form: opens an email draft; it does not submit/store data on a server.
const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent("Website enquiry - S.D.R WORLD SCHOOL");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\n\nMessage:\n${data.get("message")}`
  );

  status.textContent = "Your email app should open with the enquiry prepared. Please send it from your email app. If nothing opens, email sdrworldpublicschool@gmail.com directly.";
  status.classList.add("show");

  window.location.href = `habibur6370@gmail.com?subject=${subject}&body=${body}`;
});

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const close = document.querySelector("#closeLightbox");

let previousFocus;

document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  previousFocus = item;
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.querySelector("img")?.alt || "School gallery photo";
  lightbox.hidden = false;
  close.focus();
  document.body.style.overflow = "hidden";
}));

function closeViewer() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
  previousFocus?.focus();
}

close?.addEventListener("click", closeViewer);

lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeViewer();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeViewer();
});