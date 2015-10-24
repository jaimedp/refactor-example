
function filterMeetings(user, meetings) {
    return meetings.filter(function (meeting) {
      if (user.isAdmin) {
        return meeting.account === user.account;
      }

      return meeting.creator === user.id;
    });
}