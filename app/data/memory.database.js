var events = new Map();
var elements = new Map();

function Database() {
}
Database.prototype.events = events;
Database.prototype.createEvent = function(event){
    events.set(event.event_id, event);
}

Database.prototype.createElement = function(element){
    elements.set(element.element_id, element);
}

Database.prototype.findEventByElementAndDate = function(element_id, date){
  var toReturn;
  events.forEach(function(value, key, map){
    if(value.element_id == element_id && value.start_date.getTime() == date.getTime()){
      toReturn = value;
    }
  });
  return toReturn;
}

Database.prototype.findElementByID = function(element_id){
  var toReturn;
  elements.forEach(function(value, key, map){
    if(value.element_id == element_id){
      toReturn = value;
    }
  });
  return toReturn;
}

module.exports = Database;