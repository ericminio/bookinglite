var Database = require('../../app/data/memory.database');
var data = require('./test.data');
var expect = require('chai').expect;
var assert = require('assert');
describe('Memory database', function(){
  
  before(function(){
    this.database = new Database();
    
    for(i=0; i<data.events.length; i++){
      this.database.createEvent(data.events[i]);
    }
    
    for(i=0; i<data.elements.length; i++){

      this.database.createElement(data.elements[i]);
    }
    
  });
  
  it('can read first event from element_id and date', function(){
    var date = new Date(2016,8,19,0,0,0,0);
    
    var event = this.database.findEventByElementAndDate(1, date);
    expect(event).to.not.equal(undefined);
    assert.equal(event.event_id, 1);
    
  });
  
  it('can read second event from element_id and date', function(){
    var date = new Date(2016,8,25,0,0,0,0);
    
    var event = this.database.findEventByElementAndDate(1, date);
    expect(event).to.not.equal(undefined);
    assert.equal(event.event_id, 2);
    
  });
  
  it('can read element from element_id', function(){
    var element = this.database.findElementByID(1);
    expect(element).to.not.equal(undefined);
    assert.equal(element.name, "Chalet 1");
    
  });
  
});