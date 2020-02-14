/* REGROUPE CLASSES JS SLIDER, MAP, RESA, CANVAS */

$(document).ready(function() {
	let sliderVelos = new SliderClass('#slider_container', 5000, 1000, 1000);
	let mapVelos = new MapClass('#map_container','map', 43.605000, 1.440466, 12, 'https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=a7366104be3d22e01e3d5cbefb3f59cd24d8b70c');
	let resaVelos = new ResaClass('#form_bikes', 20 * 60 * 1000, new CanvasClass('#canvas_div', '#canvas_resa'));
	let canvasVelos = new CanvasClass('#canvas_div', '#canvas_resa');
});
