
function Page(el, user) {
  this.el = $(el);
  this.repo = new MeetingsRepo();
  this.service = new MeetingsService(user, this.repo);
  this.searchBox = new SearchBox($('#search-box', this.el), { onSearch: this.onSearch.bind(this) });
  this.searchResultsView = new SearchResultsView($('#results', this.el), { onSelectMeeting: this.onSelectMeeting.bind(this) });
  this.meetingDetailsView = new MeetingDetailsView($('#details', this.el));
}

Page.prototype.onSearch = function (query) {
  this.service.getAll(query)
    .then(function (meetings) {
      this.searchResultsView.setResults(meetings);
      this.searchResultsView.render();
    }.bind(this));
};

Page.prototype.onSelectMeeting = function (id) {
  var meeting = this.service.getById(id);
  this.meetingDetailsView.setMeeting(meeting);
  this.meetingDetailsView.render();
};

Page.prototype.render = function () {
  this.searchBox.render();
};


var currentUser = { id: 'User XYZ', isAdmin: true, account: 'abc' };
new Page('#content', currentUser).render();
