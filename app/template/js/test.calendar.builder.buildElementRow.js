var buildElementRow = require('./calendar.builder').buildElementRow;
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
  "start_date": new Date(2016, 8, 19, 0, 0, 0, 0),
  "duration_days": 4
}];

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016, 8, 19, 0, 0, 0, 0);
var $;

describe('calendar.builder.buildElementRow', function() {
  beforeEach(function() {
    $ = cheerio.load(html);
    buildElementRow($, date, element, events);
  });

  it('set the expected number of cells', function() {
    expect($('.eventrow td').length).to.be.equal(31);
  });
  
  it('set the expected element row title', function() {
    expect($('.eventrow .element-title').text()).to.be.equal('Cabin 1');
  });

  it('set the expected cell class', function() {
    expect($('.eventrow td:nth-child(2)').attr('class')).to.be.equal('weekday4');
  });
  
  it('set the expected row id', function() {
    expect($('.eventrow').attr('id')).to.be.equal('element-1');
  });
  
  it('set the expected name on event', function() {
    expect($('.event').text()).to.contains('Richard Brodeur');
  });
  
  it('set the event in the expected cell', function() {
    expect($('.event').closest('td').index()).to.be.equal(19);
  });
  
  it('set the expected event days', function() {
    expect($('.event').attr('days')).to.be.equal('4');
  });
})