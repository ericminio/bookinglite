var servecontent = require('./serve-content.js');

module.exports = {
	
    routes: [
        {
 						pattern: /\/calendar\??(&?\w*=\w*)*?(#\w*)?$/,
            target: require('./routes/route.calendar')
        }
    ],
    
	endPointOf: function(request) {
		for (i=0; i<this.routes.length; i++) {
			if (this.routes[i].pattern.test(request.url)) {
				return this.routes[i].target;
			}
		}
		if (request.url == '/') {
			return require('./routes/route.calendar');
		}
		return servecontent('app');
	}
};