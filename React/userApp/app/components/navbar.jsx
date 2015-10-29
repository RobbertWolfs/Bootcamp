var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var PersonsCounterStore = require('../stores/personCounterStore');
var PersonStore = require('../stores/personsStore');

var Navbar = React.createClass({
    getInitialState: function () {
        return {
            currentActive: 'home',
            userLength : PersonsCounterStore.getUserCount()
        }
    },
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className={this._isActive('home')}><Link to="/"
                                                                     onClick={this._toggleActiveClass.bind(null, 'home')}>Euricom</Link>
                        </li>
                        <li className={this._isActive('about')}><Link to="/about"
                                                                      onClick={this._toggleActiveClass.bind(null, 'about')}>About</Link>
                        </li>
                        <li className={this._isActive('employees')}><Link to="/employees"
                                                                          onClick={this._toggleActiveClass.bind(null, 'employees')}>Employees ({this.state.userLength})</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    },


    _onStoreChange : function () {
        this.setState({
            userLength : PersonsCounterStore.getUserCount()
        });
    },

    _toggleActiveClass: function (elem) {
        this.setState({
            currentActive: elem
        });
    },

    _isActive: function (elem) {
        return this.state.currentActive == elem ? 'active' : '';
    },

    componentDidMount: function () {

        if (this.props.current !== undefined) {
            this.setState({
                currentActive: this.props.current
            });
        }

        PersonsCounterStore.addChangeListener(this._onStoreChange);

    },


    componentWillUnmount : function() {
        PersonsCounterStore.removeChangeListener(this._onStoreChange);
    }
});

module.exports = Navbar;

//nog een goed voorbeeld voor de active className is : https://euricom.slack.com/files/peter.cosemans/F0DBFN0GG/ActiveLink.md;