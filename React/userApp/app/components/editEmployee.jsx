var React = require('react');
var PersonsStore = require('../stores/personsStore');
var PersonsActions = require('../actions/personsActions');
var UserForm = require('./userForm.jsx');


var EditEmployee = React.createClass({

    getInitialState: function () {


        return {
            user: PersonsStore.getUser(this.props.params.id)
        }

    },

    render: function () {

        return (
            <div>
                <UserForm user={this.state.user}
                          errors={this.state.errors}
                          onChange={this._handleChange}
                          onSave={this._updateUser}/>
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

    _updateUser: function(user) {
        PersonsActions.updateUser(user);
        this.props.history.pushState(null, '/employees');

    }
});

module.exports = EditEmployee;


