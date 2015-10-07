'use strict'

define([], function() {

    function add(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;
    }

    return {
        add: add,
        mul: mul
    }

});
