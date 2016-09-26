var fs        = require('fs');
var cheerio		= require('cheerio');
var Calendar = require('../../template/calendar.parser');

calendar = function(request, response, database) {
  var html = fs.readFileSync('./app/template/calendar.template.html').toString();
  var $ = cheerio.load(html);
	
	var tempDate = new Date(2016, 8, 19, 0,0,0,0);
	var calendar = new Calendar(tempDate, database);
	
	calendar.fillCalendar($);
	
  response.write($.html());
	response.end();
  
};

module.exports = calendar;