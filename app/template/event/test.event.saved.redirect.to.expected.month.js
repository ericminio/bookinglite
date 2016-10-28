var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();
var Server = require('../../../test/servlet/servlet.for.test');
var server = new Server();

describe.only('Event redirect', function() {
  before(function() {
    server.start();
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar/event/edit?e=2');
  });

  after(function() {
    server.stop();
  });

  describe('click submit', function() {
    before(function() {
      return browser.pressButton("Enregistrer");
    });

    it('redirect to expected month', function() {
      setTimeout(0,function(){
        expect(browser.text('.month-title')).to.be.equal('Septembre 2016');
      });
    });
  });
});