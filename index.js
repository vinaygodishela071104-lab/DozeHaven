(() => {
  const initTestimonials = () => {
    document.querySelectorAll(".home1-testimonials").forEach((section) => {
      if (section.dataset.testimonialsReady === "true") return;

      const slides = [
        ...section.querySelectorAll(".home1-testimonials__slide"),
      ];
      const dots = [
        ...section.querySelectorAll("[data-testimonial-index]"),
      ];
      const previousButton = section.querySelector("[data-testimonial-prev]");
      const nextButton = section.querySelector("[data-testimonial-next]");
      const currentLabel = section.querySelector("[data-testimonial-current]");
      const totalLabel = section.querySelector("[data-testimonial-total]");
      const status = section.querySelector("[data-testimonial-status]");
      const slider = section.querySelector(".home1-testimonials__slider");

      if (!slides.length || !slider) return;

      section.dataset.testimonialsReady = "true";

      let currentIndex = 0;

      const formatNumber = (number) => String(number).padStart(2, "0");

      const showSlide = (index, announce = true) => {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
          slide.hidden = slideIndex !== currentIndex;
          slide.setAttribute(
            "aria-label",
            `${slideIndex + 1} of ${slides.length}`
          );
        });

        dots.forEach((dot) => {
          const isCurrent =
            Number(dot.dataset.testimonialIndex) === currentIndex;

          if (isCurrent) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });

        if (currentLabel) {
          currentLabel.textContent = formatNumber(currentIndex + 1);
        }

        if (totalLabel) {
          totalLabel.textContent = formatNumber(slides.length);
        }

        if (announce && status) {
          const name = slides[currentIndex]
            .querySelector(".home1-testimonials__customer-name")
            ?.textContent.trim();

          status.textContent =
            `Testimonial ${currentIndex + 1} of ${slides.length}` +
            (name ? `: ${name}` : "");
        }
      };

      previousButton?.addEventListener("click", () => {
        showSlide(currentIndex - 1);
      });

      nextButton?.addEventListener("click", () => {
        showSlide(currentIndex + 1);
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          showSlide(Number(dot.dataset.testimonialIndex));
        });
      });

      slider.addEventListener("keydown", (event) => {
        if (event.target !== slider) return;

        const isRTL = getComputedStyle(section).direction === "rtl";

        if (event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(currentIndex + (isRTL ? -1 : 1));
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          showSlide(currentIndex + (isRTL ? 1 : -1));
        } else if (event.key === "Home") {
          event.preventDefault();
          showSlide(0);
        } else if (event.key === "End") {
          event.preventDefault();
          showSlide(slides.length - 1);
        }
      });

      if (slides.length < 2) {
        section
          .querySelector(".home1-testimonials__controls")
          ?.setAttribute("hidden", "");

        section
          .querySelector(".home1-testimonials__dots")
          ?.setAttribute("hidden", "");
      }

      showSlide(0, false);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTestimonials);
  } else {
    initTestimonials();
  }
})();