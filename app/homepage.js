var fs        = require('fs');
var cheerio		= require('cheerio');
var Calendar = require('./calendar/calendar');

homepage = function(request, response, database) {
  var html = fs.readFileSync('./app/homepage.html').toString();
  var $ = cheerio.load(html);
	
	var tempDate = new Date(2016, 8, 19, 0,0,0,0);
	var calendar = new Calendar(tempDate);
	
	//var calendarSection = cheerio.load(fs.readFileSync('./app/calendar/calendar.html').toString())('#calendar').html();
	
	$("#calendar").empty().html();
	
	calendar.fillCalendar($);
	
  response.write($.html());
	response.end();
  
};

module.exports = homepage;