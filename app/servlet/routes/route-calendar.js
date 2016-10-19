var fs = require('fs');
var cheerio = require('cheerio');
var Calendar = require('../../template/calendar.parser');
var url = require('url');

calendar = function(request, response, database) {
	var html = fs.readFileSync('./app/template/calendar.template.html').toString();
	var $ = cheerio.load(html);

	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var tempDate;
	if(query.y && query.m){
		tempDate = new Date(query.y, query.m - 1, 1, 0, 0, 0, 0);
	}else{
		tempDate = new Date();
	}
	
	var calendar = new Calendar(tempDate, database);

	calendar.fillCalendar($);

	response.write($.html());
	response.end();

};

module.exports = calendar;