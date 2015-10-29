var React = require('react');
var Link = require('react-router').Link;


var addEmployeeButton = React.createClass({

    render: function () {
        return (

            <Link to='/employees/add' className="btn btn-info">Add Person</Link>

        )
    }

});


module.exports = addEmployeeButton;