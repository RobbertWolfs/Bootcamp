var React = require('react');
var PersonsTable = require('./employeeList.jsx');

var PersonsStore = require('../stores/personsStore.js');
var PersonsActions = require('../actions/personsActions.js');
var AddEmployeeButton = require('./addEmployeeButton.jsx');

var PersonsContainer = React.createClass({
    getInitialState: function () {
        return {
            users : PersonsStore.getUsers()
        }
    },

    componentDidMount : function() {
        PersonsStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount : function() {
        PersonsStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange : function () {
      this.setState({
          users : PersonsStore.getUsers()
      });
    },

    render: function () {
        return (
            <div>
                <h1>Persons</h1>


                <AddEmployeeButton />
                <PersonsTable users={this.state.users} removeUser={this._removeUser}/>

            </div>
        )
    },


    _removeUser : function (id) {

        PersonsActions.removePerson(id);

    }

});

module.exports = PersonsContainer;