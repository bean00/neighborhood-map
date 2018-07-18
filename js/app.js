function AppViewModel() {
  this.firstName = ko.observable("Jason");
  this.lastName = ko.observable("Bourne");
}

ko.applyBindings(new AppViewModel());
