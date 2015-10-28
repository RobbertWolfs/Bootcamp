var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher');

//Data Storage
var company = 'Euricom';
var employees = ['Peter', 'Niels', 'Frederik'];

//Setter Methods
var addEmployee = function (employee) {
    employees.push(employee);
};

//Store Definition
var employeeStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (cb) {
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener('CHANGE_EVENT', cb);
    },
    getEmployees : function() {
        return employees;
    },
    getCompany : function () {
        return company;
    }
});

//Registraton on dispatcher
appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case 'ADD_EMPLOYEE' :
            addEmployee(action.data);
            employeeStore.emit('CHANGE_EVENT');
            break;
        default :
            return true;
    }
});

module.exports = employeeStore;