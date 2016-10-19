var buildElementRow = require('./calendar.builder').buildElementRow;
var calculateCellIndex = require('./calendar.builder').calculateCellIndex;
var calculateEventLength = require('./calendar.builder').calculateEventLength;
var cheerio = require('cheerio');
var expect = require('chai').expect;

var html = `
<table class="calendar">
  <tbody>
    <tr class="eventrow" id="element-10">
      <td class="element-title">Chalet 1</td>
      <td class="weekday4"></td>
      <td class="weekday5"></td>
      <td class="weekday6"></td>
      <td class="weekday0"></td>
      <td class="weekday1">
        <div class="event" days=7>
          <span class="eventtext">
      Bob Dilan
      </span>
        </div>
      </td>
      <td class="weekday2"></td>
      <td class="weekday3"></td>
      <td class="weekday4"></td>
      <td class="weekday5"></td>
    </tr>
    <tr class="eventrow" id="element-11">
      <td class="element-title">Chalet 2</td>
      <td class="weekday4">
      <div class="event" days=2>
          <span class="eventtext">
      Carole Duschesne
      </span>
        </div></td>
      <td class="weekday5"></td>
      <td class="weekday6"></td>
      <td class="weekday0"></td>
      <td class="weekday1"></td>
      <td class="weekday2"></td>
      <td class="weekday3"></td>
      <td class="weekday4"></td>
      <td class="weekday5"></td>
    </tr>
  </tbody>
</table>
`;

var element = {
  "element_id": 1,
  "name": "Cabin 1"
};

var events = [{
  "event_id": 1,
  "element_id": 1,
  "first_name": "Richard",
  "last_name": "Brodeur",
  "start_date": new Date(2016, 7, 30, 0, 0, 0, 0),
  "duration_days": 7
}];

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016, 8, 19, 0, 0, 0, 0);
var $;

describe('calendar.builder.buildElementRow-startingBefore', function() {
  beforeEach(function() {
    $ = cheerio.load(html);
    buildElementRow($, date, element, events);
  });

  it('set the expected name on event', function() {
    expect($('.event').text()).to.contains('Richard Brodeur');
  });

  it('set the event in the expected cell', function() {
    expect($('.event').closest('td').index()).to.be.equal(1);
  });

  describe('calculateCellIndex', function() {
    it('returns the expected index from the given date when start_date is starting before the current month', function() {
      var index = calculateCellIndex(new Date(2016, 7, 30, 0, 0, 0, 0), 8, 7);
      expect(index).to.be.equal(1);
    });

    it('returns the expected index from the given date when start_date is starting during the current month', function() {
      var index = calculateCellIndex(new Date(2016, 8, 15, 0, 0, 0, 0), 8, 7);
      expect(index).to.be.equal(15);
    });
  });

  describe('calculateEventLength', function() {
    it('returns the expected event length from start_date, month and days when starting before the current month', function() {
      var length = calculateEventLength(new Date(2016, 7, 30, 0, 0, 0, 0), 8, 7);
      expect(length).to.be.equal(5);
    });

    it('returns the expected event length from start_date, month and days when during the current month', function() {
      var length = calculateEventLength(new Date(2016, 8, 15, 0, 0, 0, 0), 8, 7);
      expect(length).to.be.equal(7);
    });
  });


});