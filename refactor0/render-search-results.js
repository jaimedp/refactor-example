
function renderSearchResults(el, results) {
  var template = _.template(
    '<li data-index="<%=index%>"><%= name %></li>'
  );

  results.forEach(function (meeting, index) {
    var html = template(_.extend({index: index}, meeting));
    $(el).append(html);
  });
}