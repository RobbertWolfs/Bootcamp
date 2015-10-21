(function () {

    'use strict';

    angular
        .module('myApp') // indien geen extra dependencies : lege [] is verplicht, anders loopt het mis

        // wanneer je een provider gebruikt
        .config(function (userServiceProvider) {
            userServiceProvider.setBasePath('/api/');
            userServiceProvider.setPageSize(20);
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('httpLogInterceptor');
            $httpProvider.interceptors.push('httpAuthenticateInterceptor');
            $httpProvider.interceptors.push('httpErrorInterceptor');
        })

        //Routes
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/edit/:userId', {
                    templateUrl : '../views/edit.html',
                    controller : 'editUserController',
                    controllerAs : 'vm'
                })
                .when('/add/', {
                    templateUrl : '../views/edit.html',
                    controller : 'editUserController',
                    controllerAs : 'vm'
                })
                .when('/users', {
                    templateUrl : '../views/users.html',
                    controller : 'UserListController',
                    controllerAs : 'vm',
                    resolve : { // dit is voor de route change gebeurt
                        users : function(userService) { // nu kan je users gebruiken in de usersListController ipv van dat je daar de user gaat ophalen
                            return userService.getUsers();
                        }
                    }
                })
                .when('/countdown', {
                    templateUrl : '../views/countdown.html',
                    controller : 'CountdownController',
                    controllerAs : 'vm'
                })
                .when('/alert', {
                    templateUrl : '../views/alert.html',
                    controller : 'AlertController',
                    controllerAs : 'vm'
                })
                .otherwise({
                    redirectTo : '/users'
                });

                $locationProvider.html5Mode(true); // Dit is handig zodat we de # in de url kunnen weglaten, maar moet je ook je server aanpassen om dit te laten werken (dit is wel tricky), check server.js
        })

    ;

})();

