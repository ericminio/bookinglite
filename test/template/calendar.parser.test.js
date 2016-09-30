var cheerio   = require('cheerio');
var fs        = require('fs');
var assert    = require('assert');
var expect   = require('chai').expect;
var Calendar = require('../../app/template/calendar.parser');
var Database = require('../../app/data/memory.database');
var data = require('../database/test.data');
var $;

//September (month=8) 19th 2016 (It's a Monday)
var date = new Date(2016,8,19,0,0,0,0);

describe('Calendar template', function(){
  beforeEach(function(){   
    var html = '<section id=calendar><table class=calendar><table></section>';
    $ = cheerio.load(html);
  });
  
  before(function(){
    this.database = new Database(data);
    
    for(i=0; i<data.events.length; i++){
      this.database.createEvent(data.events[i]);
    }
    
    for(i=0; i<data.elements.length; i++){
      this.database.createElement(data.elements[i]);
    }
  });
  
  it('has element with id "calendar"', function(){
    expect($('#calendar').html()).to.exist;
  });
  
  it('has element with class "calendar"', function(){
    expect($('.calendar').html()).to.exist;
  });
  
  it('display month cell', function(){
    var calendar = new Calendar(date, this.database);
    var row = calendar.buildMonthRow();
    
    expect(row('td', 'tr').next().attr('colspan')).to.equal('30');
    expect(row('td', 'tr').next().text()).to.equal('Septembre 2016');
  });
  
  it('display day cell', function(){
    var calendar = new Calendar(date);
    var row = calendar.buildDayRow();
    expect(row.text()).to.equal('Chalets123456789101112131415161718192021222324252627282930');
  });
  
  it('display dayweek cell', function(){
    var calendar = new Calendar(date);
    var row = calendar.buildDayWeekRow();
    expect(row.text()).to.equal('JVSDLMMJVSDLMMJVSDLMMJVSDLMMJV');
  });

  it('dayplay chalet 1 with 2 events', function(){   
    var calendar = new Calendar(date, this.database);
    var row = calendar.buildElementRow(1);
    
    expect(row).to.exist;
    
    var event_element = $(row).find('div[id=event-1]').first();
    expect(event_element.html()).to.contain("Mathieu");
    
    expect(row.html()).to.contain("Chalet 1");
    expect(row.text()).to.contain('Mathieu')
    
  });
  
});