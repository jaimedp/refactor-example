(function () {

  var meetings = [];
  var currentUser = {
    id: 'User XYZ',
    account: 'abc',
  };

  function cacheMeetings(resp) {
    meetings = resp;
    return meetings;
  }

  $('#search-btn').on('click', function () {
    var query = $('#query').val();
    fetchData(query)
      .then(filterMeetings.bind(null, currentUser))
      .then(cacheMeetings)
      .then(renderSearchResults.bind(null, $('#results')))
  });

  $('#results').on('click', 'li', function (e) {
    var index = +$(e.target).data('index');
    var meeting = meetings[index];

    renderMeetingDetails($('#details'), meeting);
  });

})();