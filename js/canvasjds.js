class Sign{
    constructor(parent, width, height){
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.buildCanvas();
        this.canvas = $("#canvas");
        this.context = this.canvas[0].getContext('2d');
        // Variables :
        this.color = "#000";
        this.painting = false;
        this.started = false;
        this.width_brush = 1;
        this.cursorX = null;
        this.cursorY = null;
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        // Paramètrage des eventListener
        this.mousedown();
        this.mouseup();
        this.mousemove();
    }
    // Fonction qui insert le canvas :
    buildCanvas(){
        $(this.parent).append($(`
        <canvas id="canvas" >
            <p>Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour</p>
        </canvas>
        `));
    }
    // Fonctions pour les event :
    mousedown() {
        // Click souris enfoncé sur le canvas, je dessine :
        $(this.canvas).mousedown((e) => {
            this.painting = true;
            // Coordonnées de la souris :
            this.cursorX = (e.pageX - this.canvas[0].offsetLeft);
            this.cursorY = (e.pageY - this.canvas[0].offsetTop);
        });

    }
    mouseup() {
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        $(this.canvas).mouseup(() => {
            this.painting = false;
            this.started = false;
        });
    }
    mousemove() {
        // Mouvement de la souris sur le canvas :
        $(this.canvas).mousemove((e) => {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (this.painting) {
                // Set Coordonnées de la souris :
                this.cursorX = (e.pageX - this.canvas[0].offsetLeft) - 2;
                this.cursorY = (e.pageY - this.canvas[0].offsetTop) - 2;
                this.drawLine();
            }
        });
    }

    // Fonction qui dessine une ligne :
    drawLine() {
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            this.context.moveTo(this.cursorX, this.cursorY);
            this.context.beginPath();
            this.started = true;
        }
        // Sinon je dessine
        else {
            this.context.lineTo(this.cursorX, this.cursorY);
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

function submitForm(event){
    event.preventDefault();
    event.stopPropagation();
}

function rescan(event){
    event.preventDefault();
    event.stopPropagation();
    $('#subForm').hide();

    $('#form_container').append($(`
        <div id="canvas_container">
            <div id="canvas_message">
                <p>Signez dans la case pour confirmer :</p>
            </div>
            <div id="canvas_div"></div>
            <div id="canvas_confirm">
                <button type="submit" id="submit_res">Validez</button>
                <button type="reset" id="clear_canvas">Effacer</button>
            </div>
        </div>
    `));

    let maSignature = new Sign($('#canvas_div'), '300px', '150px');

    $('#clear_canvas').on("click", () => maSignature.clearCanvas());
    $('#submit_res').click(() => {

        $("#resCont").show();
        //get canvas into blob && store it into a var
        maSignature.canvas[0].toDataURL().replace(/^data:.+;base64,/, '');

        //get filled datas && store it into vars
        let nomForm = $("#name").val();
        let prenomForm = $("#firstname").val();
        let prenomNom = prenomForm + " " + nomForm;
        console.log(prenomForm);
        console.log(nomForm);
        console.log(prenomNom);

        //check signature && datas
        $("#res_status_span").html("1");
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
        function countdown(){
            var now = new Date();
            console.log(now);
            var s = (timeout.getTime() - now.getTime()) /1000;
            var m = Math.floor(s/60);
            s -= m*60;
            s = Math.floor(s);
            $('#minutes').html('<strong class="timetext">'+m+'</strong><br/>Minute'+(m>1 ?'s':''));
            $('#secondes').html('<strong class="timetext">'+s+'</strong><br/>Seconde'+(s>1 ?'s':''));
            setTimeout(countdown,1000);
        }
        /*if(s==0 && m==0){
            clearInterval(countdown);
        }*/
        $('#decompte').show();
        //save datas into cookies
        //create countdown

        $('#canvas_confirm').html(`
            <p id="merci">Merci !</p>
        `);
    });
}
