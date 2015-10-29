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

    _updateUser: function(user) {
        PersonsActions.updateUser(user);
        this.props.history.pushState(null, '/employees');

    }
});

module.exports = EditEmployee;


