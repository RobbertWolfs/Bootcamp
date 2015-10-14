var _ = require('underscore');
var UserModel = require('../models/users');
var userMapper = require('../mappers/users');
var Q = require('q');


var repository = {

    findAll: function (query, pageSize, page, sort) {
        var deferred = Q.defer();

        UserModel.find(query).limit(pageSize).skip(pageSize * page).sort(sort).exec(function (err, users) {

            if (err)
                return deferred.reject(err);


            return deferred.resolve(users);
        });

        return deferred.promise;

    },

    findOne: function (query) {
        var deferred = Q.defer();
        UserModel.findOne(query, function (err, user) {
            if (err)
                return deferred.resolve(err);
            deferred.resolve(user);
        });
        return deferred.promise;
    },
    save: function (model) {
        var deferred = Q.defer();
        model.save(function (err) {
            if (err)
                return deferred.reject(err);
            deferred.resolve(model);
        });
        return deferred.promise;
    }
};

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

        repository.findOne(
            {
                _id: req.params.id
            })
            .then(function (user) {
                if (!user) {
                    return next(error(404));
                }
                return res.status(200).send(userMapper.map(user));

            })
            .catch(function (err) {
                next(err);
            });


        //UserModel.findOne({
        //    _id: req.params.id
        //}, function (err, user) {
        //
        //
        //    //error afhandeling
        //    //if (err) { return next(err); }
        //    if (err || !user) {
        //        return next(error(404));
        //    }
        //
        //    return res.status(200).send(userMapper.map(user));
        //});
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

        user.save(function () {
            //res.set('location', `localhost:3000/api/users/${user.id}`);
            return res.status(201).send(userMapper.map(user));
        });
    },

    update: function (req, res, next) {
        repository.findOne({
            _id: req.params.id
        })
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
            .then(function (model) {
                // called after repository.save() is finished

                console.log('then');
                return res.status(201).send(userMapper.map(model));
            })
            .catch(function (err) {
                return next(err);
            });


        //UserModel.findOne({
        //    _id: req.params.id
        //}, function (err, user) {
        //
        //    //error afhandeling
        //    if (err || !user) {
        //        return next(error(404));
        //    }
        //
        //    user.id = req.params.id;
        //    user.firstName = req.body.firstName;
        //    user.lastName = req.body.lastName;
        //    user.age = req.body.age;
        //    user.email = req.body.email;
        //    user.homeAddress.addressLine = req.body.addressLine;
        //    user.homeAddress.city = req.body.city;
        //    user.homeAddress.zip = req.body.zip;
        //
        //    user.save(function (err) {
        //
        //        if(err) return next(err);
        //
        //        return res.status(201).send(userMapper.map(user));
        //    });

        //});
    },

    delete: function (req, res, next) {
        UserModel.findOne({
            _id: req.params.id
        }, function (err, user) {

            if (err || !user) {
                return next(error(204));
            }


            user.remove(function (err) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send(userMapper.map(user));
            });

        });
    }

};

