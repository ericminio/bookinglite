var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var chai = require('chai')
var expect = chai.expect;
var Server = require('../../../test/servlet/servlet.for.test');
var server = new Server();

describe.only('Event display prev', function() {
  var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();

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

  it('show event with left=0px when starting in the previous month', function(done) {
    this.timeout(10000);
    driver.manage().window().setSize(1024, 768).then(function() {
      var element = driver.findElement(By.id('event-4'));
      element.getCssValue('left').then(
        function(value) {
          
          expect(value).to.be.equal('0px');
          done();
        });
    });
  });
  
  it('show event with prev class when starting in the previous month', function(done) {
    this.timeout(10000);
    driver.manage().window().setSize(1024, 768).then(function() {
      var element = driver.findElement(By.id('event-4'));
      element.getAttribute('class').then(
        function(value) {
          expect(value).to.contains('prev');
          done();
        });
    });
  });
});