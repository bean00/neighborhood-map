$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

var viewModel = {
  locations: ko.observableArray([]),
  setLocations: function(locations) {
    this.locations(locations);
  }
}

ko.applyBindings(viewModel);
