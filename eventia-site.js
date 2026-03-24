const BUSINESS_NAME = "EVENTIA";
const WHATSAPP_NUMBER = "523523136025";
const DISPLAY_WHATSAPP = "+52 352 313 6025";

const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const defaultWhatsAppMessage =
  `Hola, vi la pagina de ${BUSINESS_NAME} y quiero cotizar decoracion para mi evento. Quiero conocer opciones, disponibilidad y forma de apartado.`;

const phoneTargets = document.querySelectorAll("[data-phone-text]");
const whatsappTargets = document.querySelectorAll("[data-whatsapp-link]");
const footerNote = document.getElementById("footerNote");
const form = document.getElementById("eventiaForm");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const galleryButtons = document.querySelectorAll("[data-gallery-full]");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const setMenuState = (isOpen) => {
  if (!menuToggle || !siteNav) {
    return;
  }

  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
};

phoneTargets.forEach((node) => {
  node.textContent = DISPLAY_WHATSAPP;
});

if (footerNote) {
  footerNote.textContent = `${BUSINESS_NAME} | WhatsApp ${DISPLAY_WHATSAPP}`;
}

whatsappTargets.forEach((node) => {
  const message = node.dataset.message?.trim() || defaultWhatsAppMessage;
  node.href = buildWhatsAppLink(message);
});

const closeMenu = () => {
  setMenuState(false);
};

if (menuToggle && siteNav) {
  siteNav.setAttribute("aria-hidden", "true");

  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = !siteNav.classList.contains("is-open");
    setMenuState(isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.classList.contains("is-open")) {
      return;
    }

    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

if (sections.length && navLinks.length) {
  const linkById = new Map(
    Array.from(navLinks).map((link) => [link.getAttribute("href").slice(1), link])
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkById.get(entry.target.id);

        if (!link) {
          return;
        }

        if (entry.isIntersecting) {
          navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-25% 0px -45% 0px",
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const openLightbox = (src, alt, caption) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightboxCaption.textContent = caption || alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
};

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    openLightbox(
      button.dataset.galleryFull || image?.src || "",
      image?.alt || "",
      button.dataset.galleryCaption || image?.alt || ""
    );
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();

    if (lightbox?.classList.contains("is-open")) {
      closeLightbox();
    }
  }
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "Sin nombre";
    const tipoEvento =
      document.getElementById("tipoEvento")?.value.trim() || "Sin definir";
    const servicio =
      document.getElementById("servicio")?.value.trim() || "Sin servicio definido";
    const fechaEvento =
      document.getElementById("fechaEvento")?.value.trim() || "Sin fecha definida";
    const ubicacion =
      document.getElementById("ubicacion")?.value.trim() || "Sin ubicacion";
    const telefono =
      document.getElementById("telefono")?.value.trim() || "Sin telefono";
    const descripcion =
      document.getElementById("descripcion")?.value.trim() || "Sin descripcion";

    const message =
      `Hola, quiero cotizar con ${BUSINESS_NAME}.\n\n` +
      `Nombre: ${nombre}\n` +
      `Tipo de evento: ${tipoEvento}\n` +
      `Servicio: ${servicio}\n` +
      `Fecha del evento: ${fechaEvento}\n` +
      `Ubicacion: ${ubicacion}\n` +
      `Telefono: ${telefono}\n` +
      `Idea o descripcion: ${descripcion}\n\n` +
      `Quiero conocer disponibilidad, costo y forma de apartado.`;

    window.open(buildWhatsAppLink(message), "_blank", "noopener");
  });
}
