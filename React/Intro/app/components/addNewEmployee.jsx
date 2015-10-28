var React = require('react');

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
                <button className='button' onClick={this.props.onSave}>Add new</button>
                <div style={{'color' : 'red'}}>{this.props.errors.newEmployee}</div>
            </div>
        );
    }
});

module.exports = AddEmployee;