
    function init_map() {
        var client = new XMLHttpRequest();

        client.onreadystatechange = () => { if (client.readyState === 4 && client.status === 200) load_features(client.responseText); };
        client.open('GET', 'https://hydros.link9.net/clients.json');
        client.send();
    }

    function load_features(contents) {

        var features = JSON.parse(contents);
        var feature_layer = L.markerClusterGroup();

        var map = L.map('map', {center: [55.910945, -3.201114], zoom:10});

        var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        for ([key, value] of Object.entries(features)) {

            var latlon = value.coords.split(",");
            var popupText = value.user;
            var summit = L.marker(latlon).bindPopup(popupText);

            feature_layer.addLayer(summit);
            
        };

        feature_layer.addTo(map);
        map.fitBounds(feature_layer.getBounds());

    }

