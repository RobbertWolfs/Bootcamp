var React = require('react');


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


module.exports = PersonsTable;