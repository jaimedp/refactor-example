
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
