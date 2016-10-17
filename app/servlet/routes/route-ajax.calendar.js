var fs = require('fs');
var cheerio = require('cheerio');
var Calendar = require('../../template/calendar.parser');
var url = require('url');

calendar = function(request, response, database) {
	var html = fs.readFileSync('./app/template/calendar-ajax.template.html').toString();
	var $ = cheerio.load(html);

	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	var tempDate;
	if(query.y && query.m){
		tempDate = new Date(query.y, query.m - 1, 1, 0, 0, 0, 0);
	}else{
		tempDate = new Date();
	}
	
	$('#m').val(tempDate.getMonth()+1);
	$('#y').val(tempDate.getFullYear());

	response.write($.html());
	response.end();

};

module.exports = calendar;