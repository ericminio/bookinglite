var router = require('./router');
var Server = require('./server');
var Database = require('../app/data/memory.database');
var data = require('../test/database/test.data');
var server = new Server(router);
var database = new Database(data);

server.useDatabase(database);

server.start();