var express = require('express');
var router = express.Router();
var _ = require('underscore');

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

router.get('/', function (req, res, next) {
    res.send(todos);
});

router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var result = _.find(todos, function (num) {
        return num.id === id;
    });

    if (!result) {
        return res.status(404).send('resource not found: ' + req.params.id); // show 404 when id not found
    }
    return res.send(result);

});

router.post('/', function (req, res, next) {
    var body = req.body;
    var lastIndex = _.max(todos, item => item.id);
    var id = lastIndex.id + 1;

    body.id = id;
    todos.push(body)
    res.set('location', `http://localhost:8080/api/todos/${id}`);
    return res.status(201).send(body);

});

router.put('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var body = req.body;
    var result = _.find(todos, num => num.id === id);

    if (!result) {
        return res.status(404).send('resource not found: ' + req.params.id); // show 404 when id not found
    }

    result.id = id;
    result.title = body.title;
    result.completed = body.completed;
    return res.send(result);


});


router.delete('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var index = _.findIndex(todos, num => num.id === id);
    var result = todos.splice(index, 1);


    //if (!result) { // beter met without van underscore!
    //    return res.status(204).send('resource not found'); // show 201 when id not found
    //}

    return res.send(result);

});


module.exports = router;