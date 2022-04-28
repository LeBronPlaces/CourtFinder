const map = createMap();
createMarkers();
map.on('click', addMarker);
showViewInMapInfo(welcomeView);
let actualMarker = null;
let lastMarker = null

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
                let marker = new mapboxgl.Marker({
                    color: 'rgb(255, 123, 0)',
                }).setLngLat(coord)
                    .addTo(map)
                marker.getElement().addEventListener('click', (e) => {
                    showCourtDetails(marker, e);
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function showCourtDetails(marker, e) {
    if (lastMarker) {
        lastMarker.remove();
    }
    let lat = marker._lngLat.lat;
    let long = marker._lngLat.lng;
    axios.get(`/courtByLocation/${lat}/${long}`)
    .then(response => {
        let court = response.data.court;
        showViewInMapInfo(createCourtDetailView(court));
        document.getElementById('create-court-close').addEventListener('click', () => {
        showViewInMapInfo(welcomeView);
        })
    })
    e.stopPropagation();
}

function addMarker(event) {
    showViewInMapInfo(createCourtView);
    document.getElementById('create-court-close').addEventListener('click', () => {
        showViewInMapInfo(welcomeView);
        lastMarker.remove();
    })
    createMarker(event);
}

function createMarker(event) {
    actualMarker = event.lngLat;
    document.getElementById('long').value = actualMarker.lng
    if (lastMarker !== null) {
        lastMarker.remove();
    }
    actualMarker = event.lngLat;
    document.getElementById('long').value = actualMarker.lng
    document.getElementById('lat').value = actualMarker.lat
    lastMarker = new mapboxgl.Marker({
        color: "blue",
        draggable: true
    }).setLngLat(event.lngLat)
        .addTo(map)
        lastMarker.getElement().addEventListener('click', (e) => {
            showCourtDetails(marker, e);
        })
}

function showViewInMapInfo(form) {
    document.getElementById('map-info').innerHTML = form;
}

function toggleOpeningTimes() {
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

function createCourtDetailView(court) {
   
    
    if (`${court.details.accessibility.fulltime}` == "true") {
        return `
    <div class="court-details-container">
    <div class="court-details-container-row-1">
        <p style="font-family:'Pacifico'; font-size: 30px">${court.name}</p>
        <p id="create-court-close">CLOSE</p>
    </div>
    <p>Open 24/7 ✅</p>
    <p>Court type: ${court.details.surface}</p>
    <p>Number of baskets: ${court.details.numBaskets}</p>
    <p>Type of basket: ${court.details.basketType}</p>
    <p>Lighting ${court.details.lighting?'✅':'❌'}</p>
    <p>Description: ${court.description}</p>
    <img src=${court.image}>
</div>
    `;

    } else {

       return `
    <div>
    <p style="font-family:'Pacifico'; font-size: 30px">${court.name}</p>
    <p>Opening hour: ${court.details.accessibility.opening}</p>
    <p>Closing hour: ${court.details.accessibility.closing}</p>
    <p>Court type: ${court.details.surface}</p>
    <p>Number of baskets: ${court.details.numBaskets}</p>
    <p>Type of basket: ${court.details.basketType}</p>
    <p>Lighting ${court.details.lighting?'✅':'❌'}</p>
    <p>Description: ${court.description}</p>
    <img src=${court.image}>
    <p id="create-court-close">CLOSE</p>
    </div>
    `;
}
}







