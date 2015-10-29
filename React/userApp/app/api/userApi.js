//var fetch = require('whatwg-fetch');
require('isomorphic-fetch');


var api = {
    getUsers() {
        return fetch('http://localhost:3000/api/persons')
            .then(function (response) {
                return response.json()
            })
            .then(function (body) {
                return body
            });
    },

    addUser(person) {
        return fetch('http://localhost:3000/api/persons',
            {
                method: "POST",
                body: JSON.stringify(person),
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (body) {
                return body
            });

    },

    removeUser(id) {
        return fetch('http://localhost:3000/api/persons/' + id, {
            method : "DELETE"
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (body) {
                return body
            });

    },

    updateUser(person) {
        return fetch('http://localhost:3000/api/persons/' + person.id, {
            method : "PUT",
            body: JSON.stringify(person),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (body) {
                return body
            });

    }
};


module.exports = api;


// SUPER AGENT VERSIE
//var request = require('superagent');
//
//var api = {
//    getUsers: function (cb) {
//        request
//            .get('http://localhost:3000/api/persons')
//            .end(function (err, result) {
//                cb(err, result);
//            });
//    }
//};
//
//module.exports = api;