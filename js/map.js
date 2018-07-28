const losAngeles = {lat: 34.052234, lng: -118.243685};
const cupertino = {lat: 37.322998, lng: -122.032182};

const mapCenter = losAngeles;
const mapZoom = 19;

// Wikipedia API search parameters
const numberOfLocations = 5;
const searchRadius = 10000;
const centerLat = mapCenter.lat;
const centerLng = mapCenter.lng;

const wikipediaUrl = `https://en.wikipedia.org//w/api.php?action=query&format=json&origin=*&prop=coordinates%7Cpageimages%7Cdescription&generator=geosearch&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&ggscoord=${centerLat}%7C${centerLng}&ggsradius=${searchRadius}&ggslimit=${numberOfLocations}`;


let map;
let markers = [];
let infoWindow;

function initMap() {
  fetch(wikipediaUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      locations = parseRawWikiData(data);

      return locations;
    })
    .then(locations => viewModel.locations(locations))
    .then(() => {
      map = createMap(mapCenter, mapZoom);

      addMarkersToLocations(viewModel.locations());

      google.maps.event.addListenerOnce(map, 'idle', () => setMapBoundaries(map, markers));
    })
    .catch(error => errorHandler(error));
}

function parseRawWikiData(data) {
  let locations = [];
  const pages = data.query.pages;
  let id = 0;

  for (let key in pages) {
    const page = pages[key];

    let location = {
      id: id,
      pageId: page.pageid,
      title: page.title,
      location: {
        lat: page.coordinates[0].lat,
        lng: page.coordinates[0].lon,
      },
      description: page.description,
    };

    locations.push(location);
    id++;
  }

  return locations;
}

function createMap(center, zoom) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoom
  });

  return map;
}

function addMarkersToLocations(locations) {
  infoWindow = new google.maps.InfoWindow();

  locations.forEach(function(location) {
    let marker = createMarker(map, location);

    // Open an infoWindow at each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
      bounceMarker(this);
    });

    location.marker = marker;
  });
}

function createMarker(map, location) {
  const marker = new google.maps.Marker({
    id: location.id,
    map: map,
    position: location.location,
    title: location.title,
    gestureHandling: "cooperative",
  });

  return marker;
}

function setMapBoundaries(map, markers) {
  let bounds = map.getBounds();

  markers.forEach(function(marker) {
    bounds.extend(marker.position);
  });

  map.fitBounds(bounds);
}

function populateInfoWindow(marker, infoWindow) {
  if (infoWindow.marker != marker) {
    openInfoWindow(marker);

    // Clear the marker property if the infoWindow is closed
    infoWindow.addListener('closeclick', () => infoWindow.setMarker = null);
  }
}

function openInfoWindow(marker) {
  const location = viewModel.locations()[marker.id];

  infoWindow.marker = marker;

  const content = buildInfoWindowContent(location);
  infoWindow.setContent(content);

  infoWindow.open(map, marker);
}

function buildInfoWindowContent(location) {
  const wikipediaUrl = `http://en.wikipedia.org/?curid=${location.pageId}`;
  const wikipediaPage = `<a href="${wikipediaUrl}">Wikipedia Page</a>`;

  const html = `
      <div>${location.title}</div>
      <div>${wikipediaPage}</div>`;

  return html;
}

function clickLocation(locationId) {
  const marker = viewModel.locations()[locationId].marker;
  openInfoWindow(marker);
  bounceMarker(marker);
}

function bounceMarker(marker) {
  // Start animation
  marker.setAnimation(google.maps.Animation.BOUNCE);

  // Stop animation after 700 ms
  setTimeout(function() {
    marker.setAnimation(null)
  }, 700);
}

// Handle errors in Maps API
function mapsApiError() {
  alert("Error: Unable to load the Google map.");
}

// Error handler
function errorHandler(error) {
  alert("An error occurred during program execution. Check the console for more details.");
  console.log("Error object:");
  console.dir(error);
}