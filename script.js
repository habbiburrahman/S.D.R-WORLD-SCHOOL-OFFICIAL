
/* ==========================================
   S.D.R WORLD SCHOOL - COMPLETE SCRIPT
========================================== */


/* 1. MOBILE NAVIGATION MENU */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menuBtn.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      menuBtn.textContent = "☰";
    });
  });
}


/* 2. AUTOMATIC COPYRIGHT YEAR */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* 3. PHOTO GALLERY LIGHTBOX */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

function openGalleryImage(item) {
  if (!lightbox || !lightboxImg) return;

  const image = item.querySelector("img");
  const imageUrl = item.getAttribute("data-src") ||
    (image ? image.src : "");

  if (!imageUrl) return;

  lightboxImg.src = imageUrl;
  lightboxImg.alt = image ? image.alt : "School gallery photo";

  lightbox.hidden = false;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function hideGalleryImage() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

galleryItems.forEach(function (item) {
  item.addEventListener("click", function () {
    openGalleryImage(item);
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", hideGalleryImage);
}

if (lightbox) {
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      hideGalleryImage();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideGalleryImage();
  }
});


/* 4. SEND AN ENQUIRY FORM */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const phone = contactForm.elements["phone"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (name.length < 2) {
      if (formStatus) {
        formStatus.textContent = "Please enter your full name.";
      }
      return;
    }

    if (!/^[0-9+() -]{7,20}$/.test(phone)) {
      if (formStatus) {
        formStatus.textContent =
          "Please enter a valid phone number.";
      }
      return;
    }

    if (!message) {
      if (formStatus) {
        formStatus.textContent =
          "Please enter your enquiry message.";
      }
      return;
    }

    const subject = encodeURIComponent(
      "Website Enquiry - S.D.R WORLD SCHOOL"
    );

    const body = encodeURIComponent(
      "New enquiry from S.D.R WORLD SCHOOL website\n\n" +
      "Parent / Student Name: " + name + "\n" +
      "Phone Number: " + phone + "\n" +
      "Message: " + message + "\n\n" +
      "Please contact this person regarding their enquiry."
    );

    const mailtoURL =
      "mailto:habibur6370@gmail.com" +
      "?subject=" + subject +
      "&body=" + body;

    if (formStatus) {
      formStatus.textContent =
        "Opening your email app. Please press Send in the email app to complete your enquiry.";
    }

    /* Open email app directly */
    window.location.href = mailtoURL;
  });
}


/* 5. SMOOTH SCROLL TO PAGE SECTIONS */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", targetId);
      }
    }
  });
});
