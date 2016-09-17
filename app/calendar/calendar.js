var fs          = require('fs');
var cheerio		= require('cheerio');

calendar = function(request, response, database) {
  var html = fs.readFileSync('./app/calendar/calendar.html').toString();
  var $ = cheerio.load(html);
  $("title").html("Ceci est un nouveau test");
  response.write($.html());
	response.end();
  
};

module.exports = calendar;