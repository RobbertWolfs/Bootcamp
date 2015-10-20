(function () {

    angular.module('myApp')
        .filter('makeUpperCase', function () {
            return function (item) {
                return item.toUpperCase();
            };
        });

})();