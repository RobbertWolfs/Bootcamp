import ReactDOM from 'react-dom';
import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {ReactRouter, Router, Route, IndexRoute} from 'react-router';

import PersonsContainer from './components/personsContainer.jsx';
import Home from './components/home.jsx';
import About from './components/about.jsx';
import Navbar from './components/navbar.jsx';
import AddEmployees from './components/addEmployees.jsx';
import EditEmployee from './components/editEmployee.jsx';
import personsActions from './actions/personsActions';
//
//var PersonsContainer = require('./components/personsContainer.jsx');
//var Home = require('./components/home.jsx');
//var About = require('./components/about.jsx');
//var Navbar = require('./components/navbar.jsx');
//var AddEmployees = require('./components/addEmployees.jsx');
//var EditEmployee = require('./components/editEmployee.jsx');
//var personsActions = require('./actions/personsActions');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar current={this.props.children.props.route.path} />
                {this.props.children}
            </div>
        )
    },
    componentWillMount : function() {
        personsActions.getUsers();
    }
});

//ReactDOM.render(<PersonsContainer />, document.getElementById('app'));
ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute  component={Home} />
            <Route path="about" component={About} /> {/* door het te nesten gaat hij atomatisch naar /about */}
            <Route path="employees" component={PersonsContainer} />
            <Route path="employees/add" component={AddEmployees} />
            <Route path="employees/:id" component={EditEmployee} />
        </Route>
    </Router>
), document.getElementById('app'));