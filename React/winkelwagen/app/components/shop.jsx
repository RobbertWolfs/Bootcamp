import React from 'react';
import shopStore from '../stores/shopStore';
import ProductItem from './productItem.jsx';
import shopActions from '../actions/shopActions.js';
import _ from 'underscore';

var shop = React.createClass({

    getInitialState: function () {

        return {
            products: shopStore.getProducts(),
        }

    },

    componentDidMount: function () {
        shopStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function () {
        shopStore.removeChangeListener(this._onStoreChange);
    },

    render: function () {
        return (
            <div>

                {this._renderProducts()}

            </div>
        )
    },

    _onStoreChange: function () {
        this.setState({
            products: shopStore.getProducts()
        });
    },

    _renderProducts : function () {

        var self = this;

        return _.map(this.state.products, function(product, index) {
            return <ProductItem key={index} product={product} onClick={self._onClick}></ProductItem>
        });
    },

    _onClick : function(product) {

        shopActions.addProductToCart(product);

    }
});

module.exports = shop;