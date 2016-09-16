var router = require('./router');
var Server = require('./server');
//var ProductionDatabase = require('./production.database');

var server = new Server(router);
//var database = new ProductionDatabase();
//server.useDatabase(database);

server.start();