var fs        = require('fs');
var cheerio		= require('cheerio');
var dateUtils = require('../lib/date.utils');

function Calendar(date) {
  this.date = date;
}

Calendar.prototype.fillCalendar = function(page, currentDate) {
  var calendarSection = page("#calendar");
  calendarSection.empty();
  
  calendarSection.append('<table>');
  this.fillMonth(calendarSection);
  
  calendarSection.append('</table>');
  
};

Calendar.prototype.fillMonth = function(calendarSection){
  var daysInMonth = dateUtils.daysInMonth(this.date);
  calendarSection.append('<tr class=month> <td colspan'+daysInMonth+'>'+dateUtils.getMonth(this.date)+'</td> </tr>');
};

Calendar.prototype.fillDay = function(calendarSection){
  var daysInMonth = dateUtils.daysInMonth(this.date);
  
  calendarSection.append('<tr class=day>');
  for(i=0;i<daysInMonth;i++){
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i,0,0,0,0);
    calendarSection.append('<td class=weekday'+currentDate.getDay()+'>'+i+'</td>');
  }
  calendarSection.append('</tr>');
};



module.exports = Calendar;