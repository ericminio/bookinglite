var servecontent = require('./serve-content.js');

module.exports = {
	
    routes: [
        {
 						pattern: /^\/calendar[\/]?$/,
            target: require('../calendar/calendar')
        }
    ],
    
	endPointOf: function(request) {
		for (i=0; i<this.routes.length; i++) {
			if (this.routes[i].pattern.test(request.url)) {
				return this.routes[i].target;
			}
		}
		if (request.url == '/') {
			return require('../homepage');
		}
		return servecontent('app');
	}
};