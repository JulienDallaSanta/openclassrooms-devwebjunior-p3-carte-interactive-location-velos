$(document).ready(function(){
    $("#li1").addClass("active");
    console.log($("nav>ul>li"));

    $("#li1").on('click',(event)=>{
        event.stopPropagation();
        event.preventDefault();
        $("nav>ul>li").removeClass("active");
        $("#li1").addClass("active");
    });
    $("#li2").on('click',(event)=>{
        event.stopPropagation();
        event.preventDefault();
        $("nav>ul>li").removeClass("active");
        $("#li2").addClass("active");
    });
    $("#li3").on('click',(event)=>{
        event.stopPropagation();
        event.preventDefault();
        $("nav>ul>li").removeClass("active");
        $("#li3").addClass("active");
    });

    $(".menu-toggle").click(function(){
        $('nav').toggleClass("active");
    });
});
