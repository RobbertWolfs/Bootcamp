var HttpError = require('../HttpError');
var jwt = require('jwt-simple');


module.exports = {


    authorization: function (secret) {
        return function authorization(req, res, next) {
            if (req.headers.accesstoken) {

                try {
                    var decoded = jwt.decode(req.headers.accesstoken, secret);
                } catch(e) {
                    next(new HttpError(401));
                }

                req.user = decoded;
            }
            next();
        }
    },

    authenticate: function() {
        return function (req, res, next) {

            if (!req.user) {
                return next(new HttpError(401));
            }

            next();

        }
    }

};