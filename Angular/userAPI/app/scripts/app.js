(function () {

    'use strict';

    angular
        .module('myApp', [

            //angular
            'ngResource',
            'ngSanitize',
            'ngMessages',

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
        .factory('_', ['$window', function ($window) {
            return $window._; // assumes underscore has already been loaded on the page
        }])

        .factory('UserResource', ['$resource', function($resource) {
            var resource = $resource('/api/users/:id', { id : '@id' }, { update: { method: 'PUT'}});
                //resource.prototype.$store = function() {
                //    if (!this.id) {
                //        return this.$save();
                //    }
                //    else {
                //        return this.update();
                //    }
                //};
            return resource;
        }])

        .run(['$rootScope', '$log', function($rootScope, $log) {

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
               $log.info('state change error', error)
            });

        }])

    ;

        //// some config settings wanneer je een service gebruikt
        //.constant('config', {
        //    baseUrl: 'api/',
        //    defaultPageSize: 50
        //})

})();

