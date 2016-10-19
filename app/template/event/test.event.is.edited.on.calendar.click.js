var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Event edit', function() {
  var Server = require('../../../test/servlet/servlet.for.test');
  var server = new Server();

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  beforeEach(function(){
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2016&m=9');
  });
  
  it('is working when clicking on event', function() {
    this.timeout(10000);
    return browser.click('#event-2').then(function(){
      browser.assert.text('title', 'Évènement');
    });
  });
});