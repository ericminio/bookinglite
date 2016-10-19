var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var chai = require('chai')
var chaiWebdriver = require('chai-webdriver-promised');
var expect = chai.expect;

describe('Calendar grid', function() {
  var Server = require('../../test/servlet/servlet.for.test');
  var server = new Server();

  var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
  chai.use(chaiWebdriver(driver, 15000, 200));

  before(function(done) {
    server.start();
    this.timeout(10000);
    driver.get('http://localhost:5000/calendar?y=2016&m=9').then(done);
  });

  after(function(done) {
    this.timeout(10000);
    server.stop();

    driver.quit().then(done);
  });

  it('is displayed on the main page', function() {
    return expect('#calendar').dom.to.be.visible();
  });

  it('has a div of class event with id event-1', function() {
    return expect('#event-1').dom.to.be.visible();
  });

  it('has a div of class event with id event-4', function() {
    return expect('#event-4').dom.to.be.visible();
  });

});