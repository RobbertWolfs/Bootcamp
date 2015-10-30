import React from 'react';
import shopStore from '../stores/shopStore.js';
import constants from '../appConstants.js';


var product = React.createClass({
    getInitialState: function () {

        return {
            product: shopStore.getProduct(this.props.params.id)
        }

    },
    render: function () {
        return (
            <div>
                <div className='productItem'>
                    <h2> {this.state.product.title} </h2>

                    <div>
                        <h4>Summary</h4>
                        {this.state.product.summary}
                    </div>

                    <div>
                        <h4>Description</h4>
                        {this.state.product.description}
                    </div>


                    <div>
                        <h4>Cost</h4>
                        {`${constants.CURRENCY} ${this.state.product.cost}`}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = product;