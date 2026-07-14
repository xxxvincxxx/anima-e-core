const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.querySelector(".booking-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  const originalText = button.textContent;

  button.textContent = "Grazie!";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    form.reset();
  }, 2200);
});

// Rivela gli elementi mentre entrano nello schermo
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

// Header più compatto durante lo scroll
const siteHeader = document.querySelector(".site-header");

const updateHeaderState = () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 40);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// Glow che segue il puntatore sui bottoni
document.querySelectorAll(".button").forEach((btn) => {
  btn.addEventListener("pointermove", (event) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", `${event.clientX - rect.left}px`);
    btn.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });
});


// Parallax multilivello della hero.
// Viene disattivato automaticamente su touch e per chi preferisce meno animazioni.
const parallaxRoot = document.querySelector("[data-parallax-root]");
const parallaxLayers = document.querySelectorAll("[data-parallax]");

if (
  parallaxRoot &&
  parallaxLayers.length &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let frameId;

  parallaxRoot.addEventListener("pointermove", (event) => {
    const rect = parallaxRoot.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      parallaxLayers.forEach((layer) => {
        const depth = Number(layer.dataset.parallax || 0);
        layer.style.translate = `${x * depth * 90}px ${y * depth * 70}px`;
      });
    });
  });

  parallaxRoot.addEventListener("pointerleave", () => {
    parallaxLayers.forEach((layer) => {
      layer.style.translate = "0 0";
    });
  });
}

// Tilt premium sulle card, solo con mouse o trackpad.
if (
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.querySelectorAll(".experience-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `translateY(-9px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
