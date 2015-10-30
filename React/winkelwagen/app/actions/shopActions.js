import AppDispatcher from '../appDispatcher.js';
import constants from '../appConstants.js';

var storeActions = {
    addProductToCart: function (product) {
        AppDispatcher.handleAction({
            actionType: constants.ADD_PRODUCT,
            data: product
        })
    },

    deleteProductFromCart: function (product) {
        AppDispatcher.handleAction({
            actionType: constants.DELETE_PRODUCT,
            data: product
        })
    },

    updateProduct: function (product, type) {
        AppDispatcher.handleAction({
            actionType: constants.UPDATE_PRODUCT,
            data: product,
            type : type
        })
    }
};

module.exports = storeActions;