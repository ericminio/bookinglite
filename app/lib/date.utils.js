const week_day_short_fr = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const week_day_long_fr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const month_fr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

module.exports = {
  getShortWeekDay: function(date) {
    var dayOfWeek = date.getDay();
    return week_day_short_fr[dayOfWeek];
  },
  getLongWeekDay: function(date) {
    var dayOfWeek = date.getDay();
    return week_day_long_fr[dayOfWeek];
  },
  getMonth: function(date) {
    var monthValue = date.getMonth();
    return month_fr[monthValue];
  },
  daysInMonth: function(date) {
    var monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    var monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  },
  addDays: function(date, days) {
    var newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  },
  formatForHTMLSelect: function(date) {
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var formatDate = date.getFullYear() + "-" + month + "-" + day;
    return formatDate;
  },


};