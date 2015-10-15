//var mongoose = require('mongoose');
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    homeAddress: {
        addressLine: String,
        city: String,
        zip: Number
    },
    apiKeys : [
        {
            name : String,
            encryptedKey : String
        }
    ]
});

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
