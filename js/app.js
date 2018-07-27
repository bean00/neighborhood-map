$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

function ViewModel() {
  let self = this;

  self.locations = ko.observableArray([]);

  self.query = ko.observable('');

  self.filteredLocations = ko.computed(function() {
    const filter = self.query().toLowerCase();

    if (!filter) {
      return self.locations();
    } else {
      return ko.utils.arrayFilter(self.locations(), function(location) {
        const title = location.title.toLowerCase();

        let result = title.includes(filter);

        location.marker.setVisible(result);

        return result;
      });
    }
  });
}

let viewModel = new ViewModel();

ko.applyBindings(viewModel);
