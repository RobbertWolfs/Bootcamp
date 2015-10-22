(function () {

    'use strict';

    angular
        .module('myApp') // indien geen extra dependencies : lege [] is verplicht, anders loopt het mis

        // wanneer je een provider gebruikt
        .config(['userServiceProvider', function (userServiceProvider) {
            userServiceProvider.setBasePath('/api/');
            userServiceProvider.setPageSize(20);
        }])

        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpLogInterceptor');
            $httpProvider.interceptors.push('httpAuthenticateInterceptor');
            $httpProvider.interceptors.push('httpErrorInterceptor');
        }])

        //Routes
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $stateProvider
                .state('edit', {
                    url: "/edit/:userId",
                    templateUrl: '../views/edit.html',
                    controller: 'editUserController',
                    controllerAs: 'vm'
                })
                .state('add', {
                    url: "/add",
                    templateUrl: '../views/edit.html',
                    controller: 'editUserController',
                    controllerAs: 'vm'
                })
                .state('users', {
                    url: "/users",
                    templateUrl: '../views/users.html',
                    controller: 'UserListController',
                    controllerAs: 'vm',
                    resolve: { // dit is voor de route change gebeurt
                        users: ['userService',function (userService) { // nu kan je users gebruiken in de usersListController ipv van dat je daar de user gaat ophalen
                            return userService.getUsers();
                        }]
                    }
                })
                .state('countdown', {
                    url: "/countdown",
                    templateUrl: '../views/countdown.html',
                    controller: 'CountdownController',
                    controllerAs: 'vm'
                })
                .state('alert', {
                    url: "/alert",
                    templateUrl: '../views/alert.html',
                    controller: 'AlertController',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise("/users");

            $locationProvider.html5Mode(true); // Dit is handig zodat we de # in de url kunnen weglaten, maar moet je ook je server aanpassen om dit te laten werken (dit is wel tricky), check server.js
        }])

    ;

})();

