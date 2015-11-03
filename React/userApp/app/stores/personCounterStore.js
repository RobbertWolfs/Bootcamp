//var ObjectAssign = require('react/lib/Object.assign');
//var EventEmitter = require('events').EventEmitter;
//var appDispatcher = require('../appDispatcher');

import ObjectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher.js';

var usersLength = 0;


var inCreaseCounter = function () {
    usersLength += 1;
    return usersLength;
};

var deCreaseCounter = function () {
    usersLength -= 1;
    return usersLength;
};

var personCounterStore = ObjectAssign({}, EventEmitter.prototype, {

    getUserCount: function () {
        return usersLength;
    },

    addChangeListener: function (cb) {
        this.on('UPDATE_COUNTER', cb);
    },

    removeChangeListener: function (cb) {
        this.removeListener('UPDATE_COUNTER', cb);
    }

});

appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case 'REMOVE_PERSON' :
            deCreaseCounter();
            personCounterStore.emit('UPDATE_COUNTER');
            break;
        case 'ADD_PERSON' :
            inCreaseCounter();
            personCounterStore.emit('UPDATE_COUNTER');
            break;
        case 'LOADED_USERS' :
            if (action.data) {
                usersLength = action.data.length;
                personCounterStore.emit('UPDATE_COUNTER');
            }
            break;
        default :
            return true;
    }
});

module.exports = personCounterStore;