(() => {
  const initCategoryFromUrl = () => {
    const hash = window.location.hash;

    if (!hash.includes("?category=")) {
      return;
    }

    const category = hash.split("?category=")[1];
    const targetFilter = document.querySelector(`[data-filter="${category}"]`);

    if (targetFilter) {
      targetFilter.click();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCategoryFromUrl);
  } else {
    initCategoryFromUrl();
  }
})();
