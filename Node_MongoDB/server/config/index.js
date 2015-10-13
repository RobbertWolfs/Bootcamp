var env = process.env.NODE || 'development';
var cfg = require('./config.' + env);
module.exports = cfg;
