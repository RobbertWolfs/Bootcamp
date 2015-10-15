var _ = require('underscore');

module.exports = {
    map: function map(user){
        var userResource = {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip,
            apiKeys : _.map(user.apiKeys, function(key) {
                return {
                    name : key.name
                }
            })
        };
        return userResource;
    }
};
