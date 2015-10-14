var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var userMapper = require('../mappers/users');
var _ = require('underscore');
var mongoose = require('mongoose');


//routes
router.get('/', function (req, res, next) {


    console.log('get', req.user.name); // log authorization name


    var pageSize = req.query.pageSize || 100 ;
    var page = req.query.page || 0;

    UserModel.find({}).limit(pageSize).skip(pageSize * page).sort(req.query.sort).exec(function (err, users) {
        var filteredUsers = [];
        filteredUsers = _.map(users, function (user) {
            return userMapper.map(user);
        });
        return res.status(200).send(filteredUsers);
    });
});

router.get('/:id', function (req, res, next) {
    UserModel.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (user) {
            return res.status(200).send(userMapper.map(user));
        }

        return showError(res, 404);
    });
});

router.post('/', function (req, res, next) {

    if (!((req.body.firstName && req.body.lastName) && req.body.email)) {
        return showError(res, 400);
    }

    var user = new UserModel({ // dit geeft al een nieuwe _id per product
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        homeAddress: {
            addressLine: req.body.addressLine,
            city: req.body.city,
            zip: req.body.zip
        }
    });

    user.save(function () {
        res.set('location', `localhost:3000/api/users/${user.id}`);
        return res.status(201).send(userMapper.map(user));
    });
});


router.put('/:id', function (req, res, next) {

    if (!((req.body.firstName && req.body.lastName) && req.body.email)) {
        return showError(res, 400);
    }

    UserModel.findOne({
        _id: req.params.id
    }, function (err, user) {

        if (!user) {
            return showError(res, 404);
        }

        user.id = req.params.id;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.email = req.body.email;
        user.homeAddress.addressLine = req.body.addressLine;
        user.homeAddress.city = req.body.city;
        user.homeAddress.zip = req.body.zip;

        user.save(function () {
            return res.status(201).send(userMapper.map(user));
        });

    });
});


router.delete('/:id', function (req, res, next) {
    UserModel.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (!user) {
            return res.status(204).send('No Content found');
        }

        user.remove(function (err) {
            if (!err) {
                return res.status(200).send(userMapper.map(user));
            }
            return showError(res, 500);
        });

    });
});


function showError(res, error) {
    if (error == 400) {
        return res.status(error).send({
            "code": "Bad Request",
            "message": "One or more input validation is invalid",
            "errors": [
                {"key": "name", "message": "may not be empty"},
                {"key": "email", "message": "not a well-formatted email address"}
            ]
        });
    }

    if (error == 404) {
        return res.status(error).send({
            "code": "Not Found",
            "message": "The requested resource was not found"
        });
    }

    if (error == 500) {
        return res.status(error).send({
            "code": "InternalServerError",
            "message": "Oops! something went wrong!",
            "details": "<detailed error message, only in development>"
        });
    }
}


module.exports = router;