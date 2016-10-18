var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Navigation', function() {
  var Server = require('../../app/servlet/server');
  var router = require('../../app/servlet/router');
  var Database = require('../../app/data/memory.database');
  var data = require('../../test/database/test.data');

  before(function() {
    this.server = new Server(router);
    this.server.useDatabase(new Database(data));
    this.server.start();
  });

  after(function() {
    this.server.stop();
  });

  beforeEach(function(){
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar-ajax?y=2015&m=10');
  });
  
  it('using the next link display the next month', function() {
    this.timeout(10000);
    return browser.clickLink('#next').then(function(){
      browser.assert.text('.month-title', 'Novembre 2015');
    });
  });
  
  it('using the previous link display the previous month', function() {
    this.timeout(10000);
    return browser.clickLink('#previous').then(function(){
      browser.assert.text('.month-title', 'Septembre 2015');
    });
  });
});