var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var userMapper = require('../mappers/users');
var _ = require('underscore');
var mongoose = require('mongoose');
var inspector = require('schema-inspector');
var userController = require('../controllers/userController');

function validate(req, res, next) {
    var schema = {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', pattern: 'email' },
            age: { type: 'number', optional : true }
        }
    };

    var result = inspector.validate(schema, req.body); // Candidate is not valid
    if (!result.valid) {
        return next(error(400, result));
        //return res.send(result.format());
    }
    if (!((req.body.firstName && req.body.lastName) && req.body.email)) {
        return next(error(400));
    }
    next();
}

//routes
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/', validate, userController.create);
router.put('/:id', validate, userController.update);
router.delete('/:id', userController.delete);


function error(status, details) {
    var error = new Error('An error occured');
    error.status = status;
    error.details = details;
    return error;
}


module.exports = router;