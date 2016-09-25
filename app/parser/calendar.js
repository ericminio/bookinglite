var fs        = require('fs');
var cheerio		= require('cheerio');
var dateUtils = require('../lib/date.utils');

function Calendar(date) {
  this.date = date;
  this.daysInMonth = dateUtils.daysInMonth(this.date);
}

Calendar.prototype.fillCalendar = function(page) {

  var table = cheerio('<table class=calendar> </table>');
  
  table.append(this.buildMonthRow().html());
  table.append(this.buildDayWeekRow());
  table.append(this.buildDayRow());
  
  page("#calendar").empty().append(table);

  
};

Calendar.prototype.buildMonthRow = function(){
  
  return cheerio.load('<tr class=month><td class="element-title"></td> <td colspan='+this.daysInMonth+'>'+dateUtils.getMonth(this.date)+'</td> </tr>');
};

Calendar.prototype.buildDayRow = function(calendarSection){
  var newTr = cheerio('<tr class=day> </tr>');
  newTr.append(cheerio('<td class="element-title">Chalets</td>'));
  for(i=0;i<this.daysInMonth;i++){
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i+1,0,0,0,0);
    
    var newTd = cheerio('<td class=weekday'+currentDate.getDay()+'>'+(i+1)+'</td>');
    newTr.append(newTd);
  }

  return newTr;
};

Calendar.prototype.buildDayWeekRow = function(calendarSection){
  var newTr = cheerio('<tr class=dayweek> </tr>');
  newTr.append(cheerio('<td></td>'));
  for(i=0;i<this.daysInMonth;i++){
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i+1,0,0,0,0);
    
    var newTd = cheerio('<td class=weekday'+currentDate.getDay()+'>'+dateUtils.getShortWeekDay(currentDate)+'</td>');
    newTr.append(newTd);
  }

  return newTr;
};

Calendar.prototype.buildElementRow = function(){
  
  var newTr = cheerio('<tr class=dayweek> </tr>');
};



module.exports = Calendar;