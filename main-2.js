(function () {


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


  function SearchBox(el, options) {
    this.options = options;
    this.el = el;

    this.bindEvents();
  }


  SearchBox.prototype.bindEvents = function () {
    $(this.el).on('click', '#search-btn', this.onSearch.bind(this));
  }

  SearchBox.prototype.onSearch = function (e) {
    var query = $('#query', this.el).val();
    this.options.onSearch(query);
    $('#query', this.el).val('');
  };

  SearchBox.prototype.render = function() {
    $(this.el).html('<input id="query" type="text"><button id="search-btn">Search</button>');
  };

  function SearchResultsView(el, options) {
    this.options = options || {};
    this.el = el;
    this.results = [];
    this.template = _.template('<li data-id="<%=id%>"><%= name %></li>');
  }

  SearchResultsView.prototype.setResults = function (results) {
    this.results = results;
  };

  SearchResultsView.prototype.onClick = function (e) {
    var id = $(e.target).data('id');
    this.options.onSelectMeeting && this.options.onSelectMeeting(id);
  };

  SearchResultsView.prototype.render = function () {
    var ul = $('<ul>').on('click', 'li', this.onClick.bind(this));
    this.results.forEach(function (meeting) {
      ul.append(this.template(meeting));
    }.bind(this));
    $(this.el).html(ul);
  };

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




  // var meetings = [];

  // $('#search-btn').on('click', function () {
  //   var query = $('#query').val();

  //   $.getJSON('meetings.json?query=' + query)
  //     .then(function (resp) {
  //       var template = _.template('<li data-index="<%=index%>"><%= name %></li>');

  //       meetings = resp
  //         .filter(function (meeting) {
  //           if (currentUser.isAdmin) {
  //             return meeting.account === currentUser.account;
  //           }

  //           return meeting.creator === currentUser.id;
  //         })
  //         .forEach(function (meeting, index) {
  //           $('#results').append(template(_.extend({index: index}, meeting)));
  //         });
  //     });
  // });

  // $('#results').on('click', 'li', function (e) {
  //   var target = $(e.target);
  //   var index = +target.data('index');
  //   var meeting = meetings[index];
  //   var template = _.template('<li><label>Name:</label><%= name %></li><li><label>...</li>');

  //   $('#details').html(template(meeting));
  // });


})();