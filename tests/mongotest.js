var Mongotest = require('mongotest');

exports.testBasic = function(test) {
	
	var mongo = new Mongotest();
	mongo.isStarted(mongo.ensureDeleted("aaa", mongo.ensureDeleted("bbb", function() {
		
		console.log('mongo has been started');

		mongo.db.collection('aaa').find({}).toArray(function(err, vals) {
			
			test.equal(vals.length, 0);
			var id = Math.random();
			mongo.db.collection('aaa').save({_id: id}, function() {
				test.done();
			});
		});

		
	})), function() {
		console.log('mongo is not started');
		test.done();
	});
};