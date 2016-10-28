var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');
var dateUtils = require('../../app/lib/date.utils');

edit_event = function(request, response, database) {
	var html = fs.readFileSync('./app/template/event/edit.event.template.html').toString();
	var $ = cheerio.load(html);
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var event_id = query.e;
	var event = database.findEventByID(event_id);
	if (!event_id || !event) {
		response.write(fs.readFileSync('./app/template/error/edit.event.error.missing.params.html').toString());
		response.end();
		return;
	}
	
	
	$('#y').val(query.y);
	$('#m').val(query.m);
	
	$('#event_id').val(event.event_id);
	$('#firstname').val(event.first_name);
	$('#lastname').val(event.last_name);
	$('#startdate').val(dateUtils.formatForHTMLSelect(event.start_date));
	var endDate = dateUtils.addDays(event.start_date, event.duration_days);
	$('#enddate').val(dateUtils.formatForHTMLSelect(endDate));
	var elements = database.getAllElements();
	$('#element').empty();
	elements.forEach(function(element) {
		var option = cheerio('<option> </option>');
		option.val(element.element_id);
		option.text(element.name);
		$('#element').append(option);
	})
	$('#element').val(event.element_id);
	response.write($.html());
	response.end();
};

module.exports = edit_event;