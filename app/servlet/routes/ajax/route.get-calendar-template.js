var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');
var dateUtils = require('../../../lib/date.utils');
var calendarBuilder = require('../../../template/calendar/calendar.builder');

calendar = function(request, response, database) {
	var $ = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
	
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var date = new Date(query.date);
	if(!date){
		date = new Date();
	}

	
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
	
	var values = {"html": $.html('.calendar'),
 						  "request_id": query.request_id};
							
	response.write(JSON.stringify(values));
	response.end();

};



module.exports = calendar;