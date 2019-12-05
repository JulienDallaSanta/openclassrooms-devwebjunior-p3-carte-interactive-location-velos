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

function rescan(event){
    event.stopPropagation();
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
    `))
    console.log($('#canvas_div').width());
    let maSignature = new Sign($('#canvas_div'), '300px', '150px');
    console.log($('#canvas'))

    $('#clear_canvas').on("click", () => maSignature.clearCanvas());
    $('#submit_res').click(() => {
        /*//get canvas into blob && store it into a var
        let promise = maSignature.generateBlob();
        promise.then((blob) =>{
            // Define the FileReader which is able to read the contents of Blob
            var reader = new FileReader();

            // The magic always begins after the Blob is successfully loaded
            reader.onload = () => {
                // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
                var b64 = reader.result.replace(/^data:.+;base64,/, '');
                console.log(b64); //-> "V2VsY29tZSB0byA8Yj5iYXNlNjQuZ3VydTwvYj4h"

               
            };

            // Since everything is set up, let’s read the Blob and store the result as Data URI
            reader.readAsDataURL(blob);
        });*/
        let dataUrl = maSignature.canvas[0].toDataURL().replace(/^data:.+;base64,/, '');
        console.log(dataUrl);

        //get filled datas && store it into vars
        //check signature && datas
        //save datas into cookies
        //create countdown
    });
}