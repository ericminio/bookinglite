var fs        = require('fs');
var cheerio		= require('cheerio');
var dateUtils = require('../lib/date.utils');

function Calendar(date, database) {
  this.date = date;
  this.database = database;
  this.daysInMonth = dateUtils.daysInMonth(this.date);
  this.mainTemplate = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
}

Calendar.prototype.fillCalendar = function(page) {

  var table = cheerio('<table class=calendar> </table>');
  
  table.append(this.buildMonthRow().html());
  table.append(this.buildDayWeekRow());
  table.append(this.buildDayRow());
  table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
  
  page("#calendar").empty().append(table);

  
};

Calendar.prototype.buildMonthRow = function(){
  var monthTemplate = cheerio.load(this.mainTemplate.html('.month:first-child'));
  
  monthTemplate('td:nth-child(2)').attr('colspan', this.daysInMonth);
  monthTemplate('.month-title').text(dateUtils.getMonth(this.date) + ' ' + this.date.getFullYear());
  
  return monthTemplate;
  //return cheerio.load('<tr class=month><td class="element-title"></td> <td  colspan='+this.daysInMonth+'>'+dateUtils.getMonth(this.date)+'</td> </tr>');
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

Calendar.prototype.buildElementRow = function(element_id){
  var newTr = cheerio('<tr class=eventrow> </tr>');
  
  var element = this.database.findElementByID(element_id);
  
  newTr.append(cheerio('<td class="element-title">'+element.name+'</td>'));
  
  for(i=0;i<this.daysInMonth;i++){
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i+1,0,0,0,0);
    var newTd = cheerio('<td data-day='+ this.date.getMonth() + '' + (i+1) +' class=weekday'+currentDate.getDay()+'></td>');
    
    
    newTr.append(newTd);
  }
  
  return newTr;
};



module.exports = Calendar;