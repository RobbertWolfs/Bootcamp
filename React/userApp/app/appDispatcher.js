var dispatcher = require('flux').Dispatcher;
var AppDispatcher = new dispatcher();

AppDispatcher.handleAction = function (action) {
    this.dispatch({
            action: action
        }
    )
};


module.exports = AppDispatcher;