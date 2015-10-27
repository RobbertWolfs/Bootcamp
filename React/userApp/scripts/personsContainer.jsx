var PersonsContainer = React.createClass({
    getInitialState: function () {
        return {
            title: 'Persons',
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
            newUser: this._generateEmptyUser()
        }
    },
    render: function () {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <PersonsTable users={this.state.users}/>
                <AddNewPerson newUser={this.state.newUser} onChange={this._handleChange} onSave={this._addNewPerson}/>
            </div>
        )
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

        var user = this.state.newUser;
        user.id = this._generateUserId(this.state.users);
        this.setState({newUser: user});


        this.setState({
            users: this.state.users.concat(this.state.newUser),
            newUser: this._generateEmptyUser()
        });
    }
});


var PersonsTable = React.createClass({
    propTypes: {
        users: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number.isRequired,
            birthday: React.PropTypes.string.isRequired,
            married: React.PropTypes.bool.isRequired
        }))
    },
    render: function () {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Birthday</th>
                    <th>Married</th>
                </tr>
                </thead>
                <tbody>
                {this._renderPersons()}
                </tbody>
            </table>
        )
    },

    _renderPersons: function () {
        var self = this;

        return this.props.users.map(function (user, index) {
            return <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.birthday}</td>
                <td>{self._renderMarried(user.married)}</td>

            </tr>
        })
    },

    _renderMarried: function (married) {

        if (married) {
            return <span className="glyphicon glyphicon-check"></span>
        }


        return <span className="glyphicon glyphicon-unchecked"></span>
    }


});


var AddNewPerson = React.createClass({
    propTypes: {
        onChange : React.PropTypes.func.isRequired,
        onSave : React.PropTypes.func.isRequired,
        newUser : React.PropTypes.shape({
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
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        <input type="text" className="form-control" value={this.props.newUser.name} name="name"
                               onChange={this.props.onChange} placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Email address</label>
                        <input type="email" className="form-control" name="email" value={this.props.newUser.email}
                               onChange={this.props.onChange} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAge">Age</label>
                        <input type="number" className="form-control" name="age" value={this.props.newUser.age}
                               onChange={this.props.onChange} placeholder="Age"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBirthday">Birthday</label>
                        <input type="date" className="form-control" name="birthday" value={this.props.newUser.birthday}
                               onChange={this.props.onChange} placeholder="dd/mm/yyyy"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputMarried">Married</label>
                        <input type="checkbox" checked={this.props.newUser.married} className='form-control'
                               name="married"
                               value={this.props.newUser.married}
                               onChange={this.props.onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default" onClick={this.props.onSave}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
});

ReactDOM.render(<PersonsContainer />, document.getElementById('app'));