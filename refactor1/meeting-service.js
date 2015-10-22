
function MeetingsService(user, meetingsRepo) {
  this.user = user;
  this.repo = meetingsRepo;
}

MeetingsService.prototype.getAll = function () {
  return this.repo.fetch()
    .then(function (meetings) {
      return meetings.filter(this._isMeetingVisible);
    }.bind(this));
};

MeetingsService.prototype.getById = function (id) {
  var meeting = this.repo.getById(id);
  return this._isMeetingVisible(meeting) ? meeting : null;
};

MeetingsService.prototype._isMeetingVisible = function (meeting) {
  if (currentUser.isAdmin) {
    return meeting.account === currentUser.account;
  }

  return meeting.creator === currentUser.id;
};
