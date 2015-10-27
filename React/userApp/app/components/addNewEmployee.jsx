var React = require('react');


var AddNewPerson = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        newUser: React.PropTypes.shape({
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
                <form>
                    <div className={this._addStyleOnError(this.props.errors.name)}>
                        <label htmlFor="exampleInputName">Name</label>
                        <input type="text" className="form-control" value={this.props.newUser.name} name="name"
                               onChange={this.props.onChange} placeholder="Name"/>

                        <div style={{'color' : 'red'}}>{this.props.errors.name}</div>
                    </div>
                    <div className={this._addStyleOnError(this.props.errors.email)}>
                        <label htmlFor="exampleInputEmail">Email address</label>
                        <input type="email" className="form-control" name="email" value={this.props.newUser.email}
                               onChange={this.props.onChange} placeholder="Email"/>

                        <div style={{'color' : 'red'}}>{this.props.errors.email}</div>
                    </div>
                    <div className={this._addStyleOnError(this.props.errors.age)}>
                        <label htmlFor="exampleInputAge">Age</label>
                        <input type="number" className="form-control" name="age" value={this.props.newUser.age}
                               onChange={this.props.onChange} placeholder="Age"/>

                        <div style={{'color' : 'red'}}>{this.props.errors.age}</div>
                    </div>
                    <div className={this._addStyleOnError(this.props.errors.birthday)}>
                        <label htmlFor="exampleInputBirthday">Birthday</label>
                        <input type="date" className='form-control' name="birthday" value={this.props.newUser.birthday}
                               onChange={this.props.onChange} placeholder="dd/mm/yyyy"/>

                        <div style={{'color' : 'red'}}>{this.props.errors.birthday}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputMarried">Married</label>
                        <input type="checkbox" checked={this.props.newUser.married} className='form-control'
                               name="married"
                               value={this.props.newUser.married}
                               onChange={this.props.onChange}/>

                    </div>
                    <div className="form-group ">
                        <button type="submit" className="btn btn-default" onClick={this.props.onSave}>Submit</button>
                    </div>
                </form>
            </div>
        )
    },

    _addStyleOnError: function(elem) {
        return elem ? 'has-error form-group' : 'form-group';
    },

    componentWillReceiveProps: function() {
        console.log('componentWillReceiveProps');
    }

});

module.exports = AddNewPerson;