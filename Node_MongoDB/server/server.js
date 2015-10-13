var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var userAPI = require('./routes/users');
var mongoose = require('mongoose');
var cfg = require('./config');

//express setup
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/users', userAPI);

// setup db
mongoose.connect('mongodb://' + cfg.mongo.uri + '/' + cfg.mongo.db );

var port = cfg.port;
var server = app.listen(port, function () {
    console.log('server is listening on port : ' + port);
});
