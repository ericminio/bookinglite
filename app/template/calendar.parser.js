var fs        = require('fs');
var cheerio		= require('cheerio');
var dateUtils = require('../lib/date.utils');

function Calendar(date, database) {
  this.date = date;
  this.database = database;
  this.daysInMonth = dateUtils.daysInMonth(this.date);
  
}

Calendar.prototype.fillCalendar = function(page) {

  var table = cheerio('<table class=calendar> </table>');
  
  table.append(this.buildMonthRow().html());
  table.append(this.buildDayWeekRow());
  table.append(this.buildDayRow().html());
  table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
    table.append(this.buildElementRow(1));
  
  page("#calendar").empty().append(table);

  
};

Calendar.prototype.buildMonthRow = function(){
  var mainTemplate = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
  var monthTemplate = cheerio.load(mainTemplate.html('.month:first-child'));
  
  monthTemplate('td:nth-child(2)').attr('colspan', this.daysInMonth);
  monthTemplate('.month-title').text(dateUtils.getMonth(this.date) + ' ' + this.date.getFullYear());
  
  return monthTemplate;
};

Calendar.prototype.buildDayRow = function(){
  var mainTemplate = cheerio.load(fs.readFileSync('./app/template/calendar.template.html').toString());
  var dayTemplate = cheerio.load(mainTemplate.html('.day'));
 
  var cellElemenTitle = dayTemplate.html('td:first-child'); 
  var cellTemplate = dayTemplate.html('td:nth-child(2)');
  
  dayTemplate('tr').empty();
  dayTemplate('tr').append(cellElemenTitle);
 
  for(i=0;i<this.daysInMonth;i++){
    var currentCell = cheerio(cellTemplate);
    var currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i+1,0,0,0,0);
    
    currentCell.attr('class', 'weekday' + currentDate.getDay());
    currentCell.text(i+1);
    
    dayTemplate('tr').append(currentCell);
  }

  return dayTemplate;
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