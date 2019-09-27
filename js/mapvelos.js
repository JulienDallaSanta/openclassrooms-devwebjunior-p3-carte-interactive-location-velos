mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWVuZGFsbGFzYW50YSIsImEiOiJjanpvNDgzZ3AwMTFrM25wOG9zODJqcGUwIn0.P9PzQzmLlYgTiQyZcsKfCg';
var map = new mapboxgl.Map({
center: [1.440466, 43.605000],
zoom: 11.8,
container: 'map',
style: 'mapbox://styles/mapbox/light-v10'
});

// code from the next step will go here!
var geojson = ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=a7366104be3d22e01e3d5cbefb3f59cd24d8b70c", callback);

// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.name + '</h3><p>' + marker.properties.address + '</p>' + '<p>' + 'La station est ' + marker.properties.status + '</p>' + '<p>' + 'Nombre de vélos : ' + marker.properties.bike_stands + '</p>' + '<p>' + 'vélos disponibles : ' + marker.properties.available_bikes + '</p>'))
    .addTo(map);
});