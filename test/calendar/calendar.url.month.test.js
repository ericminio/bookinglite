var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Calendar for any given month', function() {
  var Server = require('../../test/servlet/servlet.for.test');
  var server = new Server();

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  it('displays the calendar properly', function() {
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2015&m=10').then(function(err) {
      expect(browser.text('.month-title')).to.be.equal('Octobre 2015');

    });

  });
});