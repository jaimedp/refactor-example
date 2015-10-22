
function MeetingsRepo() {
  this.meetings = [];
}

MeetingsRepo.prototype.fetch = function (query) {
  return $.getJSON('meetings.json?query=' + query)
    .then(function (resp) {
      this.meetings = resp;
      return resp;
    }.bind(this));
};

MeetingsRepo.prototype.getById = function (id) {
  return _.find(this.meetings, function (meeting) { return meeting.id === id; });
};

