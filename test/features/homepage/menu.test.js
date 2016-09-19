var cheerio   = require('cheerio');
var fs        = require('fs');
var assert    = require('assert');
var expect   = require('expect');
var $;

describe('Home page', function(){
  before(function(){   
    var html = fs.readFileSync('./app/homepage.html').toString();
    $ = cheerio.load(html);
    
  });
  
  it('has expected current date', function(){

  });
  
  it('has element with class "calendar"', function(){
    expect($('.calendar').html()).toExist('but element "calendar" was not fount.');
  });
  
});