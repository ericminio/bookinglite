var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;
var assert = require('assert');
var chai = require('chai')
chai.use = require('chai-as-promised');
var expect = chai.expect;
var webServer = require('../../app/servlet/web');

describe('Calendar grid', function() {

  before(function() {
    webServer.start();
  });

  beforeEach(function(done) {
    this.timeout(10000);
    this.driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.firefox()).
    build();
    this.driver.get('http://localhost:5000').then(done);
  });

  afterEach(function(done) {
    this.driver.quit().then(done);
  });

  after(function() {
    webServer.stop();
  });

  it('is displayed on the main page', function(done) {
    this.driver.findElement(By.id('calendar')).getAttribute('id').then(function(id) {
      assert.equal(id, 'calendar');
      done();
    });
  });

  it('has a div of class event with id event-1', function() {
    Object.prototype.getName = function() {
      var funcNameRegex = /function (.{1,})\(/;
      var results = (funcNameRegex).exec((this).constructor.toString());
      return (results && results.length > 1) ? results[1] : "";
    };

    this.driver.findElement(By.id('event-1')).then(function(el) {
      console.log(el.getName());
    });
  });

});