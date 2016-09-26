var assert = require('assert');
var Browser = require('zombie');
var expect = require('expect');
var router = require('../../../app/servlet/router');
var Database = require('../../../app/data/memory.database');
var data = require('../../database/test.data');

describe('External Home page', function() {
  
  before(function(done) {

    var database = new Database(data);
    
    this.server = require('http').createServer(function(request, response) {
        router.endPointOf(request)(request, response, database);
    }).listen(5000);
    
    this.browser = new Browser();
    
    this.browser.visit('http://localhost:5000', function() {
      done();
    });
  });
  
  it('has expected title', function() {
    this.browser.assert.text('title', 'Experimentation');
  });
  
  after(function(){
    this.server.close(); 
  });
});