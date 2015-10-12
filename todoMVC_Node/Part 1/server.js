var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var todosApi = require('./todos');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//routes
app.use('/api/todos', todosApi);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Express started listening on port:' + server.address().port);
});