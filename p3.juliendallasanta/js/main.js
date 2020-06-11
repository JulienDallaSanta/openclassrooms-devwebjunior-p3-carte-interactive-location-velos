$(document).ready(function(){
//-----------show/hide du bouton backtotop---------
    $("#mobiletopbtn").hide();
    var largeur = $(window).width();
    if(largeur <= 768){
        $("#mobrgpd").show();
        $(window).scroll(function(){
            if(window.scrollY>=300){
                $("#mobiletopbtn").show();
            }else{
                $("#mobiletopbtn").hide();
            }
        });
    }else{
        $("#mobiletopbtn").hide();
        $("#rgpd").show();
    }
//-----------boutons du RGPD---------
    $(".fa-check-circle").on('click', ()=>{
        $("#rgpd").hide();
    });
    $(".fa-times-circle").on('click', ()=>{
        $("#rgpd").hide();
        $("#mobrgpd").hide();
    });
});
