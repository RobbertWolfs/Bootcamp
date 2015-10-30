//React
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import {ReactRouter, Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory  from 'history/lib/createBrowserHistory.js';

// Custom
import StoreContainer from './components/storeContainer.jsx';
import Product from './components/product.jsx';
import Shop from './components/shop.jsx';
import Cart from './components/cart.jsx';
import Navbar from './components/navbar.jsx';

var App = React.createClass({
   render : function() {
       return (
           <div>
               <Navbar />
               {this.props.children}
           </div>
       )
   }
});


ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path='/' component={App}>
            <IndexRoute component={Shop} />
            <Route path='shop/:id' component={Product} />
            <Route path='cart' component={Cart} />
        </Route>
    </Router>
), document.getElementById('app'));

