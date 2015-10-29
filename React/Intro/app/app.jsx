var ReactDOM = require('react-dom');
var React = require('react');

var CreateBrowserHistory = require('history/lib/createBrowserHistory');

var EmployeeContainer = require('./components/employeeContaine.jsx');
var Home = require('./components/home.jsx');
var About = require('./components/about.jsx');
var Navbar = require('./components/navbar.jsx');
var Employee = require('./components/employee.jsx');

//ReactDOM.render(<EmployeeContainer />, document.getElementById('app'));


var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Navbar />
                {
                    this.props.children
                }
            </div>
        )
    }
});

ReactDOM.render((

    <Router history={CreateBrowserHistory()}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='about' component={About} />
            <Route path='employees' component={EmployeeContainer} />
            <Route path='employees/:name' component={Employee} />
        </Route>
    </Router>

), document.getElementById('app'));