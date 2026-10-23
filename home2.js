(() => {
  const initMattressSpotlight = () => {
    document.querySelectorAll(".home2-inside").forEach((section) => {
      if (section.dataset.insideReady === "true") return;

      const tabs = [...section.querySelectorAll(".home2-inside__tab")];

      const panels = tabs.map((tab) =>
        document.getElementById(tab.getAttribute("aria-controls")),
      );

      const markers = [...section.querySelectorAll("[data-inside-marker]")];

      if (!tabs.length || panels.some((panel) => !panel)) return;

      section.dataset.insideReady = "true";

      const selectLayer = (index, moveFocus = false) => {
        tabs.forEach((tab, tabIndex) => {
          const selected = tabIndex === index;

          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
          panels[tabIndex].hidden = !selected;
        });

        markers.forEach((marker) => {
          marker.classList.toggle(
            "is-active",
            Number(marker.dataset.insideMarker) === index,
          );
        });

        if (moveFocus) {
          tabs[index].focus();
        }
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          selectLayer(index);
        });

        tab.addEventListener("keydown", (event) => {
          let nextIndex;

          switch (event.key) {
            case "ArrowDown":
              nextIndex = (index + 1) % tabs.length;
              break;

            case "ArrowUp":
              nextIndex = (index - 1 + tabs.length) % tabs.length;
              break;

            case "Home":
              nextIndex = 0;
              break;

            case "End":
              nextIndex = tabs.length - 1;
              break;

            default:
              return;
          }

          event.preventDefault();
          selectLayer(nextIndex, true);
        });
      });

      selectLayer(0);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMattressSpotlight);
  } else {
    initMattressSpotlight();
  }
})();
(() => {
  const initComfortGuide = () => {
    document.querySelectorAll(".home2-comfort").forEach((section) => {
      if (section.dataset.comfortReady === "true") return;

      const form = section.querySelector(".home2-comfort__form");
      const steps = [...section.querySelectorAll("[data-comfort-step]")];
      const result = section.querySelector(".home2-comfort__result");
      const back = section.querySelector("[data-comfort-back]");
      const nextLabel = section.querySelector("[data-comfort-next-label]");
      const restart = section.querySelector("[data-comfort-restart]");
      const count = section.querySelector("[data-comfort-count]");
      const progress = section.querySelector(".home2-comfort__progress");
      const segments = [...progress.querySelectorAll("span")];
      const status = section.querySelector(".home2-comfort__status");

      if (!form || !steps.length || !result) return;

      section.dataset.comfortReady = "true";

      let currentStep = 0;

      const showStep = (index, focus = false) => {
        currentStep = index;
        form.hidden = false;
        result.hidden = true;

        steps.forEach((step, stepIndex) => {
          const active = stepIndex === index;
          step.hidden = !active;
          step.disabled = !active;
        });

        segments.forEach((segment, segmentIndex) => {
          segment.classList.toggle("is-active", segmentIndex <= index);
        });

        back.hidden = index === 0;
        nextLabel.textContent =
          index === steps.length - 1 ? "See My Preferences" : "Continue";

        count.textContent =
          `Step ${String(index + 1).padStart(2, "0")} of ` +
          String(steps.length).padStart(2, "0");

        progress.setAttribute("aria-valuenow", String(index + 1));

        if (focus) {
          const target =
            steps[index].querySelector("input:checked") ||
            steps[index].querySelector("input");

          target?.focus();
        }
      };

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (currentStep < steps.length - 1) {
          showStep(currentStep + 1, true);
          status.textContent = `Step ${currentStep + 1} of ${steps.length}.`;
          return;
        }

        section.querySelectorAll("[data-comfort-answer]").forEach((output) => {
          const name = output.dataset.comfortAnswer;
          const selected = form.querySelector(`input[name="${name}"]:checked`);

          output.textContent = selected?.value || "Not selected";
        });

        form.hidden = true;
        result.hidden = false;
        count.textContent = "Your Comfort Edit";
        progress.setAttribute("aria-valuenow", String(steps.length));

        segments.forEach((segment) => {
          segment.classList.add("is-active");
        });

        result.querySelector(".home2-comfort__result-title").focus();
        status.textContent = "Your preference summary is ready.";
      });

      back.addEventListener("click", () => {
        showStep(Math.max(0, currentStep - 1), true);
      });

      restart.addEventListener("click", () => {
        form.reset();
        showStep(0, true);
        status.textContent = "Preference guide restarted.";
      });

      showStep(0);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComfortGuide);
  } else {
    initComfortGuide();
  }
})();
(() => {
  const initEveningSection = () => {
    document.querySelectorAll(".home2-evening").forEach((section) => {
      if (section.dataset.eveningReady === "true") return;

      const tabs = [...section.querySelectorAll(".home2-evening__tab")];
      const image = section.querySelector("[data-evening-image]");
      const imageLabel = section.querySelector("[data-evening-image-label]");
      const caption = section.querySelector("[data-evening-caption]");

      const panels = tabs.map((tab) =>
        document.getElementById(tab.getAttribute("aria-controls")),
      );

      if (!tabs.length || !image || panels.some((panel) => !panel)) {
        return;
      }

      section.dataset.eveningReady = "true";

      let imageRequest = 0;

      const selectTopic = (index, moveFocus = false) => {
        const selectedTab = tabs[index];

        tabs.forEach((tab, tabIndex) => {
          const selected = tabIndex === index;

          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
          panels[tabIndex].hidden = !selected;
        });

        imageLabel.textContent = selectedTab.dataset.imageLabel;
        caption.textContent = selectedTab.dataset.caption;

        const request = ++imageRequest;
        const nextImage = new Image();

        nextImage.onload = () => {
          if (request !== imageRequest) return;

          image.src = selectedTab.dataset.image;
          image.alt = selectedTab.dataset.imageAlt;
        };

        nextImage.src = selectedTab.dataset.image;

        if (moveFocus) {
          selectedTab.focus();
        }
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          selectTopic(index);
        });

        tab.addEventListener("keydown", (event) => {
          let nextIndex;

          switch (event.key) {
            case "ArrowDown":
              nextIndex = (index + 1) % tabs.length;
              break;

            case "ArrowUp":
              nextIndex = (index - 1 + tabs.length) % tabs.length;
              break;

            case "Home":
              nextIndex = 0;
              break;

            case "End":
              nextIndex = tabs.length - 1;
              break;

            default:
              return;
          }

          event.preventDefault();
          selectTopic(nextIndex, true);
        });
      });

      selectTopic(0);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEveningSection);
  } else {
    initEveningSection();
  }
})();
(() => {
  const initCareAccordion = () => {
    document.querySelectorAll(".home2-care__accordion").forEach((accordion) => {
      if (accordion.dataset.careReady === "true") return;

      accordion.dataset.careReady = "true";

      const items = [...accordion.querySelectorAll(".home2-care__item")];

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
    document.addEventListener("DOMContentLoaded", initCareAccordion);
  } else {
    initCareAccordion();
  }
})();