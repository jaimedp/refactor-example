
describe('renderMeetingDetails', function () {
    var meeting = {
        name: 'meeting 1',
        id: 1,
        creator: 'user X',
        account: 'a',
        url: 'the-url'
    };

    it('should render meeting name', function () {
        // prepare
        var div = $('<div>');

        // act
        renderMeetingDetails(div, meeting);

        // assert
        expect(div.text()).toContain(meeting.name);
    });

    it('should render meeting link', function () {
        // prepare
        var div = $('<div>');

        // act
        renderMeetingDetails(div, meeting);

        // assert
        expect(div.find('a').attr('href')).toBe(meeting.url);

    })
});
