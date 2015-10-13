var cfg = require('./config.development.js');
cfg.port = 8080;
cfg.hostname = 'test.example';
cfg.env = 'production';

cfg.mongo = {};
cfg.mongo.uri = process.env.MONGO_URI || 'localhost';
cfg.mongo.db = 'production_node_mongodb';