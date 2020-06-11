var MobileSlider = {
    // Define current mobileSlide
    currentIndex: 0,

    init: function () {
        mobileSliderElt = $("#mobileSlider");
        $(document).load(function () {this.mobAutoSlide(); });
        mobileSliderElt.on("touchstart", (e) => { this.handleStart(e); });
        window.addEventListener("touchmove", (e) => { this.handleMove(e); }, { passive: false });
        window.addEventListener("touchend", (e) => { this.handleEnd(e); });
        window.addEventListener("touchcancel", (e) => { this.handleEnd(e); });
        //this.mobPrevNextSlideOnTouch();
    },

    // Display the current mobileSlide
    mobActiveSlide: function () {
        var mobileSlides = $('.mobileSlides');
        var mobileSlide = mobileSlides.eq(this.currentIndex);
        mobileSlides.hide();
        mobileSlide.show();
        console.log(this.currentIndex);
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
        console.log('mobautoslide');
        timer = setInterval(() => {
            this.mobIndexPlus();
            this.mobActiveSlide();
        }, 5000);
    },

    //fonction de désactivation du prev/next slide
    disableAutoslide: function () {
        console.log('disableautoslide');
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
            //window.addEventListener("touchmove", function () { e.preventDefault(); });
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
        console.log('handleEnd');
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

$(document).ready(function () {
    $("#mobileSlider").on('dragstart', e => e.preventDefault());
    var mobileSlides = $('.mobileSlides');
    var mobileSlide = mobileSlides.eq(0);
    mobileSlides.hide();
    mobileSlide.show();
    MobileSlider.init();
});
