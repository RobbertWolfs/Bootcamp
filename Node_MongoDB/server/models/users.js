var express = require('express');
var mongoose = require('mongoose');

// Models
var user = mongoose.model('User', {
    firstName:String,
    lastName:String,
    age: Number,
    email: String,
    homeAddress: {
        addressLine: String,
        city: String,
        zip: String
    }
});


module.exports = user;