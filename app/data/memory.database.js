var events = new Map();
var elements = new Map();

function Database(data) {
  for (i = 0; i < data.events.length; i++) {
    this.createEvent(data.events[i]);
  }

  for (i = 0; i < data.elements.length; i++) {
    this.createElement(data.elements[i]);
  }
}

Database.prototype.events = events;
Database.prototype.createEvent = function(event) {
  events.set(event.event_id, event);
}

Database.prototype.createElement = function(element) {
  elements.set(element.element_id, element);
}

Database.prototype.findEventByElementAndDate = function(element_id, date) {
  var toReturn;
  events.forEach(function(value, key, map) {
    if (value.element_id == element_id && value.start_date.getTime() == date.getTime()) {
      toReturn = value;
    }
  });
  return toReturn;
}

Database.prototype.findEventsByElementYearMonth = function(element_id, year, month) {
  var list = [];

  events.forEach(function(value, key, map) {
    var start_date = value.start_date;
    var end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + value.duration_days);
  
//     console.log(value.event_id + ' ' + value.element_id + ' -- ' + start_date + '-- for ' + value.duration_days + ' days --' + end_date);
    if (value.element_id == element_id &&
      (start_date.getFullYear() == year || end_date.getFullYear() == year) &&
      (start_date.getMonth() == month || end_date.getMonth() == month)) {
      list.push(value);
    }
  });
  return list;
}


Database.prototype.findElementByID = function(element_id) {
  var toReturn;
  elements.forEach(function(value, key, map) {
    if (value.element_id == element_id) {
      toReturn = value;
    }
  });
  return toReturn;
}

Database.prototype.findEventByID = function(event_id) {
  var toReturn;
  events.forEach(function(value, key, map) {
    if (value.event_id == event_id) {
      toReturn = value;
    } 
  });
  return toReturn;
}

Database.prototype.saveEvent = function(event) {
  events.forEach(function(value, key, map) {
    if (value.event_id == event.event_id) {
      value.first_name = event.first_name;
      return value;
    }
  });
}

Database.prototype.getAllElements = function() {
  var iterator = elements.values();
  var list = [];
  while (true) {
    var value = iterator.next().value;
    if (!value) {
      break;
    }
    list.push(value);

  }
  return list;
}

module.exports = Database;