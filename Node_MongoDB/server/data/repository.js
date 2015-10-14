var UserModel = require('../models/users');
var Q = require('q');


module.exports = {

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
        model.save(function (err, model) {
            if (err)
                return deferred.reject(err);
            deferred.resolve(model);
        });
        return deferred.promise;
    },

    delete: function (user) {
        var deferred = Q.defer();

        user.remove(function (err) {
            if (err)
                return deferred.reject(err);

            deferred.resolve(user);
        });

        return deferred.promise;
    }
};

