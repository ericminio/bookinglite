var dateUtils = require('../app/lib/date.utils');
var expect = require('expect');
var date = new Date('September 19, 2016 11:00:00');
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
});