/**
 *To include js file from libraries write: `//= include ./path-to-file`
 * */

//= include ../lib/jquery-3.3.1.min.js
//= include ../lib/custom-select/js/jquery.nice-select.js
//= include ../lib/range-slider/ion.rangeSlider.min.js


/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {
    function setReviewSlideHeight(resizedWindowWidth) {
        // if (resizedWindowWidth > 580) {
        //     setSlideHeight();
        // } else {
        //     $('.slider-reviews').css({height: ''})
        // }
    }

    /**
     * SLIDER-REVIEWS
     **/

    function setSlideHeight() {
        // var $slides = $('.slider-reviews .swiper-slide');
        // var heightArr = $slides.map(function (index) {
        //     return $(this).find('.card-review').height();
        // });
        // var maxSlideHeight = Math.round(Math.max.apply(Math, heightArr));
        // $('.slider-reviews').css({height: maxSlideHeight});
    }

    setSlideHeight();


    // SLIDER-LOGO

    var logoSettings = {
        slidesPerView: 5,
        freeMode: true,
    };

    var logoSliderMob;

    if ($(window).width() < 767) {
        logoSliderMob = new Swiper('.logo-slider-mob', logoSettings);
    }


    //SLIDER-GALLERY

    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        allowTouchMove: false,
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });


    // CUSTOM SELECT

    $('.custom-select').niceSelect();


    // CARD HEIGHT

    function setEqualHeight(selector, breakpoint) {
        var max_block_height = 0;
        var $blockContent = $(selector);
        $blockContent.each(function () {
            if ($(this).height() > max_block_height) {
                max_block_height = $(this).height();
            }
        });
        $blockContent.css({
            minHeight: $(window).width() > breakpoint ? max_block_height : 'auto'
        });
    }

    function combyHeight() {
        setEqualHeight('.block-advantages .advantages-card', 767);

    }

    combyHeight();


    var windowW = $(window).width();

    setReviewSlideHeight(windowW);

    $(window).on('resize orientationchange', function () {
        var resizedWindowWidth = $(window).width();

        if (windowW !== resizedWindowWidth) {
            // if (swiperReviews && swiperReviews.initialized) {
            //     swiperReviews.destroy(true, true);
            // }

            if ($(window).width() < 768 && !logoSliderMob) {
                logoSliderMob = new Swiper('.logo-slider-mob', logoSettings);
            }
            else {
                if (logoSliderMob && logoSliderMob.initialized) {
                    logoSliderMob.destroy();
                }
            }

            windowW = resizedWindowWidth;

            // setReviewSlideHeight(resizedWindowWidth);
            //
            // swiperReviews = new Swiper('.slider-reviews', reviewSettings);
            //
            // setEqualHeight();
        }
    });

    // RANGE-SLIDER
    var sliders = $(".js-range-slider").each(function (i, $item) {
        var $input = $($item);
        $input.ionRangeSlider({
            skin: "sharp",
            type: "double",
            min: $input.attr('min'),
            max: $input.attr('max'),
            from: 0,
            hide_from_to: true
        });

        $input.on('change', function () {
            var $inp = $(this);
            var from = $inp.data("from");
            var to = $inp.data("to");
            $inp.parents('.wrap-range').find('.from-value').html(from);
            $inp.parents('.wrap-range').find('.to-value').html(to);
        });
    });

});