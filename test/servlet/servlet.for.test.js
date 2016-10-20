var method = ServletForTest.prototype;

var Server = require('../../servlet/server');
var router = require('../../servlet/router');
var Database = require('../../app/data/memory.database');
var data = require('../../test/database/test.data');


function ServletForTest() {}

method.start = function() {
  this.server = new Server(router);
  this.server.useDatabase(new Database(data));
  this.server.start();
}

method.stop = function() {
  this.server.stop();
}


module.exports = ServletForTest;