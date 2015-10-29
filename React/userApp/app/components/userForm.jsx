var React = require('react');
var Input = require('./formInput.jsx');
var InputNumber = require('./formInputNumber.jsx');
var InputCheckbox = require('./formInputCheckbox.jsx');

var userForm = React.createClass({
    getInitialState: function () {
        return {
            errors: {},
            user: this.props.user
        }
    },
    propTypes: {
        onSave: React.PropTypes.func.isRequired,
        user: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number.isRequired,
            birthday: React.PropTypes.string.isRequired,
            married: React.PropTypes.bool.isRequired
        })
    },
    render: function () {
        return (
            <div>
                <div>
                    <form>
                        <Input type='text' name='name'  placeholder='Name' errors={this.state.errors.name} value={this.state.user.name} onChange={this._onChange}  />
                        <Input type='email' name='email'  placeholder='Email'  errors={this.state.errors.email} value={this.state.user.email} onChange={this._onChange}  />
                        <Input type='date' name='birthday'  placeholder='dd/mm/yyy'  errors={this.state.errors.birthday} value={this.state.user.birthday} onChange={this._onChange}  />
                        <Input type='number' name='age'  placeholder='Age'  errors={this.state.errors.age} value={this.state.user.age} onChange={this._onChange}  />
                        <InputCheckbox type='checkbox' name='married'   checked={this.state.user.married} onChange={this._onChange}  />

                        <div className="form-group ">
                            <button  className="btn btn-default" onClick={this._addNewPerson}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    },

    _onChange: function (field, value) {

        var user = this.state.user;

        user[field] = value;

        this.setState({user: user});

    },
    
    _isInputValid: function () {
        var isValid = true;
        var errors = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (this.state.user.name.length < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 chars.';
        }

        if (!emailRegex.test(this.state.user.email)) {
            errors.email = 'Invalid email';
            isValid = false;
        }

        if (this.state.user.age < 18) {
            errors.age = 'Age cannot be smaller than 18';
            isValid = false;
        }

        if (this.state.user.birthday === '') {
            errors.birthday = 'You left the field blank';
            isValid = false;
        }

        this.setState({
            errors: errors
        });

        return isValid;
    },

    _addNewPerson: function (e) {
        e.preventDefault();


        if (this._isInputValid(this.state.user)) {
            var user = this.state.user;
            this.setState({user: user});

            this.props.onSave(user);
        }
    }
});


module.exports = userForm;