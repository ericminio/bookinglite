const week_day_short = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const week_day_long = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const month = ['Janvier', 'Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

module.exports={
  getShortWeekDay : function(date){
    var dayOfWeek = date.getDay();
    return week_day_short[dayOfWeek-1];
  },
  getLongWeekDay : function(date){
    var dayOfWeek = date.getDay();
    return week_day_long[dayOfWeek-1];
  },
  getMonth : function(date){
    var monthValue = date.getMonth();
    return month[monthValue];
  },
};

