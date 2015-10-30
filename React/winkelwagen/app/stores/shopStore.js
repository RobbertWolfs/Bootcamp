import ObjectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher';
import _ from 'underscore';
import constants from '../appConstants.js';

var _catalog = [];
var _cartItems = [];

if (localStorage.getItem("products")) {
    _cartItems = JSON.parse(localStorage.getItem("products"));
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
        _cartItems[index].total -= 1;

    }


    saveLocalStorage(_cartItems);
}

function saveLocalStorage(cartItems) {
    localStorage.products = JSON.stringify(cartItems);
}


var shopStore = ObjectAssign({}, EventEmitter.prototype, {
    getProducts: function () {
        return _catalog;
    },

    getCart: function () {
        return _cartItems;
    },

    getCartTotal: function () {
        var total = 0;

        _.each(_cartItems, function (product) {
            total += product.total;
        });

        return total;
    },

    getCartTotalPrice: function () {
        var totalPrice = 0;

        _.each(_cartItems, function (product) {
            totalPrice += (product.total * product.cost);
        });

        return totalPrice;
    },

    getProduct: function (id) {
        var product = _.findWhere(_catalog, {id: Number(id)});
        return product;
    },

    getProductTotal: function (id) {
        var product = _.findWhere(_catalog, {id: Number(id)});
        return product.total;
    },

    addChangeListener: function (cb) {
        this.on(constants.CHANGE_EVENT, cb);
    },

    removeChangeListener: function (cb) {
        this.removeListener(constants.CHANGE_EVENT, cb);
    }

});

appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case constants.ADD_PRODUCT :
            addProduct(action.data);
            shopStore.emit(constants.CHANGE_EVENT);
            break;
        case constants.DELETE_PRODUCT :
            deleteProduct(action.data);
            shopStore.emit(constants.CHANGE_EVENT);
            break;
        case constants.UPDATE_PRODUCT :
            updateProduct(action.data, action.type);
            shopStore.emit(constants.CHANGE_EVENT);
            break;
        default :
            return true;
    }

});

module.exports = shopStore;