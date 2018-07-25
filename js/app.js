const locations = [
  {id: 0, title: 'Apple Campus', location: {lat: 37.33182, lng: -122.03118}},
  {id: 1, title: 'Whole Foods', location: {lat: 37.323577, lng: -122.039895}},
  {id: 2, title: '85 Degrees C', location: {lat: 37.303966, lng: -122.032824}}
];

var viewModel = {
  locations: ko.observableArray(locations)
}

ko.applyBindings(viewModel);
