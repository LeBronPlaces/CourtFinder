const map = createMap();
createMarkers();
map.on('click', addMarker)
let actualMarker = [];

function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhiaCIsImEiOiJjbDJhZGVvbTgwMmQ2M2RucmliNXIwaDZ0In0.RrDkM5Omdqkq1EM_FXPxaQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.404954, 52.520008],
        zoom: 11,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    return map;
}

function createMarkers() {
    axios.get('/courtLocations')
        .then(response => {
            let locations = response.data.locations;
            locations.forEach(coord => {
                new mapboxgl.Marker({
                    color: 'red',
                }).setLngLat(coord)
                    .addTo(map)
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function addMarker(event) {
    createMarker(event);
    showCreateMarkerForm();
}

function createMarker(event) {
    actualMarker = event.lngLat;
    document.getElementById('long').value = actualMarker.lng 
    document.getElementById('lat').value = actualMarker.lat
    new mapboxgl.Marker({
        color: 'blue',
    }).setLngLat(event.lngLat)
        .addTo(map)
}

function showCreateMarkerForm() {
    document.getElementById('').innerHTML = '<p></p>'

}

function toggleOpeningTimes () {
    let opening = document.getElementById('opening');
    let closing = document.getElementById('closing')
    if (document.getElementById('fulltime').checked) {
        opening.disabled = true;
        closing.disabled = true;
    } else {
        opening.disabled = false;
        closing.disabled = false;
    }
}