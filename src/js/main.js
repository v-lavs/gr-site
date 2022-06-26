/**
 *To include js file from libraries write: `//= include ./path-to-file`
 * */

//= include ../lib/jquery-3.3.1.min.js
//= include ../lib/custom-select/js/jquery.nice-select.js
//= include ../lib/range-slider/ion.rangeSlider.min.js
//= include ../lib/jquery-ui.js
//= include ../lib/datepicker-de.js


/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {
    function setReviewSlideHeight(resizedWindowWidth) {

    }

    /**
     * SLIDER-REVIEWS
     **/

    function setSlideHeight() {

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


            if ($(window).width() < 768 && !logoSliderMob) {
                logoSliderMob = new Swiper('.logo-slider-mob', logoSettings);
            }
            else {
                if (logoSliderMob && logoSliderMob.initialized) {
                    logoSliderMob.destroy();
                }
            }

            windowW = resizedWindowWidth;

        }
    });

    var eventTimer;

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

            const val = this.value;
            clearTimeout(eventTimer);
            eventTimer = setTimeout(function() {
                console.log({from, to}, 'event finished')
            }, 250);
        });
    });


    var carDataSlider = new Swiper(".car-data-slider", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //DATEPICKER
    const date = new Date();
    date.setDate(date.getDate());

    $("#datepicker").datepicker({
        minDate: date,
        onSelect: function (date) {
            $('#datepicker_value').val(date)
        },

    });

    $( function() {
        $( "#datepicker" ).datepicker();
        var dateFormat = "mm/dd/yy",
            from = $( "#from" )
                .datepicker({
                    // defaultDate: "+1w",
                    numberOfMonths: 1
                })
                .on( "change", function() {
                    to.datepicker( "option", "minDate", getDate( this ) );
                }),
            to = $( "#to" ).datepicker({
                // defaultDate: "+1w",
                numberOfMonths: 1
            })
                .on( "change", function() {
                    from.datepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );
    $( function() {
        $( "#datepicker" ).datepicker();
        var dateFormat = "mm/dd/yy",
            from = $( "#angebotFrom" )
                .datepicker({
                    // defaultDate: "+1w",
                    numberOfMonths: 1
                })
                .on( "change", function() {
                    to.datepicker( "option", "minDate", getDate( this ) );
                }),
            to = $( "#angebotTo" ).datepicker({
                // defaultDate: "+1w",
                numberOfMonths: 1
            })
                .on( "change", function() {
                    from.datepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );

    $('.modal-toggle').on('click', function (e) {
        e.preventDefault();

        const modalID = $(this).data('modal');
        const modal = $('#' + modalID);
        modal.fadeIn();
        jQuery('.backdrop').fadeIn();
        $("body").addClass("modal-open");
    });

    $('.modal__close, .backdrop').on('click', function (e) {
        e.preventDefault();
        $('.modal').fadeOut();
        jQuery('.backdrop').fadeOut();
        $("body").removeClass("modal-open");
    });
});