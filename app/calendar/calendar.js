var fs        = require('fs');
var cheerio		= require('cheerio');
var dateUtils = require('../lib/date.utils');

function Calendar(date) {
  this.date = date;
}

Calendar.prototype.fillCalendar = function(page) {

  var table = cheerio('<table> </table>');
  table.append(this.buildMonthRow());
  table.append(this.buildDayRow());
  page("#calendar").empty().append(table);

  
};

Calendar.prototype.buildMonthRow = function(){
  var daysInMonth = dateUtils.daysInMonth(this.date);
  return cheerio('<tr class=month> <td colspan'+daysInMonth+'>'+dateUtils.getMonth(this.date)+'</td> </tr>');
};


Calendar.prototype.buildDayRow = function(calendarSection){
  var daysInMonth = dateUtils.daysInMonth(this.date);
  
  var newTr = cheerio('<tr class=day> </tr>');
  for(i=0;i<daysInMonth;i++){
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i,0,0,0,0);
    
    var newTd = cheerio('<td class=weekday'+currentDate.getDay()+'>'+i+'</td>');
    newTr.append(newTd);
  }

  return newTr;
};



module.exports = Calendar;