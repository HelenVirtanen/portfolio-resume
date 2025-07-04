import '../css/style.less';

window.addEventListener('DOMContentLoaded', () => {
    const worksSlider = document.querySelectorAll<HTMLElement>('[data-slider="slick"]');
    
    /* Works filter */
    const filters = document.querySelectorAll<HTMLElement>('[data-filter]');

    filters.forEach(filter => {
        filter.addEventListener('click', (event) => {
            event.preventDefault();
            const cat = filter.dataset.filter;

            const workItems = document.querySelectorAll<HTMLElement>('[data-cat]');

            workItems.forEach(item => {
                const workCat = item.dataset.cat;
                if (!cat || cat === 'all' || workCat === cat) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
        
    /* Modal */

    const modalCalls = document.querySelectorAll<HTMLElement>('[data-modal]');
    const modalCloses = document.querySelectorAll<HTMLElement>('[data-close]');

    /* Open modal */
    modalCalls.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = btn.dataset.modal;
            if (!modalId) return;
        
            const modal = document.querySelector<HTMLElement>(modalId);
            if (!modal) return;

            modal.classList.add('show');
            document.body.classList.add('no-scroll');
    
    // Open with span effect
        setTimeout(() => {
            const dialog = modal.querySelector<HTMLElement>('.modal__dialog');
            if (dialog) dialog.style.transform = 'scale(1)';
        }, 200);
        
        // @ts-ignore
        $(modal).find('[data-slider="slick"]').slick('setPosition');
    });
});

    /* Close modal with close button */

    modalCloses.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modalParent = btn.closest('.modal');
            if (!modalParent) return;
        
            const dialog = modalParent.querySelector<HTMLElement>('.modal__dialog');
            if (dialog) dialog.style.transform = 'scale(0)';

            setTimeout(() => {
                modalParent.classList.remove('show');
                document.body.classList.remove('no-scroll');
            }, 200);
        });
    });

    /* Close modal by clicking on the mask */
    const modals = document.querySelectorAll<HTMLElement>('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', () => {
            const dialog = modal.querySelector<HTMLElement>('.modal__dialog');
            if (dialog) dialog.style.transform = 'scale(0)';
            
            setTimeout(() => {
                modal.classList.remove('show');
                document.body.classList.remove('no-scroll');
        }, 200);
    });
});

    const modalDialogs = document.querySelectorAll<HTMLElement>('.modal__dialog');
    modalDialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    /* Close modal by pushing Esc */
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector<HTMLElement>('.modal.show');
            if (!activeModal) return;
            
            const dialog = activeModal.querySelector<HTMLElement>('.modal__dialog');
            if (dialog) dialog.style.transform = 'scale(0)';
            
            setTimeout(() => {
                    activeModal.classList.remove('show');
                    document.body.classList.remove('no-scroll');
                }, 200);
            }
        });


    /* Slider: https://kenwheeler.github.io/slick/#go-get-it
     ======================================================== */
    // @ts-ignore
    $(worksSlider).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    document.querySelectorAll<HTMLElement>('.slickPrev').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = btn.closest('.modal');
            if (!modal) return;
            const currentSlider = modal.querySelector('[data-slider="slick"]');
            // @ts-ignore
            if (currentSlider) $(currentSlider).slick("slickPrev");
    });
});

    document.querySelectorAll<HTMLElement>('.slickNext').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = btn.closest('.modal');
            if (!modal) return;
            const currentSlider = modal.querySelector('[data-slider="slick"]');
            // @ts-ignore
            if (currentSlider) $(currentSlider).slick("slickNext");
    });
});
    /* Mobile nav */
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    navToggle?.addEventListener('click', (event) => {
        event.preventDefault();
        nav?.classList.toggle('show');
        console.log("clicked");
    });
});