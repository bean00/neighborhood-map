$(document).ready(function() {
  $('#sidebarCollapse').click(function(e) {
    if ($('#sidebar').is(':hidden') == true) {
      $(this).toggleClass("active");
      $('#sidebar').removeClass("toggle");
    } else {
      $(this).removeClass("active");
      $('#sidebar').addClass("toggle");
    }

    e.preventDefault();
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
