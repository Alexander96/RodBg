var http = require('http'),
    express = require('express'),
    env = process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env],
	app = express(),
	params = require('express-params'),
	server = http.createServer(app);

require('./server/config/express.js')(app, config);
require('./server/config/mongoose.js')(config);
require('./server/config/passport.js')();
require('./server/config/routes.js')(app);
params.extend(app);

server.listen(config.port);
console.log('Server running on port ' + config.port);