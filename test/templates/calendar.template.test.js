var cheerio   = require('cheerio');
var fs        = require('fs');
var assert    = require('assert');
var expect   = require('expect');
var Calendar = require('../../app/parser/calendar');
var $;

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016,8,19,0,0,0,0);

describe('Calendar template', function(){
  beforeEach(function(){   
    var html = '<section id=calendar><table class=calendar><table></section>';
    $ = cheerio.load(html);
  });
  
  it('has element with id "calendar"', function(){
    expect($('#calendar').html()).toExist('but element with ID "calendar" was not fount.');
  });
  
  it('has element with class "calendar"', function(){
    expect($('.calendar').html()).toExist('but element with Class "calendar" was not fount.');
  });
  
  it('display month cell', function(){
    var calendar = new Calendar(date);
    var row = calendar.buildMonthRow();
    expect(row('td', 'tr').next().attr('colspan')).toBe('30');
    expect(row.text()).toBe(' Septembre ');
  });
  
  it('display day cell', function(){
    var calendar = new Calendar(date);
    var row = calendar.buildDayRow();
    expect(row.text()).toBe(' Chalets123456789101112131415161718192021222324252627282930');
  });
  
  it('display dayweek cell', function(){
    var calendar = new Calendar(date);
    var row = calendar.buildDayWeekRow();
    expect(row.text()).toBe(' JVSDLMMJVSDLMMJVSDLMMJVSDLMMJV');
  });

  
});