var viewModel = {
  locations: ko.observableArray([]),
  setLocations: function(locations) {
    this.locations(locations);
  }
}

ko.applyBindings(viewModel);
