// authorization

var authorization = function(password) {

    return function(req, res, next) {
        if (req.headers.authorization != password) {
            return res.status(401).send('Not authorised')
        }
        next();
    }

};

module.exports = authorization;