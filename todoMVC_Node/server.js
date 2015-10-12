var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');

var app = express();

var todos = [{
    id: 1,
    title: 'node app 1',
    completed: false
}, {
    id: 2,
    title: 'node app 2',
    completed: false
}, {
    id: 3,
    title: 'node app 3',
    completed: false
}, {
    id: 4,
    title: 'node app 4',
    completed: false
}];


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/api/todos', function (req, res, next) {
    res.send(todos);
});

app.get('/api/todos/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var result = _.find(todos, function (num) {
        return num.id === id;
    });
    res.send(result);
});

app.post('/api/todos', function (req, res, next) {
    var body = req.body;
    var lastIndex = _.max(todos, item => item.id );
    var id = lastIndex.id + 1;

    body.id = id;
    todos.push(body);
    res.send(body);
});

app.put('/api/todos/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var body = req.body;
    var result = _.find(todos, num => num.id === id );

    result.id = id;
    result.title = body.title;
    result.completed = body.completed;
    res.send(result);
});

app.delete('/api/todos/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var index = _.findIndex(todos, num => num.id === id);
    var result = todos.splice(index, 1);
    res.send(result);

});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Express started listening on port:' + server.address().port);
});