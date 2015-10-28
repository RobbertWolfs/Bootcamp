var React = require('react');
var ReactRouter = require('react-router')
var Link = ReactRouter.Link;


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
            return <li key={index}>
                <Link to={`/employees/${employee}`}>{employee}</Link>
            </li>;
            {/* je moet de key meegeven anders geeft hij een warning */}
        });
    }
});

module.exports = EmployeeList;