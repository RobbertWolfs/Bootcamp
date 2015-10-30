import React from 'react';
import {Link} from 'react-router';
import constants from '../appConstants.js';
import shopStore from '../stores/shopStore.js';

var productItem = React.createClass({

    getInitialState: function () {

        return {
            totalProductInCart : shopStore.getProductTotal(this.props.product.id)
        }

    },

    render: function () {
        return (
            <div className='productItem'>
                <h2><Link to={`/shop/${this.props.product.id}`}> {this.props.product.title} </Link></h2>

                <p>{this.props.product.summary}</p>

                <h5><b>{`${constants.CURRENCY} : ${this.props.product.cost}`}</b> { (this.state.totalProductInCart ? <span className='productincart'>Total in cart : { this.state.totalProductInCart }</span> : '') }</h5>

                <br/>
                <br/>

                <button className='btn btn-success' onClick={this.props.onClick.bind(null, this.props.product)}>Add</button>
            </div>
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

module.exports = productItem;