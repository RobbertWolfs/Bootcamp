var config = require('./config.development');
config.env = 'production';
config.port = 8080;
config.hostname = 'test.example';
//config.mongo.db = 'example_test';
module.exports = config;