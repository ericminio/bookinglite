var dateUtils = require('../../lib/date.utils');

var calculateCellIndex = function(start_date, month, days) {
  if (start_date.getMonth() < month) {
    return 1;
  }
  return start_date.getDate();
}

var calculateEventLength = function(start_date, month, days) {
  if (start_date.getMonth() < month) {
    var date = new Date(start_date);
    date.setDate(start_date.getDate() + days);
    return date.getDate() - 1;
  }
  return days;
}

var buildCalendarHeader = function($, date) {
  $('.month-title').text(dateUtils.getMonth(date) + ' ' + date.getFullYear());
  var daysInMonth = dateUtils.daysInMonth(date);
  $('.month-title').attr('colspan', daysInMonth);

  var firstCellOfDayWeek = $('.dayweek td:first-child');
  var firstCellOfDay = $('.day td:first-child');

  var dayweek = $('.dayweek td:nth-child(2)').empty();
  var day = $('.day td:nth-child(2)').empty();

  $('.dayweek').empty().append(firstCellOfDayWeek);
  $('.day').empty().append(firstCellOfDay);

  for (i = 0; i < daysInMonth; i++) {
    var currentDate = new Date(date.getFullYear(), date.getMonth(), i + 1, 0, 0, 0, 0);

    var currentDayweekCell = dayweek.clone();
    var currentDayCell = day.clone();

    currentDayweekCell.attr('class', 'weekday' + currentDate.getDay());
    currentDayCell.attr('class', 'weekday' + currentDate.getDay());

    currentDayweekCell.text(dateUtils.getShortWeekDay(currentDate));
    currentDayCell.text(i + 1);

    $('.dayweek').append(currentDayweekCell);
    $('.day').append(currentDayCell);
  }
}

var buildElementRow = function($, date, element, events) {
  var daysInMonth = dateUtils.daysInMonth(date);

  $('.eventrow:nth-child(n+2)').remove();

  var cellTemplate = $('.eventrow td:nth-child(2)');
  var eventTemplate = $('.event');

  $('.eventrow').attr('id', 'element-' + element.element_id)
  $('.eventrow td:first-child').text(element.name);
  $('.eventrow td:nth-child(n+2)').remove();
  $('.event').remove();

  for (i = 0; i < daysInMonth; i++) {
    var currentDate = new Date(date.getFullYear(), date.getMonth(), i + 1, 0, 0, 0, 0);
    var currentCell = cellTemplate.clone();

    currentCell.attr('class', 'weekday' + currentDate.getDay());
    currentCell.attr('data-day', element.element_id + '' + (i + 1))

    $('.eventrow').append(currentCell);
  }

  for (k = 0; k < events.length; k++) {
    var currentEvent = eventTemplate.clone();
    
    var eventLength = calculateEventLength(events[k].start_date, date.getMonth(), events[k].duration_days);
    currentEvent.attr('days', eventLength);
    currentEvent.find('span').text(events[k].first_name + ' ' + events[k].last_name);
    var cellIndex = calculateCellIndex(events[k].start_date, date.getMonth(), events[k].duration_days);
    $('.eventrow td[data-day=' + element.element_id + '' + cellIndex + ']').append(currentEvent);
  }
}

module.exports = {
  buildCalendarHeader,
  buildElementRow,
  calculateCellIndex,
  calculateEventLength
};