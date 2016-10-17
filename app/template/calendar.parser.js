var fs = require('fs');
var cheerio = require('cheerio');
var dateUtils = require('../lib/date.utils');
var mainTemplate = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());

function Calendar(date, database) {
  this.date = date;
  this.database = database;
  this.daysInMonth = dateUtils.daysInMonth(this.date);
}

Calendar.prototype.fillCalendar = function(page) {  
  var template = cheerio.load(mainTemplate.html('.calendar'));

  template = cheerio(template('.calendar').empty());

  //template.append(this.buildMonthRow().html());
  template.append(this.buildDayWeekRow().html());
  template.append(this.buildDayRow().html());

  var elements = this.database.getAllElements();
  for (j = 0; j < elements.length; j++) {
    var element = elements[j];
    template.append(this.buildElementRow(element.element_id));
  }
  
  page("#next").attr('href', this.buildLinkNext());
  page("#previous").attr('href', this.buildLinkPrevious());
  
  page("#calendar .panel-body").empty();
    
  page(".month-title").text(dateUtils.getMonth(this.date) + ' ' + this.date.getFullYear());
  page("#calendar .panel-body").append(template);
};

Calendar.prototype.buildMonthRow = function() {
  var template = cheerio.load(mainTemplate.html('.month:first-child'));

  template('td:nth-child(2)').attr('colspan', this.daysInMonth);
  template('.month-title').text(dateUtils.getMonth(this.date) + ' ' + this.date.getFullYear());

  return template;
};

Calendar.prototype.buildDayRow = function() {
  var template = cheerio.load(mainTemplate.html('.day'));

  var firstCell = template.html('td:first-child');
  var cellTemplate = template.html('td:nth-child(2)');

  template('tr').empty().append(firstCell);

  for (i = 0; i < this.daysInMonth; i++) {
    var currentCell = cheerio(cellTemplate);
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i + 1, 0, 0, 0, 0);

    currentCell.attr('class', 'weekday' + currentDate.getDay());
    currentCell.text(i + 1);

    template('tr').append(currentCell);
  }

  return template;
};

Calendar.prototype.buildDayWeekRow = function(calendarSection) {
  var template = cheerio.load(mainTemplate.html('.dayweek'));

  var firstCell = template.html('td:first-child');
  var cellTemplate = template.html('td:nth-child(2)');

  template('tr').empty().append(firstCell);

  for (i = 0; i < this.daysInMonth; i++) {
    var currentCell = cheerio(cellTemplate);
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i + 1, 0, 0, 0, 0);

    currentCell.attr('class', 'weekday' + currentDate.getDay());
    currentCell.text(dateUtils.getShortWeekDay(currentDate));

    template('tr').append(currentCell);
  }

  return template;
};

Calendar.prototype.buildElementRow = function(element_id) {
  var $ = mainTemplate;
  var event_rows_html = $.html('tr[class=eventrow]');
  var template_row_element = $(event_rows_html).first();

  var event_divs_html = $.html('div[class=event]');
  var template_event_element = $(event_divs_html).first();

  var eventtext_divs_html = $.html('span[class=eventtext]');
  var template_eventtext_element = $(eventtext_divs_html).first();

  var template_cell_title_element = template_row_element.find('td').first();
  var template_cell_day_element = template_cell_title_element.next();

  template_row_element.empty();

  var element = this.database.findElementByID(element_id);
  template_cell_title_element.text(element.name);
  template_row_element.append(template_cell_title_element);

  for (i = 0; i < this.daysInMonth; i++) {
    var current_cell_day_element = template_cell_day_element.clone();

    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i + 1, 0, 0, 0, 0);

    current_cell_day_element.attr('class', 'weekday' + currentDate.getDay());
    current_cell_day_element.attr('data-day', element_id + '' + this.date.getMonth() + '' + (i + 1))

    template_row_element.append(current_cell_day_element);
  }

  var events = this.database.findEventsByElementYearMonth(element_id, this.date.getFullYear(), this.date.getMonth());
  for (i = 0; i < events.length; i++) {
    var event = events[i];
    var current_event_element = template_event_element.clone();
    var current_eventtext_element = template_eventtext_element.clone();

    current_event_element.attr("id", "event-" + event.event_id);
    

    current_eventtext_element.text(event.first_name);
    current_event_element.empty().append(current_eventtext_element);
    
    var current_start_day;
    if(this.date.getMonth() > event.start_date.getMonth()){
      current_start_day = 1;
      
      var end_date = new Date(event.start_date);
      end_date.setDate(event.start_date.getDate() + event.duration_days);
      current_event_element.attr("days", end_date.getDate());
      current_event_element.addClass("prev");
    }else{
      current_start_day = event.start_date.getDate();
      current_event_element.attr("days", event.duration_days);
    }

    var data_day_value = element_id + '' + this.date.getMonth() + '' + current_start_day;
    template_row_element.find('td[data-day="' + data_day_value + '"]').append(current_event_element);

  }

  return template_row_element;
};

Calendar.prototype.buildCalendarNavigation = function(){
  var nav = cheerio(mainTemplate.html('#next'));
};

Calendar.prototype.buildLinkNext = function(){
  var nextMonth = new Date(this.date);
  nextMonth.setMonth(this.date.getMonth() + 2);
  
  return "/calendar?y="+nextMonth.getFullYear()+"&m=" + nextMonth.getMonth();
};

Calendar.prototype.buildLinkPrevious = function(){ 
  var nextMonth = new Date(this.date);
  nextMonth.setMonth(this.date.getMonth());
  
  return "/calendar?y="+nextMonth.getFullYear()+"&m=" + nextMonth.getMonth();
};

module.exports = Calendar;