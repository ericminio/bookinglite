var buildCalendarHeader = require('./calendar.builder').buildCalendarHeader;
var cheerio = require('cheerio');
var expect = require('chai').expect;

var html = `
<table class="calendar">
  <thead>
    <tr class="dayweek">
      <td></td>
      <td class="weekday4">J</td>
      <td class="weekday5">V</td>
    </tr>
    <tr class="day">
      <td class="element-title">Chalets</td>
      <td class="weekday4">1</td>
      <td class="weekday5">2</td>
    </tr>
  </thead>
  <tbody></tbody>
</table>
`;

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016, 8, 19, 0, 0, 0, 0);
var $;

describe('calendar.builder.buildCalendarHeader', function() {

  beforeEach(function() {
    $ = cheerio.load(html);
  });

  it('set the proper dayweek (i.e. JVSDL...) header', function() {
    buildCalendarHeader($, date);
    expect($('.dayweek').text()).to.be.equal('JVSDLMMJVSDLMMJVSDLMMJVSDLMMJV');
  });
  
  it('set the proper day header', function() {
    buildCalendarHeader($, date);
    expect($('.day').text()).to.be.equal('Chalets123456789101112131415161718192021222324252627282930');
  });
})