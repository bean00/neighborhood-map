var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.322998, lng: -122.032182},
    zoom: 13
  });

  var locations = [
    {title: 'Apple Campus', location: {lat: 37.33182, lng: -122.03118}},
    {title: 'Whole Foods', location: {lat: 37.323577, lng: -122.039895}},
    {title: '85 Degrees C', location: {lat: 37.303966, lng: -122.032824}}
  ];

  locations.forEach(function(location) {
    var position = location.location;
    var title = location.title;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title
    });
  });
}
