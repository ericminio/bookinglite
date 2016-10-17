var servecontent = require('./serve-content.js');

module.exports = {

	routes: [{
		pattern: /\/calendar\??(&?\w*=\w*)*?(#\w*)?$/,
		target: require('./routes/route.calendar')
	}, {
		pattern: /\/calendar-ajax\??(&?\w*=\w*)*?(#\w*)?$/,
		target: require('./routes/route-ajax.calendar')
	}, {
		pattern: /\/calendar-template.*$/,
		target: require('./routes/ajax/route.get-calendar-template')
	}
	],

	endPointOf: function(request) {
		for (i = 0; i < this.routes.length; i++) {
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