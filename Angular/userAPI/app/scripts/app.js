(function () {

    'use strict';

    angular
        .module('myApp', [

            //angular
            'ngResource',
            'ngSanitize',

            // third party
            'toaster',
            'ui.router',

            // custom
            'userController',
            'alertController',
            'countdownController',
            'editUserController'

        ]) // indien geen extra dependencies : lege [] is verplicht, anders loopt het mis

        // simple wrapper for underscore
        .factory('_', function ($window) {
            return $window._; // assumes underscore has already been loaded on the page
        })

        .factory('UserResource', function($resource) {
            return $resource('/api/users/:id', { id : '@id' });
        })

        .run(function($rootScope, $log) {

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
               $log.info('state change error', error)
            });

        })

    ;

        //// some config settings wanneer je een service gebruikt
        //.constant('config', {
        //    baseUrl: 'api/',
        //    defaultPageSize: 50
        //})

})();

