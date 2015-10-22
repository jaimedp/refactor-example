(function () {

    var meetings = [];

    $('#search-btn').on('click', function () {
        var query = $('#query').val();

        $.getJSON('meetings.json?query=' + query)
            .then(function (resp) {
                var template = _.template('<li data-index="<%=index%>"><%= name %></li>');

                resp.forEach(function (meeting, index) {
                    $('#results').append(template(_.extend({index: index}, meeting)));
                });

                meetings = resp;
            });
    });

    $('#results').on('click', 'li', function (e) {
        var target = $(e.target);
        var index = +target.data('index');
        var meeting = meetings[index];

        var template = _.template('<li><label>Name:</label><%= name %></li><li><label>Creator:</label><%= creator %></li><li><a href="<%=url%>">Join the Meeting</a></li>');

        $('#details').html(template(meeting));
    });
})();