var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Navigation', function() {
  var Server = require('../../test/servlet/servlet.for.test');
  var server = new Server();

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  beforeEach(function(){
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2015&m=10');
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