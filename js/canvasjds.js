let canvas = $("#canvas");
let context = canvas.getContext('2d');

class Sign{
    constructor(parent, width, height){
        this.parent = parent;
        this.width = width;
        this.height = height;
        // Variables :
        this.color = "#000";
        this.painting = false;
        this.started = false;
        this.width_brush = 1;
        this.cursorX, this.cursorY;
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.mousedown();
        this.mouseup();
        this.mousemove();
        this.drawLine();
        // Insertion du canvas 
        this.buildCanvas();
    }
    // Fonction qui insert le canvas :
    buildCanvas(){
        $(this.parent).append($(`
        <canvas id="canvas" >
            <p>Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour</p>
        </canvas>
        `));
    }
    mousedown() {
        var that = this;
        // Click souris enfoncé sur le canvas, je dessine :
        $(this.canvas).mousedown(function (e) {
            that.painting = true;

            // Coordonnées de la souris :
            that.cursorX = (e.pageX - this.offsetLeft);
            that.cursorY = (e.pageY - this.offsetTop);

        });

    }
    mouseup() {
        var that = this;
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        $(this.canvas).mouseup(function () {
            that.painting = false;
            that.started = false;
        });
    }
    mousemove() {
        var that = this;
        // Mouvement de la souris sur le canvas :
        $(this.canvas).mousemove(function (e) {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (that.painting) {
                // Set Coordonnées de la souris :
                that.cursorX = (e.pageX - this.offsetLeft) - 2; // 10 = décalage du curseur
                that.cursorY = (e.pageY - this.offsetTop) - 2;
                that.drawLine()
            }
        });
    }
    // Fonction qui dessine une ligne :
    drawLine() {
        var that = this;
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            that.context.beginPath();
            that.context.moveTo(this.cursorX, this.cursorY);
            that.started = true;
        }
        // Sinon je dessine
        else {
            that.context.lineTo(this.cursorX, this.cursorY);
            that.context.strokeStyle = this.color;
            that.context.lineWidth = this.width_brush;
            that.context.stroke();
        }
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
            <button type="submit" id="submit_canvas">Validez</button>
            <button type="reset" id="clear_canvas">Effacer</button>
        </div>
    </div>
    `))
    new Sign($('#canvas_div'), 150, 150);
}

/*<div id="canvas_container">
    <div id="canvas_message">
        <p>Signez dans la case pour confirmer :</p>
    </div>
    <canvas id="canvas" >
        <p>Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour</p>
    </canvas>
    <div id="canvas_confirm">
        <button type="submit" id="submit_canvas">Validez !</button>
        <button type="reset" id="clear_canvas">Recommencez</button>
    </div>
</div>*/

/*class Sign {
    constructor() {
        // Variables :
        this.color = "#000";
        this.painting = false;
        this.started = false;
        this.width_brush = 1;
        this.canvas = $("#sign");
        this.cursorX, this.cursorY;
        this.context = this.canvas[0].getContext('2d');
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.mousedown();
        this.mouseup();
        this.mousemove();
        this.drawLine();
    }
    mousedown() {
        var that = this;
        // Click souris enfoncé sur le canvas, je dessine :
        $(this.canvas).mousedown(function (e) {
            that.painting = true;

            // Coordonnées de la souris :
            that.cursorX = (e.pageX - this.offsetLeft);
            that.cursorY = (e.pageY - this.offsetTop);

        });

    }
    mouseup() {
        var that = this;
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        $(this.canvas).mouseup(function () {
            that.painting = false;
            that.started = false;
        });
    }
    mousemove() {
        var that = this;
        // Mouvement de la souris sur le canvas :
        $(this.canvas).mousemove(function (e) {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (that.painting) {
                // Set Coordonnées de la souris :
                that.cursorX = (e.pageX - this.offsetLeft) - 2; // 10 = décalage du curseur
                that.cursorY = (e.pageY - this.offsetTop) - 2;
                that.drawLine()
            }
        });
    }
    // Fonction qui dessine une ligne :
    drawLine() {
        var that = this;
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            that.context.beginPath();
            that.context.moveTo(this.cursorX, this.cursorY);
            that.started = true;
        }
        // Sinon je dessine
        else {
            that.context.lineTo(this.cursorX, this.cursorY);
            that.context.strokeStyle = this.color;
            that.context.lineWidth = this.width_brush;
            that.context.stroke();
        }
    }
}*/