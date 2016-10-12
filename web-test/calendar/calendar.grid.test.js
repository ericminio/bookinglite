var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var chai = require('chai')
var chaiWebdriver = require('chai-webdriver-promised');
var expect = chai.expect;

describe('Calendar grid', function() {
  var Server = require('../../app/servlet/server');
  var router = require('../../app/servlet/router');
  var Database = require('../../app/data/memory.database');
  var data = require('../../test/database/test.data');

  var server = new Server(router);
  server.useDatabase(new Database(data));

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

  //   it('show events width expected width', function(done) {
  //     this.timeout(10000);
  //     var element = driver.findElement(By.id('event-4'));
  //     element.getCssValue('width').then(
  //       function(value) {
  //         expect(value).to.be.equal('px');
  //         done();
  //       });
  //   });

});