(function () {

    'use strict';

    angular
        .module('myApp', [

            //angular
            'ngResource',

            // third party

            // custom
            'userController',
            'alertController',
            'countdownController'

        ]) // indien geen extra dependencies : lege [] is verplicht, anders loopt het mis

        // simple wrapper for underscore
        .factory('_', function ($window) {
            return $window._; // assumes underscore has already been loaded on the page
        })

        .factory('UserResource', function($resource) {
            return $resource('/api/users/:id', { id : '@id' });
        })

    ;

        //// some config settings wanneer je een service gebruikt
        //.constant('config', {
        //    baseUrl: 'api/',
        //    defaultPageSize: 50
        //})

})();

