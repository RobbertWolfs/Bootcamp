var React = require('react');

var Employee = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.params.name}
            </div>
        )
    }
});

module.exports = Employee;