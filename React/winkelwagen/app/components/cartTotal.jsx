import React from 'react';
import shopStore from '../stores/shopStore.js';
import {Link} from 'react-router';
import constants from '../appConstants.js';

var cartTotal = React.createClass({

    getInitialState: function () {
        return {
            total: shopStore.getCartTotal(),
            totalPrice: shopStore.getCartTotalPrice()
        }
    },

    render: function () {
        if (this.state.total && this.state.total > 0) {


            return (
                <li className="pull-right"><Link to="/cart">Cart : <span>{ this.state.total }</span>  - <span>{ `${constants.CURRENCY} ${this.state.totalPrice}` }</span> </Link></li>
            )
        }


        return (
            <li className="pull-right"><Link to="/cart">Cart </Link></li>
        )
    },

    componentDidMount: function () {
        shopStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function () {
        shopStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function () {
        this.setState({
            total: shopStore.getCartTotal(),
            totalPrice: shopStore.getCartTotalPrice()
        });
    }
});

module.exports = cartTotal;