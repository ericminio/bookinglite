var pg      = require('pg');
var $       = require('jquery');
var array   = require('array.utils');

function PostgreSql(url) {
	this.url = url;	
}

// PostgreSql.prototype.createPlayer = function(player, callback) {
// 	client = new pg.Client(this.url);
// 	client.connect(function(err) {
// 		var sql = "select count(1) from players where login = '" + player.login + "'";
// 		client.query(sql, function(err, result) {
// 			var count = result.rows[0].count;
// 			if (parseInt(count) === 0) {
// 				player.score = 0;
// 				sql = "insert into players(login, json, score, creation_date) values('" + player.login + "', '" + JSON.stringify(player) + "', 0, now())";
// 				client.query(sql, function(err, result) {
// 					client.end();
// 					callback();
// 				});
// 			} else {
// 				client.end();
// 				callback();
// 			}
// 		});
		
// 	});
// };


module.exports = PostgreSql;