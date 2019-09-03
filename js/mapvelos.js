/*let marker ;

function newMarker(){
    marker = L.marker([latitude, longitude]).addto(map);
}

var req = ajaxGet("toulouse.json", function(reponse){
    var stations = JSON.parse(reponse);
    stations.forEach(function(station){
        marker = L.marker([latitude, longitude]).addto(map);
    })
})*/

map.on('load', function () {
    map.addControl(new mapboxgl.NavigationControl());
    // Add a layer showing the places.
    map.addLayer(
        JSON.parse(toulouse.json)
    );
});

var req = new XMLHttpRequest();
req.open("GET", "toulouse.json", true); 
req.onreadystatechange = monCode;   // la fonction de prise en charge
req.send(null);
