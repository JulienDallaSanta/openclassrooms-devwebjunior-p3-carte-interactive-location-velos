jQuery(function($){
    var m = 20;
    var s = 0;
    $('#minutes').html('<strong>'+m+'</strong>Minute'+(m>1?'s':''));
    $('#secondes').html('<strong>'+s+'</strong>Seconde'+(s>1?'s':''));

/*    setMinutes();
    setSeconds();
    if(s<0){
        s=59;
    };
    if(s==0 && m==0){
        window.clearInterval(setSeconds);
    };

    function setMinutes(){
        m -= 1;
        $('#minutes').html('<strong>'+m+'</strong>Minute'+(m>1?'s':''));
        window.setInterval(setMinutes,60000);
        if(m=0){
            window.clearInterval(setMinutes);
        }
    }
    function setSeconds(){
        s -= 1;
        $('#secondes').html('<strong>'+s+'</strong>Seconde'+(s>1?'s':''));
        window.setInterval(setSeconds,1000);
    }
*/
    function setTime(){
        for(i=59; i>=0; i--){
            s = i;
        }
        $('#minutes').html('<strong>'+m+'</strong>Minute'+(m>1?'s':''));
        $('#secondes').html('<strong>'+s+'</strong>Seconde'+(s>1?'s':''));
    }
    if(s<0){
        m-=1;
        s=59;
        setTime();
    }
    if(m==0 && s==0){
        $('#data_time').html('Vous avez dépassé les 20 minutes, votre réservation est annulée.');
        $('decompte').html('');
    }
});
