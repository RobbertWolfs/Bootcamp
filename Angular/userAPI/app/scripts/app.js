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
        .factory('_', function($window) {
            return $window._; // assumes underscore has already been loaded on the page
        })
    .constant('config', {
            baseUrl : 'http://localhost:3000/api/',
            pageSize : 50
        })

})();

