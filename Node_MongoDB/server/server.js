var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var userAPI = require('./routes/users');
var mongoose = require('mongoose');
var cfg = require('./config');
var faker = require('faker');
var UserModel = require('./models/users');
var authorization = require('./middlewares/authorization');
var globalErrorHandler = require('./middlewares/globalErrorHandler');




//express setup
app.use(morgan('dev'));

// authorization
//app.use(authorization('open sesame'));

//express setup
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/users', userAPI);

// setup db
mongoose.connect('mongodb://' + cfg.mongo.uri + '/' + cfg.mongo.db );

var port = cfg.port;
var server = app.listen(port, function () {
    console.log('server is listening on port : ' + port);
});



UserModel.findOne({}, function (err, user) {
    if (!user) {
        var users = [/* a humongous amount of potato objects */];
        for(var i = 0; i < 1000; i++) {
            users.push({
                firstName : faker.name.firstName(),
                lastName : faker.name.lastName(),
                email : faker.internet.email(),
                age : faker.random.number(100),
                homeAddress : {
                    addressLine : faker.address.streetAddress(),
                    city : faker.address.city(),
                    zip : faker.address.zipCode()
                }
            })
        }

        UserModel.collection.insert(users, onInsert);

    }
});


function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
        return console.log(err);
    } else {
        return console.info('%d potatoes were successfully stored.', docs.length);
    }
}


// Error handling
app.use(globalErrorHandler());