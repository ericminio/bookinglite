var dateUtils = require('./date.utils');
var expect = require('chai').expect;

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016,8,19,1,0,0,0);

describe('DateUtils', function(){
  
  it('returns expected Short Week Day', function(){
    expect(dateUtils.getShortWeekDay(date)).to.be.equal('L');
  });
  
  it('returns expected Long Week Day', function(){
    expect(dateUtils.getLongWeekDay(date)).to.be.equal('Lundi');
  }); 
  
  it('returns expected Month', function(){
    expect(dateUtils.getMonth(date)).to.be.equal('Septembre');
  }); 
  
  it('returns expected DaysInMonth', function(){
    expect(dateUtils.daysInMonth(date)).to.be.equal(30);
  });
  
  it('returns expected AddDays', function(){
    expect(dateUtils.addDays(date, 14).getTime()).to.be.equal(new Date(2016,9,3,1,0,0,0).getTime());
  });
  
  it('returns expected formatted date for HTML Select', function(){
    expect(dateUtils.formatForHTMLSelect(date)).to.be.equal('2016-09-19');
    expect(dateUtils.formatForHTMLSelect(new Date(2016,8,9,1,0,0,0))).to.be.equal('2016-09-09');
  });
});