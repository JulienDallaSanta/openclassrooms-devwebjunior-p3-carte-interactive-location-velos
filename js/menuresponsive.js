$(document).ready(function(){
    var largeur = window.innerWidth;
    $("#li1").addClass("active");

    $("#li1").on('click',(event)=>{
        event.stopPropagation();
        $("nav>ul>li").removeClass("active");
        $("#li1").addClass("active");
        if( largeur <= 768){
            $('nav.active').hide();
        }
    });
    $("#li2").on('click',(event)=>{
        event.stopPropagation();
        $("nav>ul>li").removeClass("active");
        $("#li2").addClass("active");
        if( largeur <= 768){
            $('nav.active').hide();
        }
    });
    $("#li3").on('click',(event)=>{
        event.stopPropagation();
        $("nav>ul>li").removeClass("active");
        $("#li3").addClass("active");
        if( largeur <= 768){
            $('nav.active').hide();
        }
    });

    $(".menu-toggle").click(function(){
        $('nav').toggleClass("active");
        if( largeur <= 768){
            $('nav.active').show();
        }
    });
});
