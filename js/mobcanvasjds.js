class mobSign{
    constructor(parent, width, height){
        this.parent = parent;
        this.buildCanvas();
        this.canvas = $("#mobcanvas");
        this.width = this.canvas.width();
        this.height = this.canvas.height();
        this.context = this.canvas[0].getContext('2d');
        // Variables :
        this.color = "#000";
        this.painting = false;
        this.started = false;
        this.width_brush = 1;
        this.cursorX = null;
        this.cursorY = null;
        this.touchX = null;
        this.touchY = null;
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        // Paramètrage des eventListener
        this.startup();
    }
    // Fonction qui insert le canvas :
    buildCanvas(){
        $(this.parent).append($(`
        <canvas id="mobcanvas">
            <p>Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour</p>
        </canvas>
        `));
    }
    //-------------------Fonctions pour les event :-----------------------
    // Fonction qui initialise les events de touch sur le canvas :
    startup() {
        var el = this.canvas[0];
        el.addEventListener("touchstart", e => this.handleStart(e), false);
        el.addEventListener("touchend", e => this.handleEnd(e), false);
        el.addEventListener("touchmove", e => this.handleMove(e), false);
      }
    // 1er touch du canvas :
    handleStart(e) {
        // Je touche le canvas, je dessine :
        this.painting = true;
        // Coordonnées du touch :
        var touches = e.changedTouches;
        for(var i=0; i<touches.length; i++){
            console.log(this);
            this.canvas[0].touchX = (touches[i].pageX - this.canvas[0].offsetLeft);
            this.touchY = (touches[i].pageY - this.canvas[0].offsetTop);
        }
    }
    handleEnd() {
        // Relachement du touch sur tout le document, j'arrête de dessiner :
        this.painting = false;
        this.started = false;
    }
    handleMove(e) {
        // annule le silde sur le canvas :
        e.preventDefault();
        e.stopPropagation();
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (this.painting) {
            // Set Coordonnées de la souris :
            var touches = e.changedTouches;
            console.log(touches);
            for(var i =0; i<touches.length; i++){
                this.touchX = (touches[i].clientX - this.canvas[0].offsetLeft) - 2 - (touches[i].radiusX/2);
                console.log(touches[i].pageX, this.canvas[0].offsetLeft);
                this.touchY = (touches[i].clientY - this.canvas[0].offsetTop) - 2 - (touches[i].radiusY/2);
                //console.log({x:this.touchX, y:this.touchY});
                console.log(touches[i].pageY, this.canvas[0].offsetTop);
                this.drawLine();
            }
        }
    }

    // Fonction qui dessine une ligne :
    drawLine() {
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            this.context.moveTo(this.touchX, this.touchY);
            this.context.beginPath();
            this.started = true;
        }
        // Sinon je dessine
        else {
            this.context.lineTo(this.touchX, this.touchY);
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.width_brush;
            this.context.stroke();
        }
    }

    generateBlob() {
        return new Promise((resolve, reject) =>{
            this.canvas[0].toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg", 1)
        })
    }

    // Fonction pour effacer le contenu du canvas :
    clearCanvas() {
        this.context.clearRect(0, 0, 300, 150);
    }
}

function popUpAbort(){
    $('.bg-modal-abort').css('display', 'flex');
    $('.close-abort').on('click', ()=>{
        $('.bg-modal-abort').css('display', 'none');
        location.reload(true);
    });
}
function popUpEnd(){
    $('.bg-modal-end').css('display', 'flex');
    $('.close-end').on('click', ()=>{
        $('.bg-modal-end').css('display', 'none');
        location.reload(true);
    });
}

function mobrescan(event){
    event.preventDefault();
    event.stopPropagation();
    $("#modal-content1").css('left', '0');
    $("#modal-content2").css('left', '0');
    $(".popup-arrow").css('right', '-12%');
    var regex = /^[a-zâäàéèùêëîïôöçñ]+[^0-9]+$/i;
    if (regex.test($('#name').val()) && regex.test($('#firstname').val())){
        $('#mobsubForm').disabled = false;
        $('#mobsubForm').hide();
        $('#mobform_content').append($(`
            <div id="mobcanvas_container">
                <div id="mobcanvas_message">
                    <p>Signez dans la case pour confirmer :</p>
                </div>
                <div id="mobcanvas_div"></div>
                <div id="mobcanvas_confirm">
                    <button type="submit" id="mobsubmit_res">Validez</button>
                    <button type="reset" id="mobclear_canvas">Effacer</button>
                </div>
            </div>
        `));

        let maSignature = new mobSign($('#mobcanvas_div'), '300px', '150px');

        $('#mobclear_canvas').on("click", () => maSignature.clearCanvas());
        $('#mobsubmit_res').click(() => {
            $('#mobform_container').hide();
            $("#res_thx").show();
            //création du container (visu sign + abort resa)
            $("#resCont").append(`
                <div id="res_sign_abort">
                    <div id="show_sign">
                        <button id="show_sign_but" class="data_button"><p>Visualiser votre signature</p></button>
                        <div class="arrow-down"></div>
                    </div>
                    <div id="signImgCont">
                        <img id="show_sign_img"></img>
                    </div>
                    <button id="abort" class="data_button"><p>Annuler la réservation</p></button>
                </div>
            `);
            $("#signImgCont").hide();
            $("#res_sign_abort").show();
            $("#abort").on('click',()=>{
                location.reload(true);
                alert("L'annulation de votre réservation à bien été prise en compte.");
            });
            //get canvas into blob && store it into a var
            let blobToData = maSignature.canvas[0].toDataURL();
            localStorage.setItem('signature', maSignature.canvas[0]);

            //get filled datas && store it into vars
            let nomForm = localStorage.getItem('name');
            let prenomForm = localStorage.getItem('firstname');;
            let prenomNom = prenomForm + " " + nomForm;
            console.log(prenomNom);

            //check signature && datas
            if($("#res_status_span").textContent = "Pas de"){
                $("#res_status_span").html("1");
            }else{
                $("#res_status_span").textContent += 1;
            }
            $("#res_thx_span").text(prenomNom);
            $("#data_station").append(`
                <p>Vous venez de réservez un vélo à la station </p>
                ${$("#formStatName").text()}
            `);
            $("#data_adresse").append(`
                <p>située au </p>
                ${$("#formAddress").text()}
            `);
            $("#data_time").text("Votre réservation s'annulera dans : ");
            const timebase = new Date();
            var timeout = new Date();
            timeout.setTime(timebase.getTime() + (30*60*1000));
            countdown();

            $("#decompte").css('display','flex');
            function countdown(){
                var now = new Date();
                var s = (timeout.getTime() - now.getTime()) /1000;
                var m = Math.floor(s/60);
                s -= m*60;
                s = Math.floor(s);
                $('#minutes').html('<strong class="timetext">'+m+'</strong><br/>Minute'+(m>1 ?'s':''));
                $('#secondes').html('<strong class="timetext">'+s+'</strong><br/>Seconde'+(s>1 ?'s':''));
                setTimeout(countdown,1000);
                if(m==0 && s==0){
                    location.reload(true);
                    alert("Votre réservation vient d'expirer car le délai de 30 minutes est dépassé. Vous pouvez de nouveau réserver un vélo.");
                }
            }
            //EVENT DE VISU/HIDE DE LA SIGNATURE AU CLICK DU BOUTON
            const arrow = $(".arrow-down");
            const mySign = $("#signImgCont");
            $("#show_sign_img").attr('src', blobToData);
            $("#show_sign").on("click", ()=>{
                arrow.toggle();
                mySign.toggle();
                console.log(mySign.css('display'));
            });
        });
    }else if(!regex.test($('#name').val()) && !regex.test($('#firstname').val())){
        $('#modal-content1').css('display', 'flex');
        $('#close1').on('click', ()=>{
            $('#modal-content1').css('display', 'none');
        });
        $('#modal-content2').css('display', 'flex');
        $('#close2').on('click', ()=>{
            $('#modal-content2').css('display', 'none');
        });
    }else if(!regex.test($('#name').val())){
        $('#modal-content1').css('display', 'flex');
        $('#close1').on('click', ()=>{
            $('#modal-content1').css('display', 'none');
        });
    }else if(!regex.test($('#firstname').val())){
        $('#modal-content2').css('display', 'flex');
        $('#close2').on('click', ()=>{
            $('#modal-content2').css('display', 'none');
        });
    }
    saveToLocalStorage();
}
