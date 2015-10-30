import AppDispatcher from '../appDispatcher.js';
import constants from '../appConstants.js';

class StoreActions {
    addProductToCart(product) {
        AppDispatcher.handleAction({
            actionType: constants.ADD_PRODUCT,
            data: product
        })
    }

    deleteProductFromCart(product) {
        AppDispatcher.handleAction({
            actionType: constants.DELETE_PRODUCT,
            data: product
        })
    }

    updateProduct(product, type) {
        AppDispatcher.handleAction({
            actionType: constants.UPDATE_PRODUCT,
            data: product,
            type : type
        })
    }
}

export default new StoreActions();
