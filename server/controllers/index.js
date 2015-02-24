var usersController = require('../controllers/UsersController.js'),
	opinionsController = require("../controllers/OpinionsController.js");

module.exports = {
    users: usersController,
    opinions: opinionsController
}