var cheerio = require('cheerio');
var assert = require('assert');

var html = `<tr class="eventrow" >
        <td class="element-title">Chalet 1</td>
        <td class="weekday4"></td>
        <td class="weekday5"></td>
        <td class="weekday6"></td>
        <td class="weekday0"></td>
        <td class="weekday1">
          <div class="event" width=50px border=1px><span>First event</span></div>
          <div class="eventtext">First eventtext</div>
        </td>
        <td class="weekday2">
          <div class="event" width=50px border=1px>Second event</div>
          <div class="eventtext">Second eventtext</div>
        </td>
        <td class="weekday3"></td>
        <td class="weekday4"></td>
        <td class="weekday5"></td>
        <td class="weekday6"></td>
        <td class="weekday0"></td>
        <td class="weekday1"></td>
        <td class="weekday2"></td>
        <td class="weekday3"></td>
        <td class="weekday4"></td>
        <td class="weekday5"></td>
        <td class="weekday6"></td>
        <td class="weekday0"></td>
        <td class="weekday1"></td>
        <td class="weekday2"></td>
        <td class="weekday3"></td>
        <td class="weekday4"></td>
        <td class="weekday5"></td>
        <td class="weekday6"></td>
        <td class="weekday0"></td>
        <td class="weekday1"></td>
        <td class="weekday2"></td>
        <td class="weekday3"></td>
        <td class="weekday4"></td>
        <td class="weekday5"></td>
      </tr>`;
var $ = cheerio.load(html);
describe('Cheerio sandbox - ', function() {
  describe('multiple element with same class', function() {
    it('can find last element text', function() {
      var elems = $.html('div[class=event]');
      var elem = $(elems).last().text();

      assert.equal(elem, 'Second event');
    });

    it('can find complete first div html', function() {
      var elems = $.html('div[class=event]');
      var elem = $(elems).first();

      assert.equal($.html(elem), '<div class="event" width="50px" border="1px"><span>First event</span></div>');
    });
  });
  
  describe('multiple td available', function(){
    it('can find first and second td', function() {
      var tds = $('tr');
      
      var first_td_element = tds.find('td').first();
      var second_td_element = first_td_element.next();
      
      assert.equal($.html(first_td_element), '<td class="element-title">Chalet 1</td>');      
      assert.equal($.html(second_td_element), '<td class="weekday4"></td>');
    });
  });
});