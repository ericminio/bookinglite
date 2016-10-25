var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');
var dateUtils = require('../../../app/lib/date.utils');

save_event = function(request, response, database) {
	
// 	var url_parts = url.parse(request.url, true);
// 	var query = url_parts.query;

// 	var event_id = query.event_id;
// 	var event = database.findEventByID(event_id);
	
// 	if(!event_id || !event){
// 		// create error message
// 		response.end();
// 		return;
// 	}
	console.log("pre saved");	
	database.saveEvent({"event_id":2,"first_name":"Jess Ika"});
	console.log("saved");
	response.write(JSON.stringify({"success": true}));
	response.end();

};

module.exports = save_event;