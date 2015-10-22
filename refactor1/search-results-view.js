
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
