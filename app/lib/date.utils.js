const week_day_short_fr = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const week_day_long_fr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const month_fr = ['Janvier', 'Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

module.exports={
  getShortWeekDay : function(date){
    var dayOfWeek = date.getDay();
    return week_day_short_fr[dayOfWeek-1];
  },
  getLongWeekDay : function(date){
    var dayOfWeek = date.getDay();
    return week_day_long_fr[dayOfWeek-1];
  },
  getMonth : function(date){
    var monthValue = date.getMonth();
    return month_fr[monthValue];
  },
  daysInMonth : function(date){
    var monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    var monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  }
  
};

