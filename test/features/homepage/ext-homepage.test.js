var assert = require('assert');
var Browser = require('zombie');
var expect = require('expect');
var router = require('../../../app/servlet/router');

describe('External Home page', function() {
  
  before(function(done) {

    this.server = require('http').createServer(function(request, response) {
        router.endPointOf(request)(request, response);
    }).listen(5000);
    
    this.browser = new Browser();
    
    this.browser.visit('http://localhost:5000', function() {
      done();
    });
  });
  
  it('has expected title', function() {
    //this.browser.assert.text('title', 'Experimentation');
  });
  
  after(function(){
    this.server.close(); 
  });
});