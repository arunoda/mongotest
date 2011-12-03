var mongo = require('mongoskin');

module.exports = MongoTest;

function MongoTest(host, port) {
	
	host = (host)? host: "localhost";
	port = (port)? port: 27017;
	var url = host + ":" + port + "/mongotest";

	var self = this;
	self.db = mongo.db(url);

	this.isStarted = function isStarted(fnYes, fnNo) {

		self.db.collection('aa').findOne(function(err) {
			
			if(!err) {
				fnYes();
			} else {
				fnNo();
			}
		});
	};

	this.ensureDeleted = function ensureDeleted(collname, fn) {
		
		return function() {
			self.db.collection(collname).remove(function(err) {

				if(!err) {
					setTimeout(fn, 100);
				} else {
					throw new Error(JSON.stringify(err));
				}
			});
		}
	};

	this.delay = function (time, fns, callback) {

		aa();
		function aa() {
			var fn = fns.shift();
			if(!fn) {
				if(callback) callback();
			} else {
				setTimeout(function() {
					fn();
					aa();
				}, time);		
			}
		}
	};
}