(function () {

    'use strict';

    angular.module('myApp')
        .filter('gmail', ['_', '$log', function (_, $log) {
            return function (input) {
                //$log.info(input);
                return _.filter(input, function (item) {
                    return (item.email.indexOf('gmail') !== -1);
                });
            }
        }]);
})();