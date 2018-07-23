var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.322998, lng: -122.032182},
    zoom: 13
  });
}
