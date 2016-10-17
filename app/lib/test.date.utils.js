var dateUtils = require('./date.utils');
var expect = require('expect');

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016,8,19,1,0,0,0);

describe('DateUtils', function(){
  
  it('returns expected Short Week Day', function(){
    expect(dateUtils.getShortWeekDay(date)).toBe('L');
  });
  
  it('returns expected Long Week Day', function(){
    expect(dateUtils.getLongWeekDay(date)).toBe('Lundi');
  }); 
  
  it('returns expected Month', function(){
    expect(dateUtils.getMonth(date)).toBe('Septembre');
  }); 
  
  it('returns expected DaysInMonth', function(){
    expect(dateUtils.daysInMonth(date)).toBe(30);
  });
});