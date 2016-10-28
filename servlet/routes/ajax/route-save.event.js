var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');
var dateUtils = require('../../../app/lib/date.utils');

save_event = function(request, response, database) {
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var event = database.findEventByID(query.event_id);

	if (!event) {
		//TODO: create error message
		response.end();
		return;
	}
	
	database.saveEvent({
		"event_id": query.event_id,
		"first_name": query.firstname
	});

	response.write(JSON.stringify({
		
	})); 
	response.end();

};

module.exports = save_event;