$(document).ready(function() {
  $('#sidebarCollapse').click(e => {
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
  const self = this;

  self.locations = ko.observableArray([]);

  self.query = ko.observable('');

  self.filteredLocations = ko.computed(() => {
    const filter = self.query().toLowerCase();

    if (!filter) {
      return self.locations();
    } else {
      return ko.utils.arrayFilter(self.locations(), location => {

        // If the infowindow is opened during search, close it
        if (infoWindow) {
          infoWindow.close();
        }

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
