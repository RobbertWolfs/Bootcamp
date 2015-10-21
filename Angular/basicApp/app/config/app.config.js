(function() {

    'use strict';



    angular.module('basicApp')
        //// maakt gebruik van angular-route
        //.config(function($routeProvider) {
        //    $routeProvider
        //        .when('/view1', {
        //            templateUrl: 'views/view1.html',
        //            controller: 'view1Controller',
        //            controllerAs : 'vm'
        //        })
        //        .when('/view2/:userId?', { // het vraagteken maakt de userId optioneel
        //            templateUrl: 'views/view2.html',
        //            controller: 'view2Controller',
        //            controllerAs : 'vm'
        //        })
        //        .otherwise({
        //            redirectTo : '/view1'
        //        });
        //});


        // maakt gebruik van angular-ui-router
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('view1', {
                    url : '/view1',
                    templateUrl : 'views/view1.html',
                    controller : 'view1Controller',
                    controllerAs : 'vm'
                })
                .state('view2', {
                    url : '/view2/:userId?',
                    templateUrl : 'views/view2.werewrhtml',
                    controller : 'view2Controller',
                    controllerAs : 'vm'
                })

            $urlRouterProvider.otherwise('view1');

        })

})();