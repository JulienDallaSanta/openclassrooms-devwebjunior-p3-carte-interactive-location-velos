class FormStation{
    constructor(parent, station){
        this.parent = parent;
        this.station = station;
        this.buildHeader();
        this.buildForm();
    }
    buildHeader(){
        $(this.parent).append($(`
        <div id="info-station">
            <p class='formStatName'>${this.station.name}</p>
            <p class='formAddress'>Adresse : ${this.station.address}</p>
            <p class='formAvailableBikes'>Nombre de vélos disponibles : ${this.station.available_bikes}</p>
        </div>
        `));
    }
    buildForm(){
        $(this.parent).append($(`
        <form id="form_bikes"> 
            <fieldset>
                <legend>Réservez un vélo de cette station</legend>
                <label for="name">Votre nom : </label><input type="text" name="name" id="name" placeholder="Votre nom" required/><br />
                <label for="firstname"> Votre prénom : </label><input type="text" name="firstname" id="firstname" placeholder="Votre prénom" required><br />
                <input type="submit" name="submit" id="reservation" class="pop_res_but" value="Réservez !" onclick="rescan(event)">
            </fieldset>
        </form>
        `));
    }
}

function clickbut(event){
    event.stopPropagation();
    let stationNumber = $('.statname').attr('data-id');
    $('#form_container').html('');
    new FormStation($('#form_container'), window.geojson[stationNumber]);
}

$(document).ready(function(){
    var mymap = L.map('map',
    {
        scrollWheelZoom:false,
        center: [43.605000, 1.440466],
        zoom: 13
    });

    let veloicon ={
        false: L.icon({
            iconUrl: 'img/velored.png',
            iconSize: [38, 38]
        }),
        true: L.icon({
            iconUrl: 'img/velo.png',
            iconSize: [38, 38]
        })
    }

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVuZGFsbGFzYW50YSIsImEiOiJjanpvNDgzZ3AwMTFrM25wOG9zODJqcGUwIn0.P9PzQzmLlYgTiQyZcsKfCg').addTo(mymap);

    //MAP
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=a7366104be3d22e01e3d5cbefb3f59cd24d8b70c", function(reponse){
        window.geojson = JSON.parse(reponse);

        //create cluster
        var cluster = L.markerClusterGroup();

        // add markers to map
        for(var i=0; i<window.geojson.length; i++) {
            var marker = L.marker(window.geojson[i].position);
            marker.bindPopup(`
                <h3 class="statname" data-id='${i}'>${window.geojson[i].name}</h3>
                <p class="stataddr">${window.geojson[i].address}</p>
                <p class="statstatus">La station est ${((window.geojson[i].status=='OPEN') ? 'ouverte' : 'fermée')}</p>
                <p class="statbikes">Nombre de vélos : ${window.geojson[i].bike_stands}</p>
                <p class="statavailable">Vélos disponibles : <span class='available_bikes'>${window.geojson[i].available_bikes}</span></p>
                ${((window.geojson[i].available_bikes==0)?'' : '<button class="pop_res_but" onclick="clickbut(event)">Réserver</button>')}
            `);
            marker.setIcon(veloicon[(window.geojson[i].available_bikes==0)? 'false': 'true']);
            cluster.addLayer(marker);
        };
        mymap.addLayer(cluster);
    });
});