var webdriver = require('selenium-webdriver')
var chai = require('chai')
var chaiWebdriver = require('chai-webdriver-promised');
var expect = chai.expect;

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
  driver.manage().window().setSize(1024, 768).then(function() {
    return done();
  });
});

after(function(done) {
  server.stop();
  driver.quit().then(function() {
    return done();
  });
});

describe('Calendar grid', function() { 
  beforeEach(function(done) {
    this.timeout(10000);
    driver.get('http://localhost:5000').then(done);
  });

  it('is displayed on the main page', function() {
    return expect('#calendar').dom.to.be.visible();
  });

  it('has a div of class event with id event-1', function() {
    return expect('#event-1').dom.to.be.visible();
  });

  it('has a div of class event with id event-4', function() {
    return expect('#event-1').dom.to.be.visible();
  });

});