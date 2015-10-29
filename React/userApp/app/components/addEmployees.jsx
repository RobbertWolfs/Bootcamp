var React = require('react');
var UserForm = require('./userForm.jsx');
var PersonsStore = require('../stores/personsStore.js');
var PersonsActions = require('../actions/personsActions.js');


var AddNewEmployee = React.createClass({
    getInitialState: function () {
        return {
            users: PersonsStore.getUsers(),
            user: this._generateEmptyUser()
        }
    },
    render: function () {
        return (
            <div>

                <UserForm user={this.state.user}
                          errors={this.state.errors}
                          onChange={this._handleChange}
                          onSave={this._addUser} />

            </div>
        )
    },

    _addUser: function(user) {
        PersonsActions.addPerson(user);
        this.props.history.pushState(null, '/employees');

    },

    _generateEmptyUser: function () {
        return {
            id: null,
            name: '',
            email: '',
            age: 0,
            birthday: '',
            married: false
        }
    }

});

module.exports = AddNewEmployee;