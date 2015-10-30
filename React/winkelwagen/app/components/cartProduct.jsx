import React from 'react';
import constants from '../appConstants.js';
import shopStore from '../stores/shopStore.js';
import {Link} from 'react-router';

var cartProduct = React.createClass({

    getInitialState: function () {

        return {
            totalProductInCart : shopStore.getProductTotal(this.props.product.id)
        }

    },

    render: function () {

        return (
            <tr>
                <td><button className='btn btn-danger'  onClick={this.props.onDelete.bind(null, this.props.product)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>
                <td><Link to={`/shop/${this.props.product.id}`}> {this.props.product.title} </Link></td>
                <td>{this.props.product.total}</td>
                <td>{`${this.props.product.cost} ${constants.CURRENCY}`}</td>
                <td>
                    <button className='btn btn-info' onClick={this.props.onUpdate.bind(null, this.props.product, 'plus')}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                    <button className='btn btn-info' onClick={this.props.onUpdate.bind(null, this.props.product, 'minus')}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
                </td>
                <td>{this.props.product.total * this.props.product.cost}</td>
            </tr>
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
            totalProductInCart : shopStore.getProductTotal(this.props.product.id)
        });
    }

});

module.exports = cartProduct;