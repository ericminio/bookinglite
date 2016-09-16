
function Server(router) {
	this.router = router;
}


Server.prototype.start = function() {
    var router = this.router;
		console.log('Server listening on ' + (process.env.PORT || 5000));
    this.server = require('http').createServer(function(request, response) {
        router.endPointOf(request)(request, response);
    }).listen(process.env.PORT || 5000);
};

Server.prototype.stop = function() {
	this.server.close();
};

module.exports = Server;