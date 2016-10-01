
function Server(router) {
	this.router = router;
}

Server.prototype.useDatabase = function(database){
	this.database = database;
}

Server.prototype.start = function() {
    var router = this.router;
		var database = this.database;
		//console.log('Server listening on ' + (process.env.PORT || 5000));
    this.server = require('http').createServer(function(request, response) {
        router.endPointOf(request)(request, response, database);
    }).listen(process.env.PORT || 5000);
};

Server.prototype.stop = function() {
	this.server.close();
	//console.log('Server closed');
};

module.exports = Server;