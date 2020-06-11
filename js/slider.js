var Slider = {
    // Define current slide
    currentIndex: 0,

    init: function () {
        this.autoSlide();
        this.playAutoClick();
        this.nextSlideOnClick();
        this.prevSlideOnClick();
        this.changeSlideOnKeypress();
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

/*-----slider for mobile devices-----*/
var MobileSlider = {
    // Define current mobileSlide
    currentIndex: 0,

    init: function () {
        mobileSliderElt = $("#mobileSlider");
        $(document).ready(() => { this.mobAutoSlide(); });
        mobileSliderElt.on("touchstart", (e) => { this.handleStart(e); });
        window.addEventListener("touchmove", (e) => { this.handleMove(e); }, { passive: false });
        window.addEventListener("touchend", (e) => { this.handleEnd(e); });
        window.addEventListener("touchcancel", (e) => { this.handleEnd(e); });
    },

    // Display the current mobileSlide
    mobActiveSlide: function () {
        var mobileSlides = $('.mobileSlides');
        var mobileSlide = mobileSlides.eq(this.currentIndex);
        mobileSlides.hide();
        mobileSlide.show();
    },

    // Define the next mobileSlide as the current mobileSlide
    mobIndexPlus: function () {
        var mobileSlides = $('.mobileSlides');
        var mobSlidesNumber = mobileSlides.length;
        this.currentIndex ++;
        if (this.currentIndex > mobSlidesNumber - 1) {
            this.currentIndex = 0;
        }
    },

    // Define the previous mobileSlide as the the current mobileSlide
    mobIndexMinus: function () {
        var mobileSlides = $('.mobileSlides');
        var mobSlidesNumber = mobileSlides.length;
        this.currentIndex --;

        if (this.currentIndex < 0) {
            this.currentIndex = mobSlidesNumber - 1;
        }
    },

    // automatic and controllable mobileSlide function
    mobAutoSlide: function () {
        timer = setInterval(() => {
            this.mobIndexPlus();
            this.mobActiveSlide();
        }, 5000);
    },

    //fonction de désactivation du prev/next slide
    disableAutoslide: function () {
        clearInterval(timer);
    },

    //Démarre le déplacement au toucher
    handleStart: function (e) {
        this.painting = true;
        if(e.touches){
            // Coordonnées de la souris :
            this.origin = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            this.disableAutoslide();
            return this.origin;
        }
    },

    handleMove: function (e) {
        // Mouvement de la souris sur le canvas :
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (!this.painting) return;
        // Set Coordonnées de la souris :
        var touches = e.changedTouches;
        var move = { x: e.touches[touches.length-1].pageX, y: e.touches[touches.length-1].pageY };
        if(Math.abs(move.y - this.origin.y) > Math.abs(move.x - this.origin.x)){
            this.painting = false;
            return;
        } else {
            e.preventDefault();
            if(Math.abs((this.origin.x - move.x) / window.innerWidth) > 0.15){
                if((this.origin.x - move.x) > 0){
                    this.mobIndexPlus();
                }

                else {
                    this.mobIndexMinus();
                }
                this.mobActiveSlide();
                this.painting = false
            }

        }
    },

    handleEnd: function () {
        // Relachement du toucher sur tout le document :
        if(this.painting == false){
            if(timer == true){
            } else{
                this.mobAutoSlide();
            }
            return;
        }
        this.painting = false;
        this.started = false;

    }
}

/*-------init the 2 sliders when doc is ready-------*/
$(document).ready(function () {
    var slides = $('.slide');
    var slide = slides.eq(0);
    slides.hide();
    slide.fadeIn();
    Slider.init();
    $("#mobileSlider").on('dragstart', e => e.preventDefault());
    var mobileSlides = $('.mobileSlides');
    var mobileSlide = mobileSlides.eq(0);
    mobileSlides.hide();
    mobileSlide.show();
    MobileSlider.init();
});
