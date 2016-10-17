var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Calendar for any given month', function() {
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

  it('displays the calendar properly', function() {
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2015&m=10').then(function(err) {
      expect(browser.text('.month')).to.be.equal('Octobre 2015');

    });

  });
  
  it('displays the calendar properly', function() {
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar-ajax?y=2015&m=10').then(function(err) {
      expect(browser.text('.month')).to.be.equal('Octobre 2015');

    });

  });
});