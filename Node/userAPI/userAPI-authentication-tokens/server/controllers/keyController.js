var _ = require('underscore');
var userRepository = require('../data/userRepository');
var HttpError = require('../httpError');
var randomstring = require("randomstring");
var sha256 = require("sha256");

module.exports = {

    generate: function (req, res, next) {

        var key;
        userRepository.findOne({_id: req.params.id})
            .then(function (user) {
                if (!user) next(new HttpError(204));


                key = randomstring.generate();
                var encKey = sha256(key);

                //console.log(encKey);

                user.apiKeys.push({
                    "name": req.body.name,
                    "encryptedKey": encKey
                });

                return userRepository.save(user);
            })
            .then(function () {
                res.status(200).send({
                    key: key,
                    name: req.body.name
                });
            })
            .catch(function (err) {
                next(err);
            });

    },

    remove: function (req, res, next) {
        var key;
        userRepository.findOne({_id: req.params.id})
            .then(function (user) {
                if (!user) next(new HttpError(404));

                key = _.findWhere(user.apiKeys, {name: req.params.name});
                if (!key) next(new HttpError(204));

                user.apiKeys = _.without(
                    user.apiKeys,
                    key
                );

                return userRepository.save(user);
            })
            .then(function () {
                res.status(200).send({
                    name: key.name
                });
            })
            .catch(function (err) {
                next(err);
            });
    },

    findAll: function (req, res, next) {

        userRepository.findOne({_id: req.params.id})
            .then(function (user) {

                var result = _.map(user.apiKeys, function (key) {
                    return {name: key.name}
                });

                res.status(200).send(result);
            })
            .catch(function (err) {
                next(err);
            });
    }
};