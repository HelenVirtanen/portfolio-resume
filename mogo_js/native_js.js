/* Fixed header while scrolling */
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const intro = document.getElementById("intro");
    const introH = intro ? intro.offsetHeight : 0;

    const checkScroll = (scrollOffset) => {
        if (scrollOffset >= introH) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    };

    let scrollOffset = window.pageYOffset;
    checkScroll(scrollOffset);

    window.addEventListener("scroll", () => {
        scrollOffset = window.pageYOffset;
        checkScroll(scrollOffset);
    });

  /* Nav menu toggle */
    document.addEventListener("click", (event) => {
        const target = event.target.closest("#nav_toggle");
        if (!target) return;

        event.preventDefault();
        target.classList.toggle("active");
        const nav = document.getElementById("nav");
        if (nav) nav.classList.toggle("active");
    });

  /* Collapse */
    document.addEventListener("click", (event) => {
        const target = event.target.closest("[data-collapse]");
        if (!target) return;

        event.preventDefault();
        target.classList.toggle("active");
      
               document.querySelectorAll(".accordion__item").forEach((item) => {
        if (item !== target) {
            item.classList.remove("active");
        }
    });
});

    /* Slider */
    const sliders = document.querySelectorAll("[data-slider]");
    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll(".slide");
        let currentIndex = 0;

        const updateSlider = () => {
            slides.forEach((slide, index) => {
                slide.style.display = index === currentIndex ? "block" : "none";
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        };

        const nextButton = slider.querySelector("[data-slider-next]");
        const prevButton = slider.querySelector("[data-slider-prev]");

        if (nextButton) nextButton.addEventListener("click", nextSlide);
        if (prevButton) prevButton.addEventListener("click", prevSlide);

        updateSlider();
    });
});
