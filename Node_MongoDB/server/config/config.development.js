var cfg = module.exports = {};
cfg.port = 3000;
cfg.hostname = 'localhost';
cfg.env = 'development';

cfg.mongo = {};
cfg.mongo.uri = process.env.MONGO_URI || 'localhost';
cfg.mongo.db = 'oefening_node_mongodb';