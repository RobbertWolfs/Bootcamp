//var ObjectAssign = require('react/lib/Object.assign');
//var EventEmitter = require('events').EventEmitter;
//var appDispatcher = require('../appDispatcher.js');

import ObjectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher.js';

var _ = require('underscore');

var users;

var generateUserId = function (users) {
    if (users.length > 0) {
        var lastUser = users[users.length - 1];
        return lastUser.id + 1;
    }
    return 1;
};

var addPerson = function (person) {
    person.id = generateUserId(users);
    users.push(person);
};

var updateUser = function (person) {
    users = _.without(users, _.findWhere(users, {id: person.id}));
    users.push(person);
};


var removePerson = function (person) {
    users = _.without(users, _.findWhere(users, {id: person}));
};




var personsStore = ObjectAssign({}, EventEmitter.prototype, {
    removeChangeListener: function (cb) {
        this.removeListener('CHANGE_EVENT', cb);
    },

    addChangeListener: function (cb) {
        this.on('CHANGE_EVENT', cb);
    },

    getUsers: function () {
        return users;
    },

    getUser: function (id) {
        return _.findWhere(users, {id: parseFloat(id)});
    }

});


appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case 'ADD_PERSON' :
            addPerson(action.data);
            personsStore.emit('CHANGE_EVENT');
            break;
        case 'REMOVE_PERSON' :
            removePerson(action.data);
            personsStore.emit('CHANGE_EVENT');
            break;
        case 'UPDATE_PERSON' :
            updateUser(action.data);
            personsStore.emit('CHANGE_EVENT');
            break;
        case 'LOADED_USERS' :
            users = action.data;
            personsStore.emit('CHANGE_EVENT');
            break;
        default :
            return true;
    }
});


module.exports = personsStore;
