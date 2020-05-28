$(document).ready(function(){
    //-----------show/hide du bouton backtotop---------
    $("#mobiletopbtn").hide();
    var largeur = $(window).width();
    if(largeur <= 768){
        $(window).scroll(function(){
            if(window.scrollY>=300){
                $("#mobiletopbtn").show();
            }else{
                $("#mobiletopbtn").hide();
            }
        });
    }else{
        $("#mobiletopbtn").hide();
    }
});
