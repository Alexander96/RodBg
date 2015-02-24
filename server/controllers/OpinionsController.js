var Opinion = require('mongoose').model('Opinion');

module.exports = {
	getAllOpinions: function(req, res, next){
		Opinion.find({}).exec(function(err, collection){
			if(err){
				console.log("Smth went wrong when searching opinions: " + err);
				res.end();
				return;
			}
			res.send(collection);
		})
	}
}