var MobileSlider = {
    // Define current mobileSlide
    currentIndex: 0,

    init: function () {
        mobileSliderElt = $("#mobileSlider")
        this.mobAutoSlide();
        mobileSliderElt.on("touchstart", (e) => { this.handleStart(e); });
        window.addEventListener("touchmove", (e) => { this.handleMove(e); });
        window.addEventListener("touchend", (e) => { this.handleEnd(e); });
        window.addEventListener("touchcancel", (e) => { this.handleEnd(e); });
        //MobileSlider.mobPrevNextSlideOnTouch();
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
        var mobileSlides = $('.mobileSlides');
        var mobSlidesNumber = mobileSlides.length;
        MobileSlider.currentIndex --;

        if (MobileSlider.currentIndex < 0) {
            MobileSlider.currentIndex = mobSlidesNumber - 1;
        }
    },

    // automatic and controllable mobileSlide function
    mobAutoSlide: function () {
        timer = setInterval(function () {
            MobileSlider.mobIndexPlus();
            MobileSlider.mobActiveSlide();
        }, 5000);
    },

    //fonction de désactivation du prev/next slide
    disableAutoslide: function () {
        clearInterval(timer);
    },

    //Démarre le déplacement au toucher
    handleStart: function (e) {
        e.preventDefault();
        this.painting = true;
        if(e.touches){
            this.disableAutoslide();
            // Coordonnées de la souris :
            this.origin = { x: e.touches[0].pageX, y: e.touches[0].pageY };
        }
    },

    handleMove: function (e) {
        // Mouvement de la souris sur le canvas :
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (!this.painting) return;
        // Set Coordonnées de la souris :
        var pageX = e.touches[0].pageX - 2;
        var pageY = e.touches[0].pageY - 2;
        var touches = e.changedTouches;
        if(Math.abs((this.origin.x - pageX) / window.innerWidth) > 0.15){
            if((this.origin.x - pageX) > 0){
                this.mobIndexPlus();
            }
            else {
                console.log('test');
                this.mobIndexMinus();
            }
            this.mobActiveSlide();
            this.painting = false
        }

    },

    handleEnd: function () {
        // Relachement du toucher sur tout le document :
        this.painting = false;
        this.started = false;
        this.mobAutoSlide();
    }
}

$(document).ready(function () {
    $("#mobileSlider").on('dragstart', e => e.preventDefault());
    var mobileSlides = $('.mobileSlides');
    var mobileSlide = mobileSlides.eq(0);
    mobileSlides.hide();
    mobileSlide.show();
    MobileSlider.init();
});
