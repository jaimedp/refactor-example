
function fetchData(query) {
    return $.getJSON('meetings.json?query=' + query);
}
