var fs          = require('fs');
var cheerio		= require('cheerio');

calendar = function(request, response, database) {
  var html = fs.readFileSync('./app/calendar/calendar.html').toString();
  var page = cheerio.load(html);
  
  response.write(page.html());
	response.end();
  
};

module.exports = calendar;