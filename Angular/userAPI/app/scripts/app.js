(function () {

    'use strict';

    angular
        .module('myApp', [

            //angular

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

        //// some config settings wanneer je een service gebruikt
        //.constant('config', {
        //    baseUrl: 'api/',
        //    defaultPageSize: 50
        //})

})();

