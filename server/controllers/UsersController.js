var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption.js');

module.exports = {
    createUser: function(req, res, next){
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(err, user){
            if(err){
                console.log('Failed to register new user: ' + err);
                return;
            }
            req.logIn(user, function(err){
                if(err){
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send(user);
            });
        });
    },
    updateUser: function(req, res, next){
        if(req.body._id == req.user._id || req.user.roles.indexOf('admin') > -1){
            var updatedUserData = req.body;
            if(updatedUserData.password && updatedUserData.password.length > 0){
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }
            User.update({_id: req.body._id}, updatedUserData, function(err){
                res.end();
            });
        }
        else{
            res.send({reason: 'You do not have permissions!'});
        }
    },
    getAllUsers: function(req, res){
        User.find({}).select("username firstName midName lastName")
        .exec(function(err, collection){
            if(err){
                console.log('Users could not be found: ' +  err);
                return;
            }
            res.send(collection);
        });
    },
    getUser: function(req, res){

        User.findOne({username: req.params.id}, function (err, user) {
                if(err || !user){
                    console.log('User could not be found: ' +  err);
                    return;
                }
                else{
                    res.send(user);
                }
        });

    },
    getProfPhoto: function(req, res){
        User.findOne({_id: req.params.id})
        .select("profPhoto")
        .exec(function(err, user){
            if(err){
                console.log("couldnt get photo: " + err.toString())
                res.end();
            }
            res.contentType(user.profPhoto.contentType);
            res.send(user.profPhoto.data);
        });
    }
}