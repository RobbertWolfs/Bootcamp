var appDispatcher = require('../appDispatcher.js');
var userAPI = require('../api/userApi.js');

var personsActions = {
    addPerson: function (person) {

        var self = this;

        userAPI.addUser(person)
            .then(function (person) {
                appDispatcher.handleAction({
                    actionType: 'ADD_PERSON',
                    data: person
                });

                self.getUsers();
            });
    },

    removePerson: function (id) {
        var self = this;
        userAPI.removeUser(id)
            .then(function (person) {
                appDispatcher.handleAction({
                    actionType: 'REMOVE_PERSON',
                    data: person
                });

                self.getUsers();
            });
    },

    updateUser: function (person) {
        var self = this;
        userAPI.updateUser(person)
            .then(function (person) {
                appDispatcher.handleAction({
                    actionType: 'UPDATE_USER',
                    data: person
                })

                self.getUsers();
            });


    },

    getUsers() {
        userAPI.getUsers()
            .then(function (users) {
                appDispatcher.handleAction({
                    actionType: 'LOADED_USERS',
                    data: users
                })
            })
    }

};

module.exports = personsActions;