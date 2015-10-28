var ReactDOM = require('react-dom');
var React = require('react'); // dit is nodig omdat de compile van <PersonsContainer /> React.CreateClass maakt

var createBrowserHistory = require('history/lib/createBrowserHistory'); /* createBrowserHistory zorgt voor schone urls */

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var PersonsContainer = require('./components/personsContainer.jsx');
var Home = require('./components/home.jsx');
var About = require('./components/about.jsx');
var Navbar = require('./components/navbar.jsx');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar current={this.props.children.props.route.path} />
                {this.props.children}
            </div>
        )
    }
});

//ReactDOM.render(<PersonsContainer />, document.getElementById('app'));
ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute  component={Home} />
            <Route path="about" component={About} /> {/* door het te nesten gaat hij atomatisch naar /about */}
            <Route path="employees" component={PersonsContainer} />
        </Route>
    </Router>
), document.getElementById('app'));