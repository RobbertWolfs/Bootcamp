import {Dispatcher} from 'flux';
var appDispatcher = new Dispatcher();


class AppDispatcher extends Dispatcher {
    handleAction(action) {
        this.dispatch({
            action : action
        })
    };
}
//
//
//appDispatcher.handleAction = function(action) {
//    this.dispatch({
//        action : action
//    })
//};
//
//
//module.exports = appDispatcher;

export default new AppDispatcher();