var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Calendar for any given month', function(){
  var Server = require('../../app/servlet/server');
  var router = require('../../app/servlet/router');
  var Database = require('../../app/data/memory.database');
  var data = require('../../test/database/test.data');

  var server = new Server(router);
  server.useDatabase(new Database(data));

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });
  
  it('displays the calendar properly', function(){
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2016&m=10').then(function(err){
      expect(browser.text('.month')).to.be.equal('Octobre 2016');
      
    });
    
  });
});