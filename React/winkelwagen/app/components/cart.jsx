import React from 'react';
import shopStore from '../stores/shopStore';
import CartProduct from './cartProduct.jsx';
import _ from 'underscore';
import shopActions from '../actions/shopActions.js';


var cart = React.createClass({

    getInitialState: function () {

        return {
            cart: shopStore.getCart()
        }

    },

    render: function () {

        if (this.state.cart && this.state.cart.length > 0) {


            return (
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th></th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this._displayCart()}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total : </td>
                            <td>{this._totalCart()}</td>
                        </tr>
                        </tbody>
                    </table>


                </div>
            )
        }

        return ( <div>No products in the cart</div>);
    },

    _displayCart: function () {
        var self = this;

        return _.map(this.state.cart, function (product, index) {
            return <CartProduct key={index} product={product} onDelete={self._deleteProduct} onUpdate={self._updateProduct}></CartProduct>
        });
    },

    _deleteProduct : function(product) {

        shopActions.deleteProductFromCart(product);

    },

    _updateProduct : function(product, type) {


        shopActions.updateProduct(product, type);

    },




    _totalCart : function () {
        var total = 0;

        _.each(this.state.cart, function (product) {
           total += (product.total * product.cost);
        });

        return total;
    },


    componentDidMount: function () {
        shopStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function () {
        shopStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function () {
        this.setState({
            cart: shopStore.getCart()
        });
    }
});

module.exports = cart;