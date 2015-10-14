var HTTPStatus = require('http-status');
var _ = require('underscore');

var globalErrorHandler = function () {

    return function (err, req, res, next) {

        if (err.status) {

            var errorObject = {
                code: err.status,
                message: HTTPStatus[err.status],
            };

            if (err.status == 400) {
                console.log(err.details.error);


                var obj = [];

                _.map(err.details.error, function (detail) {
                    return obj.push({property: detail.property, message : detail.message});
                });

                errorObject.details = obj;
            }

            return res.status(err.status).send(errorObject);
        }

        res.status(500).send({
            code: 500,
            message: 'Internal server error',
            details: err
        });
    }
};

module.exports = globalErrorHandler;