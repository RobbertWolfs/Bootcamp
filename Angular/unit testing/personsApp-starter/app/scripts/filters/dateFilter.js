(function () {
    'use strict';

    angular
        .module('app')
        .filter('dateFormat', function () {
            return function (input) {
                if (!input) // undefined, null, string
                    return input;

                if(!angular.isDate(input) && !angular.isString(input)) // is not string or no date
                    return input;

                var momentDate = moment(input);

                if(!momentDate.isValid()) // no valid date
                    return input;

                return momentDate.format('DD-MM-YYYY');
            }
        });
})();