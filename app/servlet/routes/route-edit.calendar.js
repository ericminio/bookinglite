var fs = require('fs');

edit_calendar = function(request, response, database) {
	var html = fs.readFileSync('./app/template/event/edit.event.template.html').toString();

	response.write(html);
	response.end();

};

module.exports = edit_calendar;