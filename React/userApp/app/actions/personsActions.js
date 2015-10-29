var appDispatcher = require('../appDispatcher.js');

var personsActions = {
    addPerson : function (person) {
        appDispatcher.handleAction({
            actionType : 'ADD_PERSON',
            data : person
        })
    },

    removePerson : function(person) {
        appDispatcher.handleAction({
            actionType : 'REMOVE_PERSON',
            data : person
        })
    },

    updateUser : function(person) {
        appDispatcher.handleAction({
            actionType : 'UPDATE_USER',
            data : person
        })
    }
};

module.exports = personsActions;