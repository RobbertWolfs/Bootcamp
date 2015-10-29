var React = require('react');

var userForm = React.createClass({
    getInitialState: function () {
        return {
            errors: {}
        }
    },
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
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
                        <div className={this._addStyleOnError(this.state.errors.name)}>
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" className="form-control" value={this.props.user.name} name="name"
                                   onChange={this.props.onChange} placeholder="Name"/>

                            <div style={{'color' : 'red'}}>{this.state.errors.name}</div>
                        </div>
                        <div className={this._addStyleOnError(this.state.errors.email)}>
                            <label htmlFor="exampleInputEmail">Email address</label>
                            <input type="email" className="form-control" name="email" value={this.props.user.email}
                                   onChange={this.props.onChange} placeholder="Email"/>

                            <div style={{'color' : 'red'}}>{this.state.errors.email}</div>
                        </div>
                        <div className={this._addStyleOnError(this.state.errors.age)}>
                            <label htmlFor="exampleInputAge">Age</label>
                            <input type="number" className="form-control" name="age" value={this.props.user.age}
                                   onChange={this.props.onChange} placeholder="Age"/>

                            <div style={{'color' : 'red'}}>{this.state.errors.age}</div>
                        </div>
                        <div className={this._addStyleOnError(this.state.errors.birthday)}>
                            <label htmlFor="exampleInputBirthday">Birthday</label>
                            <input type="date" className='form-control' name="birthday" value={this.props.user.birthday}
                                   onChange={this.props.onChange} placeholder="dd/mm/yyyy"/>

                            <div style={{'color' : 'red'}}>{this.state.errors.birthday}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputMarried">Married</label>
                            <input type="checkbox" checked={this.props.user.married} className='form-control'
                                   name="married"
                                   value={this.props.user.married}
                                   onChange={this.props.onChange}/>

                        </div>
                        <div className="form-group ">
                            <button  className="btn btn-default" onClick={this._addNewPerson}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    },
    _addStyleOnError: function (elem) {
        return elem ? 'has-error form-group' : 'form-group';
    },
    _isInputValid: function () {
        var isValid = true;
        var errors = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (this.props.user.name < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 chars.';
        }

        if (!emailRegex.test(this.props.user.email)) {
            errors.email = 'Invalid email';
            isValid = false;
        }

        if (this.props.user.age < 18) {
            errors.age = 'Age cannot be smaller than 18';
            isValid = false;
        }

        if (this.props.user.birthday === '') {
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


        if (this._isInputValid(this.props.user)) {
            var user = this.props.user;
            this.setState({user: user});

            this.props.onSave(user);
        }
    }
});


module.exports = userForm;