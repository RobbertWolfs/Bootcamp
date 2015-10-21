(function() {

    'use strict';



    angular.module('basicApp')
        // Routes
        .config(function($routeProvider) {
            $routeProvider
                .when('/view1', {
                    templateUrl: 'views/view1.html',
                    controller: 'view1Controller',
                    controllerAs : 'vm'
                })
                .when('/view2/:userId?', { // het vraagteken maakt de userId optioneel
                    templateUrl: 'views/view2.html',
                    controller: 'view2Controller',
                    controllerAs : 'vm'
                })
                .otherwise({
                    redirectTo : '/view1'
                });
        });

})();