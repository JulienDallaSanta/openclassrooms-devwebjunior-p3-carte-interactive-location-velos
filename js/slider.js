var Slider = {
    // Define current slide
    currentIndex: 0,

    init: function () {
        Slider.autoSlide();
        Slider.playAutoClick();
        Slider.nextSlideOnClick();
        Slider.prevSlideOnClick();
        Slider.changeSlideOnKeypress();
    },

    // Display the current slide
    activeSlide: function () {
        var slides = $('.slide');
        var slide = slides.eq(Slider.currentIndex);
        slides.hide();
        slide.fadeIn();
    },

    // Define the next slide as the current slide
    indexPlus: function () {
        var slides = $('.slide');
        var slidesNumber = slides.length;
        Slider.currentIndex ++;
        if (Slider.currentIndex > slidesNumber - 1) {
            Slider.currentIndex = 0;
        }
    },

    // Define the previous slide as the the current slide
    indexMinus: function () {
        var slides = $('.slide');
        var slidesNumber = slides.length;
        Slider.currentIndex --;
        if (Slider.currentIndex < 0) {
            Slider.currentIndex = slidesNumber - 1;
        }
    },

    // automatic and controllable slide function
    autoSlide: function () {
        var play = $('#play');
        play.click(function () {
            var timer = setInterval(function () {
                Slider.indexPlus();
                Slider.activeSlide();
            }, 5000);
            var stop = $('#stop');
            stop.click(function () {
                clearInterval(timer);
            });
        });

    },

    // automatic slider on load
    playAutoClick: function () {
        var play = $('#play');
        play.trigger('click');
    },

    // next slide on click on the ">" button
    nextSlideOnClick: function () {
        var next = $('#next');
        next.click(function () {
            Slider.indexPlus();
            Slider.activeSlide();
        });
    },

    // previous slide on click on the "<" button
    prevSlideOnClick: function () {
        var prev = $('#prev');
        prev.click(function () {
            Slider.indexMinus();
            Slider.activeSlide();
        });
    },

    // previous / next slide with keyboard
    changeSlideOnKeypress: function () {
        $('body').keydown(function (e) {
            if (e.which === 39) {
                Slider.indexPlus();
                Slider.activeSlide();
            } else if (e.which === 37) {
                Slider.indexMinus();
                Slider.activeSlide();
            }
        })
    },
}

$(document).ready(function () {
    var slides = $('.slide');
    var slide = slides.eq(0);
    slides.hide();
    slide.fadeIn();
    Slider.init();
});