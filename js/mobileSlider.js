var MobileSlider = {
    // Define current mobileSlide
    currentIndex: 0,

    init: function () {
        MobileSlider.mobAutoSlide();
        MobileSlider.mobPlayAutoClick();
        MobileSlider.mobNextSlideOnClick();
        MobileSlider.mobPrevSlideOnClick();
    },

    // Display the current mobileSlide
    mobActiveSlide: function () {
        var mobileSlides = $('.mobileSlides');
        var mobileSlide = mobileSlides.eq(MobileSlider.currentIndex);
        mobileSlides.hide();
        mobileSlide.show();
    },

    // Define the next mobileSlide as the current mobileSlide
    mobIndexPlus: function () {
        var mobileSlides = $('.mobileSlides');
        var mobSlidesNumber = mobileSlides.length;
        MobileSlider.currentIndex ++;
        if (MobileSlider.currentIndex > mobSlidesNumber - 1) {
            MobileSlider.currentIndex = 0;
        }
    },

    // Define the previous mobileSlide as the the current mobileSlide
    mobIndexMinus: function () {
        var mobileSlides = $('mobileSlides');
        var mobSlidesNumber = mobileSlides.length;
        MobileSlider.currentIndex --;
        if (MobileSlider.currentIndex < 0) {
            MobileSlider.currentIndex = mobSlidesNumber - 1;
        }
    },

    // automatic and controllable mobileSlide function
    mobAutoSlide: function () {
        var mobPlay = $('#mobileSliderPlay');
        mobPlay.click(function () {
            var mobTimer = setInterval(function () {
                MobileSlider.mobIndexPlus();
                MobileSlider.mobActiveSlide();
            }, 5000);
            var mobStop = $('#mobileSliderStop');
            mobStop.click(function () {
                clearInterval(mobTimer);
            });
        });

    },

    // automatic slider on load
    mobPlayAutoClick: function () {
        var mobPlay = $('#mobileSliderPlay');
        mobPlay.trigger('click');
    },

    // next mobileSlide on click on the ">" button
    mobNextSlideOnClick: function () {
        var mobNext = $('#mobNext');
        mobNext.click(function () {
            MobileSlider.mobIndexPlus();
            MobileSlider.mobActiveSlide();
        });
    },

    // previous mobileSlide on click on the "<" button
    mobPrevSlideOnClick: function () {
        var mobPrev = $('#mobPrev');
        mobPrev.click(function () {
            MobileSlider.mobIndexMinus();
            MobileSlider.mobActiveSlide();
        });
    },
}

$(document).ready(function () {
    var mobileSlides = $('.mobileSlides');
    console.log(mobileSlides);
    var mobileSlide = mobileSlides.eq(0);
    mobileSlides.hide();
    mobileSlide.show();
    MobileSlider.init();
});
