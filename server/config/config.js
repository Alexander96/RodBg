var path = require('path');
var rootPath = path.normalize(__dirname + '/../..')

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost/rodbg',
        port: process.env.PORT || 1234
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:dsadafsfuifnsakfdFBHUYDJNFSADmsODMSIO@ds055990.mongolab.com:55990/rodbg', //connect to mongolab
        port: process.env.PORT || 1234
    }
}