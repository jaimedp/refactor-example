
function renderMeetingDetails(el, meeting) {
  var template = _.template(
    '<li><label>Name:</label><%= name %></li>'+
    '<li><label>Creator:</label><%= creator %></li>'+
    '<li><a href="<%=url%>">Join the Meeting</a></li>'
  );

  $(el).html(template(meeting));
}
