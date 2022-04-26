const map = createMap();
createMarkers();

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
