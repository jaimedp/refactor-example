
describe('fetchData', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('should return a promise', function () {
        // prepare

        // act
        var res = fetchData();

        // assert
        expect(res.then).toBeDefined();
    });

    it('should call the meetings api', function () {
        // prepare
        var query = 'abc';

        // act
        fetchData(query)

        // assert
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('meetings.json?query=' + query);
    });

});
