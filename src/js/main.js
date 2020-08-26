/**
 *To include js file from libraries write: `//= include ./path-to-file`
 * */

//= include ../lib/jquery-3.3.1.min.js
//= include ../lib/jquery-nice-select-1.1.0/js/jquery.nice-select.js


/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {
    function setReviewSlideHeight(resizedWindowWidth) {
        if (resizedWindowWidth > 580) {
            setSlideHeight();
        } else {
            $('.slider-reviews').css({height: ''})
        }
    }

    /**
     * SLIDER-BRANDS
     **/
    var brandsSettings = {
        navigation: {
            nextEl: '#popularBrandsPagination .swiper-button-next',
            prevEl: '#popularBrandsPagination .swiper-button-prev',
        },
        pagination: {
            el: '#popularBrandsPagination .swiper-pagination',
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            1050: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            1381: {
                slidesPerView: 3,
                watchOverflow: true,
            }
        }
    };
    var swiperBrands = new Swiper('.slider-brands', brandsSettings);


    /**
     * SLIDER-REVIEWS
     **/

    function setSlideHeight() {
        var $slides = $('.slider-reviews .swiper-slide');
        var heightArr = $slides.map(function (index) {
            return $(this).find('.card-review').height();
        });
        var maxSlideHeight = Math.round(Math.max.apply(Math, heightArr));
        $('.slider-reviews').css({height: maxSlideHeight});
    }

    setSlideHeight();

    var reviewSettings = {
        // direction: 'vertical',
        navigation: {
            nextEl: '#reviewsPagination  .swiper-button-next',
            prevEl: '#reviewsPagination  .swiper-button-prev',
        },
        pagination: {
            el: '#reviewsPagination .swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        observeParents: true,
        breakpoints: {
            0: {
                direction: 'horizontal',
                slidesPerView: 1,
                spaceBetween: 30,
                autoHeight: true,
            },
            581: {
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 100,
            },
            1920: {
                direction: 'vertical',
                spaceBetween: 100,
            }
        }
    };
    var swiperReviews = new Swiper('.slider-reviews', reviewSettings);

    /**
     * SLIDER-LOGO
     **/
    var logoSettings = {
        slidesPerView: 5,
        freeMode: true,
    };

    var logoSliderMob;

    if ($(window).width() < 767) {
        logoSliderMob = new Swiper('.logo-slider-mob', logoSettings);
    }


    /**
     * CUSTOM SELECT
     **/

    $('.custom-select').niceSelect();


    /**
     * CARD HEIGHT
     **/

    function setEqualHeight() {
        var max_card_height = 0;
        var $advantagesCards = $('.advantages-card');
        $advantagesCards.each(function () {
            if ($(this).height() > max_card_height) {
                max_card_height = $(this).height();
            }
        });
        $advantagesCards.css({minHeight: $(window).width() > 767 ? max_card_height : 'auto'});
    }

    setEqualHeight();

    var windowW = $(window).width();

    setReviewSlideHeight(windowW);

    $(window).on('resize orientationchange', function () {
        var resizedWindowWidth = $(window).width();

        if (windowW !== resizedWindowWidth) {
            swiperReviews.destroy(true, true);

            if ($(window).width() < 768 && !logoSliderMob) {
                logoSliderMob = new Swiper('.logo-slider-mob', logoSettings);
            } else {
                logoSliderMob.destroy();
            }

            windowW = resizedWindowWidth;

            setReviewSlideHeight(resizedWindowWidth);

            swiperReviews = new Swiper('.slider-reviews', reviewSettings);

            setEqualHeight();
        }
    })
})
;