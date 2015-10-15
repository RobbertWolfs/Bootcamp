var sha256 = require("sha256");
var userRepository = require('../data/userRepository');
var jwt = require('jwt-simple');

var secret = 'FBf96vtlWSrMSLChIkkF';  // beter in een NODE ENV steken

module.exports = {

    authenticate: function (req, res, next) {

        var key = req.body.key;
        var encKey = sha256(key);

        console.log(encKey);

        userRepository.findOne({ 'apiKeys.encryptedKey' : encKey })
            .then(function (user) {

                var payload = {
                    "sub": user._id,
                    "name": `${user.firstName} ${user.lastName}`
                };

                var token = jwt.encode(payload, secret);

                res.status(200).send({
                    accessToken : token,
                    tokenType : 'bearer'
                });

            })
            .catch(function (err) {
                next(err);
            });

    }

};
