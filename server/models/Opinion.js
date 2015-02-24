var mongoose = require('mongoose'),
	User = mongoose.model("User");

var opSchema = mongoose.Schema({
	owner: mongoose.Schema.ObjectId,
	text: String,
	name: String
});

var Opinion = mongoose.model("Opinion", opSchema);


module.exports.seedInitialOpinions = function() {
	var users;
	//Opinion.remove({}).exec(function(){console.log("opinions removed");})
	User.find({}).select("_id").exec(function(err, us){
		if(err){
			console.log("failed to find users: " + err);
			return;
		}
		users = us;
		Opinion.find({}).exec(function(err, ops){
			if(err){
				console.log("Smth went wrong with opinions: " + err);
				return;
			}
			if(ops.length == 0){
				Opinion.create({
					owner: users[0]._id,
					text: "Много як сайт, браво!",
					name: 'A. Йорданов'
				});
				Opinion.create({
					owner: users[1]._id,
					text: "Лично аз отдавна чаках да се появи такъв сайт в българското интернет пространство. Радвам се, че вече го има. Регистрирах се с вълнение, защото очаквам да открия всички свои роднини и да оставя на дъщеря си знание за нейните родови корени.",
					name: "Ст. Стойчева"
				});
				Opinion.create({
					owner: users[2]._id,
					text: "Впечатлен съм от информацията за старите имена на селищата. С всяко следващо поколение те се изгубват и факта,че Вие я съхранявате и разпространявате заслужава адмирации",
					name: "В. Петров"
				});
				Opinion.create({
					owner: users[3]._id,
					text: "Постарали сте се в сайта да намерите място за много справочна информация.  Браво !",
					name: "Хр. Недялков"
				});
				console.log("Opinions added...");
			}
		})
	});
};