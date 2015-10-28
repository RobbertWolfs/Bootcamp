var React = require('react');
var AddEmployee = require('./addNewEmployee.jsx');
var EmployeeList = require('./employeeList.jsx');

var employeeStore = require('../stores/employeeStore.js');
var employeeActions = require('../actions/employeeActions.js');

var EmployeeContainer = React.createClass({
    getInitialState: function () {
        return {
            company: employeeStore.getCompany(),
            employees: employeeStore.getEmployees(),
            newEmployee: '',
            errors: {}
        }
    },

    componentDidMount: function () {
        employeeStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount : function () {
        employeeStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function () {
        this.setState({
            company: employeeStore.getCompany(),
            employees: employeeStore.getEmployees()
        });
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
            employeeActions.addEmployee(this.state.newEmployee);
            this.setState({
                newEmployee: ''
            });
        }
    }
});

module.exports = EmployeeContainer;