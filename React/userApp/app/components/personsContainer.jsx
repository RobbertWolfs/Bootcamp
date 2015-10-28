var React = require('react');
var PersonsTable = require('./employeeList.jsx');
var AddNewPerson = require('./addNewEmployee.jsx');


var PersonsContainer = React.createClass({
    getInitialState: function () {
        return {
            users: [
                {
                    id: 1,
                    name: 'Robbert Wolfs',
                    email: "frederik.bouillon@euri.com",
                    age: 22,
                    birthday: "16/04/1987",
                    married: false
                },
                {
                    id: 2,
                    name: 'Peter Cosemans',
                    email: "peter.cosemans@euri.com",
                    age: 51,
                    birthday: "06/10/1964",
                    married: false
                }
            ],
            newUser: this._generateEmptyUser(),
            errors: {}
        }
    },

    render: function () {
        return (
            <div>
                <h1>Persons</h1>
                <PersonsTable users={this.state.users}/>
                <AddNewPerson newUser={this.state.newUser} onChange={this._handleChange} onSave={this._addNewPerson}
                              errors={this.state.errors}/>
            </div>
        )
    },

    _isInputValid: function () {
        var isValid = true;
        var errors = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (this.state.newUser.name < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 chars.';
        }


        if (!emailRegex.test(this.state.newUser.email)) {
            errors.email = 'Invalid email';
            isValid = false;
        }

        if (this.state.newUser.age < 18) {
            errors.age = 'Age cannot be smaller than 18';
            isValid = false;
        }

        if (this.state.newUser.birthday === '') {
            errors.birthday = 'You left the field blank';
            isValid = false;
        }

        this.setState({
            errors: errors
        });

        return isValid;
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
    },

    _handleChange: function (e) {

        var user = this.state.newUser;

        user[e.target.name] = e.target.value;

        if (e.target.type == 'checkbox') {
            user[e.target.name] = e.target.checked;
        }

        if (e.target.type == 'number' && e.target.value) {
            user[e.target.name] = parseInt(e.target.value);
        }


        this.setState({newUser: user});

    },

    _generateUserId: function (users) {
        if (users.length > 0) {
            var lastUser = users[users.length - 1];
            return lastUser.id + 1;
        }
        return 1;
    },

    _addNewPerson: function (e) {
        e.preventDefault();

        if (this._isInputValid(this.state.newUser)) {
            var user = this.state.newUser;
            user.id = this._generateUserId(this.state.users);
            this.setState({newUser: user});


            this.setState({
                users: this.state.users.concat(this.state.newUser),
                newUser: this._generateEmptyUser()
            });
        }
    },


    componentWillMount: function() {
        console.log('componentWillMount');
    },

    componentDidMount: function() { // is een handige voor data op te halen
        console.log('componentDidMount');
    },

    shouldComponentUpdate: function() {
        console.log('shouldComponentUpdate');
        return true; // hier ga je niet gewoon true of false doen maar eerder een test zoals nextProps.id !== this.props.id
    },

    componentWillUpdate: function() {
        console.log('componentWillUpdate');
    },

    componentDidUpdate: function() {
        console.log('componentDidUpdate');
    },

    componentWillUnmount: function() { // zou bv triggeren wanneer je naar een andere route zou gaan, zo kan je zaken destroyeen en cleanen
        console.log('componentWillUnmount');
    }


});

module.exports = PersonsContainer;