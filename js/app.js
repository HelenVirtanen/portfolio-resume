$(function() {

    const worksSlider = $('[data-slider="slick"]');
    
    /* Works filter 
    ==================== */
    let filter = $("[data-filter]");

    filter.on("click", function(event)
    {
        event.preventDefault();
        let cat = $(this).data('filter');
        
        if (cat == "all") {
            $("[data-cat]").removeClass('hide');
        } else {
            $("[data-cat]").each(function()
            {
            let workCat = $(this).data('cat');
            console.log(workCat)

            if (workCat != cat) {
                $(this).addClass('hide');
            } else {
                $(this).removeClass('hide');
            }
            });
        }   
    });

    /* Modal 
    ==================== */

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");


    /* Open modal 
    ====================*/
    modalCall.on("click", function(event)
    {
        event.preventDefault();
        let $this = $(this);
        let modalId = $this.data('modal');
        
        $(modalId).addClass('show');
        $("body").addClass('no-scroll');
    
    // open with span effect
        setTimeout(function () {
            $(modalId).find(".modal__dialog").css({
                transform: "scale(1)"
            });
        }, 200);

        worksSlider.slick('setPosition');
    });


    /* Close modal with close button */

    modalClose.on("click", function(event)
    {
        event.preventDefault();
        let $this = $(this);
        let modalParent = $this.parents('.modal'); 
        
        modalParent.find(".modal__dialog").css({
                transform: "scale(0)"
        });

        setTimeout(function () {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });

    /* Close modal by clicking on the mask */

    $(".modal").on("click", function(event) {
        let $this = $(this);
        $this.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function () {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);   
    });

    $(".modal__dialog").on("click", function(event) {
        event.stopPropagation();
    })

    /* Close modal by pushing Esc */
    $(document).on("keydown", function(event) {
        if (event.keyCode === 27) {
            let $modal = $(".modal.show");
            if ($modal.length) {
                $modal.find(".modal__dialog").css({
                    transform: "scale(0)"
                });
    
                setTimeout(function () {
                    $modal.removeClass("show");
                    $("body").removeClass("no-scroll");
                }, 200);
            }
        }
    });


    /* Slider: https://kenwheeler.github.io/slick/#go-get-it
     ======================================================== */

    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    $(".slickPrev").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

        currentSlider.slick("slickPrev");
    });

    $(".slickNext").on("click", function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

        currentSlider.slick("slickNext");
    });

    /* Mobile nav 
    ==========================*/
    const navToggle = $("#navToggle");
    const nav = $("#nav");

    navToggle.on("click", function(event) {
        event.preventDefault();
        nav.toggleClass("show");
        console.log("clicked");
    });
});