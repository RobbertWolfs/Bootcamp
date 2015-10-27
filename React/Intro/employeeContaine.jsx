var EmployeeContainer = React.createClass({
    getInitialState: function () {
        return {
            company: 'Euricom',
            employees: ['Peter', 'Kevin', 'Frederik'],
            newEmployee: '',
            errors: {}
        }
    },
    render: function () {
        return (
            <div>
                <h1>{this.state.company}</h1>
                <AddEmployee newEmployee={this.state.newEmployee}
                             onChange={this._handleChange}
                             onSave={this._addNewEmployee}
                             errors={this.state.errors}
                    />
                <EmployeeList employees={this.state.employees}/>
            </div>
        )
    },

    _isInputValid: function () {
        var isValid = true;
        var errors = {};

        if (this.state.newEmployee.length < 3) {
            isValid = false;
            errors.newEmployee = 'New employee must be at least 3 chars.';
        }

        this.setState({
            errors: errors
        });

        return isValid;
    },

    _handleChange: function (e) {
        this.setState({
            newEmployee: e.target.value
        });
    },

    _addNewEmployee: function () {
        if (this._isInputValid(this.state.newEmployee)) {
            this.setState({
                employees: this.state.employees.concat(this.state.newEmployee),
                newEmployee: ''
            });
        }
    }
});

var EmployeeList = React.createClass({
    getDefaultProps: function () {
        return {
            employees: ['Wart']
        }
    },
    render: function () {
        return (
            <ul>
                {this._renderEmployees()}
            </ul>
        )
    },

    _renderEmployees: function () {
        return this.props.employees.map(function (employee, index) {
            return <li key={index}>{employee}</li>;
            {/* je moet de key meegeven anders geeft hij een warning */
            }
        });
    }
});

var AddEmployee = React.createClass({
    propTypes: {
        newEmployee: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <h3>Add a new employee</h3>
                <input type="text" value={this.props.newEmployee} onChange={this.props.onChange}/>
                <button onClick={this.props.onSave}>Add new</button>
                <div style={{'color' : 'red'}}>{this.props.errors.newEmployee}</div>
            </div>
        );
    }
});

ReactDOM.render(<EmployeeContainer />, document.getElementById('app'));