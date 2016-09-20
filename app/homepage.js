var fs        = require('fs');
var cheerio		= require('cheerio');
var fillCalendar = require('./calendar/calendar');

homepage = function(request, response, database) {
  var html = fs.readFileSync('./app/homepage.html').toString();
  var $ = cheerio.load(html);
	
	var calendar = cheerio.load(fs.readFileSync('./app/calendar/calendar.html').toString())('#calendar').html();
	
	fillCalendar($);
	
  response.write($.html());
	response.end();
  
};

module.exports = homepage;