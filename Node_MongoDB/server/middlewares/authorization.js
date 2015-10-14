// authorization

var authorization = function(password) {

    return function(req, res, next) {


        var auth = (req.headers.authorization).split('Basic ')[1];
        buf = new Buffer(auth, 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string



        req.user = { // set authorization name so its available over the whole project
            name : plain_auth.split(':')[0]
        };

        var passwordAuth = plain_auth.split(':')[1];




        if (passwordAuth != password) {
            return res.status(401).send('Not authorised')
        }

        return next();
    }

};

module.exports = authorization;