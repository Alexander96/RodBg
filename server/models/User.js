var mongoose = require('mongoose');
var encryption = require('../utilities/encryption.js'); 
var fs = require('fs');

var familySchema = mongoose.Schema({
    name: String
});
var Family = mongoose.model("Family", familySchema);
var userSchema = mongoose.Schema({
        username: {type: String, require: '{PATH} is required', unique: true},
        firstName: {type: String, require: '{PATH} is required'},
        midName: String,
        lastName: {type: String, require: '{PATH} is required'},
        profPhoto: {data: Buffer, contentType: String},
        friends: [{
            id:String
        }],
        Sex: String,
        family: { type: mongoose.Schema.ObjectId, ref: "Family"},
        salt: String,
        hashPass: String,
        roles: [String]
});
userSchema.method({
    authenticate: function(password){
        if(encryption.generateHashedPassword(this.salt, password) === this.hashPass){
            return true;
        }
        return false
    }
})
var User = mongoose.model('User', userSchema);
module.exports.seedInitialUsers = function(){
    var fm = {};
    Family.find({}).exec(function(err, collection){
        if(err){
            console.log("couldnt find family err");
            return;
        }
        if(collection.length==0){
            Family.create({
                name: "Goshkovi"
            })
            console.log("Family added...");
        }
        else{
            fm = collection[0];
        }
    });
    //User.remove({}).exec(function(e,d){console.log("removed-------------------");})
    User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cant find users ' + err)
                return;
            }
            if ( collection.length == 0 ) {
                var salt,
                    hasedPwd;
                salt = encryption.generateSalt();
                //for testing purposes
                var imgPath = "public/img/img1.jpg";
                var pic = fs.readFileSync(imgPath);

                hasedPwd = encryption.generateHashedPassword( salt, 'pesho' );

                User.create({ 
                    username: 'pesho',
                    firstName: 'Pesho',
                    midName: "Goshkov",
                    lastName: 'Peshev',
                    profPhoto: {data: pic, contentType: "image/jpg"},
                    friends: [],
                    family: fm,
                    Sex: 'male',
                    salt: salt,
                    hashPass: hasedPwd,
                    roles: ['admin'] });
                User.create({ 
                    username: 'stanka',
                    firstName: 'Станка',
                    midName: "Goshkov",
                    lastName: 'Стойчева',
                    profPhoto: {data: pic, contentType: "image/jpg"},
                    friends: [],
                    family: fm,
                    Sex: 'female',
                    salt: salt,
                    hashPass: hasedPwd,
                    roles: ['admin'] });
                User.create({ 
                    username: 'valio',
                    firstName: 'Валентин',
                    midName: "Goshkov",
                    lastName: 'Петров',
                    profPhoto: {data: pic, contentType: "image/jpg"},
                    friends: [],
                    family: fm,
                    Sex: 'male',
                    salt: salt,
                    hashPass: hasedPwd,
                    roles: ['admin'] });
                User.create({ 
                    username: 'hristo',
                    firstName: 'Христо',
                    midName: "Goshkov",
                    lastName: 'Недялков',
                    profPhoto: {data: pic, contentType: "image/jpg"},
                    friends: [],
                    family: fm,
                    Sex: 'male',
                    salt: salt,
                    hashPass: hasedPwd,
                    roles: ['admin'] });
                    console.log( 'Users added to database....' );
            }
            else{
                //console.log("id: ----- " + fm._id);
                //console.log(collection);
            }
    });
}