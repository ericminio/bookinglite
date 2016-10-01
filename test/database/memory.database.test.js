var Database = require('../../app/data/memory.database');
var data = require('./test.data');
var expect = require('chai').expect;
var assert = require('assert');
describe('Memory database', function() {

  before(function() {
    this.database = new Database(data);
  });

  it('can read first event from element_id and date', function() {
    var date = new Date(2016, 8, 19, 0, 0, 0, 0);

    var event = this.database.findEventByElementAndDate(1, date);
    expect(event).to.not.equal(undefined);
    assert.equal(event.event_id, 1);

  });

  it('can read all events from element_id, year and month', function() {
    var events = this.database.findEventsByElementYearMonth(1, 2016, 8);
    expect(events).to.not.equal(undefined);
    assert.equal(events.length, 2);

  });

  it('can read second event from element_id and date', function() {
    var date = new Date(2016, 8, 25, 0, 0, 0, 0);

    var event = this.database.findEventByElementAndDate(1, date);
    expect(event).to.not.equal(undefined);
    assert.equal(event.event_id, 2);

  });

  it('can read element from element_id', function() {
    var element = this.database.findElementByID(1);
    expect(element).to.not.equal(undefined);
    assert.equal(element.name, "Chalet 1");

  });

  it('can return all elements', function() {
    var elements = this.database.getAllElements();
    expect(elements).to.not.equal(undefined);
    assert.equal(elements.length, 2);
    assert.equal(elements[0].element_id, 1);
    assert.equal(elements[1].element_id, 2);

  });

  it('can read second event from element_id and date', function() {
    var start_date = new Date(2016, 7, 28, 0, 0, 0, 0);
    var end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + 7);

    assert.equal(end_date, new Date(2016, 8, 4, 0, 0, 0, 0));
  });

  it('can return events stating in previous month', function() {
    var elements = this.database.findEventsByElementYearMonth(1, 2016, 8);
    expect(elements).to.not.equal(undefined);
    assert.equal(elements.length, 3);
    assert.equal(elements[0].element_id, 1);
    assert.equal(elements[1].element_id, 2);
    assert.equal(elements[2].element_id, 4);
  });

});