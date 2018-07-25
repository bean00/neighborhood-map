const cupertino = {lat: 37.322998, lng: -122.032182};

let map;
let markers = [];
let infoWindow;
const mapCenter = cupertino;
const mapZoom = 13;

function initMap() {
  map = createMap(mapCenter, mapZoom);

  markers = createMarkers(viewModel.locations());

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
  infoWindow = new google.maps.InfoWindow();

  locations.forEach(function(location) {
    let marker = createMarker(map, location);

    // Open an infoWindow at each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
    });

    markers.push(marker);
  });

  return markers;
}

function createMarker(map, location) {
  const marker = new google.maps.Marker({
    id: location.id,
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

function populateInfoWindow(marker, infoWindow) {
  const markersInfoWindowIsOpen = infoWindow.marker == marker;

  if (!markersInfoWindowIsOpen) {
    openInfoWindow(marker);

    // Clear the marker property if the infoWindow is closed
    infoWindow.addListener('closeclick', function() {
      infoWindow.setMarker = null;
    });
  }
}

function openInfoWindow(marker) {
  infoWindow.marker = marker;

  const content = buildInfoWindowContent(marker);
  infoWindow.setContent(content);

  infoWindow.open(map, marker);
}

function buildInfoWindowContent(marker) {
  const title = marker.title;

  return '<div>' + title + '</div>';
}

function openWindowFromList(locationId) {
  openInfoWindow(markers[locationId]);
}
