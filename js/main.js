$(document).ready(function(){
//-----------show/hide du bouton backtotop---------
    $("#mobiletopbtn").hide();
    var largeur = $(window).width();
    if(largeur <= 768){
        $("#rgpd").addClass('forMobileDevices');
        $(window).scroll(function(){
            if(window.scrollY>=300){
                $("#mobiletopbtn").show();
            }else{
                $("#mobiletopbtn").hide();
            }
        });
    }else{
        $("#mobiletopbtn").hide();
        $("#rgpd").removeClass('forMobileDevices');
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
