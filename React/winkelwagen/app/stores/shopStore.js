import ObjectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher';
import _ from 'underscore';
import constants from '../appConstants.js';

var _catalog = [];
var _cartItems = [];

if (localStorage.getItem("cart")) {
    _cartItems = JSON.parse(localStorage.getItem("cart"));
}

/* Data */
for (var i = 1; i < 9; i++) {
    _catalog.push({
        'id': i,
        'title': 'Artikel #' + i,
        'summary': 'Dit is een speciaal artikel!',
        'description': 'Artikel omschrijving',
        'cost': i
    });
}

function addProduct(product) {

    var index = _.findIndex(_cartItems, {id: Number(product.id)});

    if (_cartItems[index]) {
        _cartItems[index].total += 1;
    } else {
        product.total = 1;
        _cartItems.push(product);
    }

    saveLocalStorage(_cartItems);
}

function deleteProduct(product) {
    _cartItems = _.without(_cartItems, _.findWhere(_cartItems, {id: Number(product.id)}));

    saveLocalStorage(_cartItems);
}

function updateProduct(product, type) {
    var index = _.findIndex(_cartItems, {id: Number(product.id)});


    if (type === 'plus') {
        _cartItems[index].total += 1;
    } else {
        if(_cartItems[index].total > 1) {
            _cartItems[index].total -= 1;
        }
        else {
            deleteProduct(product);
        }
    }


    saveLocalStorage(_cartItems);
}

function saveLocalStorage(cartItems) {
    localStorage.cart = JSON.stringify(cartItems);
}


class ShopStore extends EventEmitter {
    constructor(props) {
        super(props);
        appDispatcher.register((payload) => {
            var action = payload.action;

            switch (action.actionType) {
                case constants.ADD_PRODUCT :
                    addProduct(action.data);
                    this.emit(constants.CHANGE_EVENT);
                    break;
                case constants.DELETE_PRODUCT :
                    deleteProduct(action.data);
                    this.emit(constants.CHANGE_EVENT);
                    break;
                case constants.UPDATE_PRODUCT :
                    updateProduct(action.data, action.type);
                    this.emit(constants.CHANGE_EVENT);
                    break;
                default :
                    return true;
            }
        });
    }

    getProducts() {
        return _catalog;
    }

    getCart() {
        return _cartItems;
    }

    getCartTotal() {
        var total = 0;

        _.each(_cartItems, (product) => {
            total += product.total;
        });

        return total;
    }

    getCartTotalPrice() {
        var totalPrice = 0;

        _.each(_cartItems, (product) => {
                totalPrice += (product.total * product.cost);
            }
        );

        return totalPrice;
    }

    getProduct(id) {
        var product = _.findWhere(_catalog, {id: Number(id)});
        return product;
    }

    getProductTotal(id) {
        var product = _.findWhere(_catalog, {id: Number(id)});
        return product.total;
    }

    addChangeListener(cb) {
        this.on(constants.CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(constants.CHANGE_EVENT, cb);
    }
}

module.exports = new ShopStore();