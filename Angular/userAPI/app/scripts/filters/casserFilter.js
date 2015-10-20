(function () {

    angular.module('myApp')
        .filter('casser', function () {
            return function (item, uppercase) {
                item = item || ''; // anders kan de filter eruit vliegen dus best even standaard een lege string zetten indien item niet is meegegeven

                if (uppercase) {
                    return item.toUpperCase();
                }

                return item.toLowerCase();
            };
        });

})();