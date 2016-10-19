var servecontent = require('./serve-content.js');

module.exports = {

	routes: [
		// 		{
		// 		pattern: /\/calendar\??(&?\w*=\w*)*?(#\w*)?$/,
		// 		target: require('./routes/route.calendar')
		// 	}, 
		{
			pattern: /\/calendar\??(&?\w*=\w*)*?(#\w*)?$/,
			target: require('./routes/route-ajax.calendar')
		}, {
			pattern: /\/calendar-template.*$/,
			target: require('./routes/ajax/route.get-calendar-template')
		}, {
			pattern: /\/calendar\/edit$/,
			target: require('./routes/route-edit.calendar')
		}
	],

	endPointOf: function(request) {
		for (i = 0; i < this.routes.length; i++) {
			if (this.routes[i].pattern.test(request.url)) {
				return this.routes[i].target;
			}
		}
		if (request.url == '/') {
			return require('./routes/route-ajax.calendar');
		}
		return servecontent('app');
	}
};