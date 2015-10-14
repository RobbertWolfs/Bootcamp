var _ = require('underscore');
var UserModel = require('../models/users');
var userMapper = require('../mappers/users');
var Q = require('q');
var repository = require('../data/repository');


module.exports = {

    findAll: function (req, res, next) {
        var pageSize = req.query.pageSize || 100;
        var page = req.query.page || 0;
        var sort = req.query.sort || '+name';

        repository.findAll({}, pageSize, page, sort)
            .then(function (users) {
                filteredUsers = _.map(users, function (user) {
                    return userMapper.map(user);
                });

                return res.status(200).send(filteredUsers);
            })
            .catch(function () {
            });
    },

    findOne: function (req, res, next) {
        var query = {_id: req.params.id};
        repository.findOne(query)
            .then(function (user) {
                if (!user) {
                    return next(error(404));
                }
                return res.status(200).send(userMapper.map(user));

            })
            .catch(function (err) {
                next(err);
            });
    },

    create: function (req, res, next) {
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

        repository.save(user)
            .then(function (user) {
                return res.status(201).send(userMapper.map(user));
            })
            .catch(function (err) {
                next(err);
            });
    },

    update: function (req, res, next) {
        repository.findOne({_id: req.params.id})
            .then(function (user) {
                if (!user)
                    return next(error(404));

                user.id = req.params.id;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.age = req.body.age;
                user.email = req.body.email;
                user.homeAddress.addressLine = req.body.addressLine;
                user.homeAddress.city = req.body.city;
                user.homeAddress.zip = req.body.zip;

                return repository.save(user);
            })
            .then(function (user) {
                // called after repository.save() is finished
                return res.status(201).send(userMapper.map(user));
            })
            .catch(function (err) {
                return next(err);
            });
    },

    delete: function (req, res, next) {
        repository.findOne({
            _id: req.params.id
        })
            .then(function (user) {
                if (!user)
                    return next(error(404));

                return repository.delete(user);

            })
            .then(function (user) {
                return res.status(200).send(userMapper.map(user));
            })
            .catch(function (err) {
                return next(err);
            });
    }

};


function error(status, details) {
    var error = new Error('An error occured');
    error.status = status;
    error.details = details;
    return error;
}
