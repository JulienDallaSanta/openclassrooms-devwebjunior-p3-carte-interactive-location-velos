mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWVuZGFsbGFzYW50YSIsImEiOiJjanpvNDgzZ3AwMTFrM25wOG9zODJqcGUwIn0.P9PzQzmLlYgTiQyZcsKfCg';
var map = new mapboxgl.Map({
    center: [1.440466, 43.605000],
    zoom: 11.8,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10'
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

// code from the next step will go here!
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=a7366104be3d22e01e3d5cbefb3f59cd24d8b70c", function(reponse){
    var geojson = JSON.parse(reponse);

    // add markers to map
    for(var i=0; i<geojson.length; i++) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat([geojson[i].position.lng, geojson[i].position.lat])
        .addTo(map);

        new mapboxgl.Popup({offset: 25, className: 'popup'})
        .setHTML('<h3>' + geojson[i].name + '</h3><p>' + geojson[i].address + '</p>' + '<p>' + 'La station est ' + geojson[i].status + '</p>' + '<p>' + 'Nombre de vélos : ' + geojson[i].bike_stands + '</p>' + '<p>' + 'vélos disponibles : ' + geojson[i].available_bikes + '</p>')
        .setMaxWidth("300px")
        .addTo(map);
    };

    /*$('.marker').on('click', function(){
        geojson.forEach(function(marker){
            new mapboxgl.Popup({offset: 25, className: 'popup'})
            .setHTML('<h3>' + geojson[i].name + '</h3><p>' + geojson[i].address + '</p>' + '<p>' + 'La station est ' + geojson[i].status + '</p>' + '<p>' + 'Nombre de vélos : ' + geojson[i].bike_stands + '</p>' + '<p>' + 'vélos disponibles : ' + geojson[i].available_bikes + '</p>')
            .setMaxWidth("300px")
            .addTo(map);
        });
    });*/
});