
function MeetingDetailsView(el) {
  this.el = el;
}

MeetingDetailsView.prototype.setMeeting = function (meeting) {
  this.meeting = meeting;
  this.template = _.template('<li><label>Name:</label><%= name %></li><li><label>Creator</label><%= creator %></li>');
};

MeetingDetailsView.prototype.render = function () {
  $(this.el).html(this.template(this.meeting));
};
