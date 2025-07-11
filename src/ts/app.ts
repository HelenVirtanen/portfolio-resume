import "../css/style.less";
import Glider from "glider-js";
import "glider-js/glider.min.css";

window.addEventListener("DOMContentLoaded", () => {
  /* Show 6 works */
  const works = document.querySelectorAll<HTMLElement>(".portfolio__col");
  const loadMore = document.getElementById("loadMore");
  if (!loadMore) {
    throw new Error("Load More button not found");
  }
  let visibleCount = 6;

  // Hide all works after first six
  works.forEach((work, index) => {
    if (index >= visibleCount) {
      work.style.display = "none";
    }
  });

  loadMore.addEventListener("click", () => {
    const scrollY = window.scrollY;
    let newVisibleCount = visibleCount + 6;

    works.forEach((work, index) => {
      if (index < newVisibleCount) {
        work.style.display = "block";
      }
    });
    visibleCount = newVisibleCount;

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });

    if (visibleCount >= works.length) {
      loadMore.style.display = "none";
    }
  });

  const worksSlider = document.querySelectorAll<HTMLElement>(
    '[data-slider="glider"]'
  );

  /* Works filter */
  const filters = document.querySelectorAll<HTMLElement>("[data-filter]");

  filters.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      event.preventDefault();
      filters.forEach((f) => f.classList.remove("is-active"));
      filter.classList.add("is-active");
      const cat = filter.dataset.filter;

      const workItems = document.querySelectorAll<HTMLElement>("[data-cat]");

      workItems.forEach((item) => {
        item.style.display = "block";
        const workCat = item.dataset.cat;
        if (!cat || cat === "all" || workCat === cat) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  /* Modal */

  const modalCalls = document.querySelectorAll<HTMLElement>("[data-modal]");
  const modalCloses = document.querySelectorAll<HTMLElement>("[data-close]");

  /* Open modal */
  modalCalls.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = btn.dataset.modal;
      if (!modalId) return;

      const modal = document.querySelector<HTMLElement>(modalId);
      if (!modal) return;

      modal.classList.add("show");
      document.body.classList.add("no-scroll");

      // Open with span effect
      setTimeout(() => {
        const dialog = modal.querySelector<HTMLElement>(".modal__dialog");
        if (dialog) dialog.style.transform = "scale(1)";
      }, 200);
    });
  });

  /* Close modal with close button */

  modalCloses.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const modalParent = btn.closest(".modal");
      if (!modalParent) return;

      const dialog = modalParent.querySelector<HTMLElement>(".modal__dialog");
      if (dialog) dialog.style.transform = "scale(0)";

      setTimeout(() => {
        modalParent.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }, 200);
    });
  });

  /* Close modal by clicking on the mask */
  const modals = document.querySelectorAll<HTMLElement>(".modal");

  modals.forEach((modal) => {
    modal.addEventListener("click", () => {
      const dialog = modal.querySelector<HTMLElement>(".modal__dialog");
      if (dialog) dialog.style.transform = "scale(0)";

      setTimeout(() => {
        modal.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }, 200);
    });
  });

  const modalDialogs = document.querySelectorAll<HTMLElement>(".modal__dialog");
  modalDialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  /* Close modal by pushing Esc */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal = document.querySelector<HTMLElement>(".modal.show");
      if (!activeModal) return;

      const dialog = activeModal.querySelector<HTMLElement>(".modal__dialog");
      if (dialog) dialog.style.transform = "scale(0)";

      setTimeout(() => {
        activeModal.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }, 200);
    }
  });

  /* Mobile nav */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  navToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    nav?.classList.toggle("show");
    console.log("clicked");
  });

  /* Slider with Glider */

  worksSlider.forEach((slider) => {
    new Glider(slider, {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: {
        prev:
          slider.closest(".modal")?.querySelector(".slickPrev") || undefined,
        next:
          slider.closest(".modal")?.querySelector(".slickNext") || undefined,
      },
      draggable: true,
      duration: 0.5,
    });
  });
});
