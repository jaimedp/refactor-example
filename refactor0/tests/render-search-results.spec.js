
describe('renderSearchResults', function () {
    it('should render all meetings passed in', function () {
        // prepare
        var ul = $('<ul>');
        var meetings = [
          {account: 'a', id: 1, name: 'meeting 1', creator: 'x'},
          {account: 'a', id: 2, name: 'meeting 2', creator: 'x'},
        ];

        // act
        renderSearchResults(ul, meetings);

        // assert
        expect(ul.children().length).toBe(2);
    });
});
