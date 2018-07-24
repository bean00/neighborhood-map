const locations = [
  {title: 'Apple Campus', location: {lat: 37.33182, lng: -122.03118}},
  {title: 'Whole Foods', location: {lat: 37.323577, lng: -122.039895}},
  {title: '85 Degrees C', location: {lat: 37.303966, lng: -122.032824}}
];

const cupertino = {lat: 37.322998, lng: -122.032182};

let map;
let markers = [];
const mapCenter = cupertino;
const mapZoom = 13;

function initMap() {
  map = createMap(mapCenter, mapZoom);

  markers = createMarkers(locations);

  google.maps.event.addListenerOnce(map, 'idle', function() {
    setMapBoundaries(map, markers);
  });
}

function createMap(center, zoom) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoom
  });

  return map;
}

function createMarkers(locations) {
  let markers = [];
  const infoWindow = new google.maps.InfoWindow();

  locations.forEach(function(location) {
    let marker = createMarker(map, location);

    // Open an infowindow at each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
    });

    markers.push(marker);
  });

  return markers;
}

function createMarker(map, location) {
  const marker = new google.maps.Marker({
    map: map,
    position: location.location,
    title: location.title
  });

  return marker;
}

function setMapBoundaries(map, markers) {
  let bounds = map.getBounds();

  markers.forEach(function(marker) {
    bounds.extend(marker.position);
  })

  map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) {
  const markersInfoWindowIsOpen = infowindow.marker == marker;

  if (!markersInfoWindowIsOpen) {
    openInfoWindow(infowindow, map, marker);

    // Clear the marker property if the infowindow is closed
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }
}

function openInfoWindow(infowindow, map, marker) {
  infowindow.marker = marker;

  const content = buildInfoWindowContent(marker);
  infowindow.setContent(content);

  infowindow.open(map, marker);
}

function buildInfoWindowContent(marker) {
  const title = marker.title;

  return '<div>' + title + '</div>';
}
