
describe('Meeting Filter', function () {
  describe('for admin users', function () {
    it('should return all meetings for current account', function () {
      // prepare
      var meetings = [
        {account: 'a', id: 1, name: 'meeting 1', creator: 'x'},
        {account: 'b', id: 2, name: 'meeting 2', creator: 'x'},
      ];

      // act
      var res = filterMeetings({isAdmin: true, account: 'a'}, meetings);

      // assert
      expect(res.length).toEqual(1);
    });
  });

  describe('for non admin useres', function () {
    it('should return meetings created by user', function () {
      // prepare
      var meetings = [
        {account: 'a', id: 1, name: 'meeting 1', creator: 'x'},
        {account: 'a', id: 2, name: 'meeting 2', creator: 'x'},
        {account: 'b', id: 3, name: 'meeting 3', creator: 'y'}
      ];

      // act
      var res = filterMeetings({isAdmin: false, account: 'a', id: 'x'}, meetings);

      // assert
      expect(res.length).toEqual(2);

    })
  });
});
