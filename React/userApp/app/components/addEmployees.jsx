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

    _handleChange: function (e) {

        var user = this.state.user;

        user[e.target.name] = e.target.value;

        if (e.target.type == 'checkbox') {
            user[e.target.name] = e.target.checked;
        }

        if (e.target.type == 'number' && e.target.value) {
            user[e.target.name] = parseInt(e.target.value);
        }


        this.setState({user: user});

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