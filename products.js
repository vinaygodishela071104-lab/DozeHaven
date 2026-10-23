(() => {
  const initProductsGrid = () => {
    const grid = document.getElementById("productsResults");
    const filters = document.querySelectorAll(".products-grid__filter");
    const sizeFilter = document.getElementById("bedSizeFilter");
    const sortSelect = document.getElementById("productSort");
    const emptyMessage = document.getElementById("productsEmpty");

    if (grid && filters.length && sizeFilter && sortSelect) {
      const cards = [...grid.querySelectorAll(".products-grid__card")];
      let activeFilter = "all";

      const updateGrid = () => {
        const activeSize = sizeFilter.value;
        const sortValue = sortSelect.value;

        const visibleCards = cards.filter((card) => {
          const matchesFilter =
            activeFilter === "all" || card.dataset.type === activeFilter;

          const matchesSize =
            activeSize === "all" || card.dataset.size === activeSize;

          const isVisible = matchesFilter && matchesSize;

          card.hidden = !isVisible;
          return isVisible;
        });

        emptyMessage.hidden = visibleCards.length > 0;

        const sortedCards = [...visibleCards].sort((a, b) => {
          const priceA = Number(a.dataset.price);
          const priceB = Number(b.dataset.price);

          if (sortValue === "price-low") {
            return priceA - priceB;
          }

          if (sortValue === "price-high") {
            return priceB - priceA;
          }

          return 0;
        });

        sortedCards.forEach((card) => grid.appendChild(card));
      };

      filters.forEach((filter) => {
        filter.addEventListener("click", () => {
          filters.forEach((item) => {
            item.setAttribute("aria-selected", String(item === filter));
          });

          activeFilter = filter.dataset.filter;
          updateGrid();
        });
      });

      sizeFilter.addEventListener("change", updateGrid);
      sortSelect.addEventListener("change", updateGrid);
      updateGrid();
    }

    const modal = document.getElementById("orderModal");
    const buyButtons = document.querySelectorAll(".products-grid__buy");

    if (modal && buyButtons.length) {
      const form = document.getElementById("orderForm");
      const confirmation = document.getElementById("orderConfirmation");
      const productTarget = modal.querySelector("[data-order-product]");
      const priceTarget = modal.querySelector("[data-order-price]");
      const successName = modal.querySelector("[data-order-success-name]");
      const successProduct = modal.querySelector(
        "[data-order-success-product]"
      );
      let lastFocusedButton = null;

      const openModal = (button) => {
        lastFocusedButton = button;

        productTarget.textContent = button.dataset.product;
        priceTarget.textContent = `₹${Number(
          button.dataset.price
        ).toLocaleString("en-IN")}`;

        form.reset();
        form.hidden = false;
        confirmation.hidden = true;
        modal.hidden = false;
        document.body.style.overflow = "hidden";

        modal.querySelector("input")?.focus();
      };

      const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = "";

        if (lastFocusedButton) {
          lastFocusedButton.focus();
        }
      };

      buyButtons.forEach((button) => {
        button.addEventListener("click", () => openModal(button));
      });

      modal.querySelectorAll("[data-order-close]").forEach((element) => {
        element.addEventListener("click", closeModal);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
          closeModal();
        }
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        successName.textContent = document
          .getElementById("orderName")
          .value.trim();

        successProduct.textContent = productTarget.textContent;

        form.hidden = true;
        confirmation.hidden = false;

        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductsGrid);
  } else {
    initProductsGrid();
  }
})();
