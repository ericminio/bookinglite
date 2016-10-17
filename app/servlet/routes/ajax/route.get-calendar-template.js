var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');
var dateUtils = require('../../../lib/date.utils');
var calendarBuilder = require('../../../template/js/calendar.builder');

calendar = function(request, response, database) {
// 	var html = fs.readFileSync('./app/template/calendar.template.html').toString();
// 	var $ = cheerio.load(html);

	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var date;
	if(query.y && query.m){
		date = new Date(query.y, query.m - 1, 1, 0, 0, 0, 0);
	}else{
		date = new Date();
	}
	
	var $ = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
	
	calendarBuilder.buildCalendarHeader($, date);
	
	$('.eventrow').remove();
	$('.event').remove();
	
	var elements = database.getAllElements();
	for(j=0; j<elements.length; j++){
		var template = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
		var events = database.findEventsByElementYearMonth(elements[j].element_id, date.getFullYear(), date.getMonth());
		calendarBuilder.buildElementRow(template, date, elements[j], events);	
		$('.calendar').append(template.html('.eventrow'));
	}
	
	
	response.write($.html('.calendar'));
	response.end();

};



module.exports = calendar;