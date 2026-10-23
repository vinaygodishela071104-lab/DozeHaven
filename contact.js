(() => {
  const initVisitForm = () => {
    const form = document.querySelector(".contact-visit__form");
    const confirmation = document.getElementById("visitConfirmation");

    if (!form || !confirmation || form.dataset.visitReady === "true") {
      return;
    }

    form.dataset.visitReady = "true";

    const nameField = form.querySelector("#visitName");
    const emailField = form.querySelector("#visitEmail");
    const phoneField = form.querySelector("#visitPhone");
    const dateField = form.querySelector("#visitDate");
    const timeField = form.querySelector("#visitTime");

    const nameTarget = confirmation.querySelector("[data-confirmation-name]");
    const dateTarget = confirmation.querySelector("[data-confirmation-date]");
    const timeTarget = confirmation.querySelector("[data-confirmation-time]");
    const referenceTarget = confirmation.querySelector(
      "[data-confirmation-reference]",
    );

    const formatDate = (value) => {
      const date = new Date(`${value}T00:00:00`);

      if (Number.isNaN(date.getTime())) {
        return value;
      }

      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const createReferenceId = () => {
      const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let reference = "";

      for (let index = 0; index < 6; index += 1) {
        reference += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }

      return `DH-${reference}`;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = [
        nameField,
        emailField,
        phoneField,
        dateField,
        timeField,
      ];

      const isValid = requiredFields.every((field) => field.checkValidity());

      if (!isValid) {
        form.reportValidity();
        return;
      }

      nameTarget.textContent = nameField.value.trim();
      dateTarget.textContent = formatDate(dateField.value);
      timeTarget.textContent = timeField.value;
      referenceTarget.textContent = createReferenceId();

      form.hidden = true;
      confirmation.hidden = false;

      confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVisitForm);
  } else {
    initVisitForm();
  }
})();
(() => {
  const initFinalFaqs = () => {
    document
      .querySelectorAll(".contact-final__accordion")
      .forEach((accordion) => {
        if (accordion.dataset.finalFaqReady === "true") return;

        accordion.dataset.finalFaqReady = "true";

        const items = [...accordion.querySelectorAll(".contact-final__item")];

        items.forEach((item) => {
          item.addEventListener("toggle", () => {
            if (!item.open) return;

            items.forEach((otherItem) => {
              if (otherItem !== item) {
                otherItem.open = false;
              }
            });
          });
        });
      });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFinalFaqs);
  } else {
    initFinalFaqs();
  }
})();
