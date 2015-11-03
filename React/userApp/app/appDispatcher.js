//var dispatcher = require('flux').Dispatcher;
import {Dispatcher} from 'flux';
var AppDispatcher = new Dispatcher();


AppDispatcher.handleAction = function (action) {
    this.dispatch({
            action: action
        }
    )
};

module.exports = AppDispatcher;