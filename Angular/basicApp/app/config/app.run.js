(function() {
    'use strict';

    angular.module('basicApp')

    // maakt gebruik van angular-route
        //.run(function($rootScope, $log) {
        //    $rootScope.$on('$routeChangeStart', function(next, current) {
        //        $log.info('route start', next, current);
        //    });
        //
        //    $rootScope.$on('$routeChangeSuccess', function(current, previous) {
        //        $log.info('route changed', current, previous);
        //    });
        //
        //    $rootScope.$on('$routeChangeError', function(current, previous) {
        //        $log.error('route error', current, previous);
        //    });
        //});


    // maakt gebruik van angular-ui-router
    .run(function($rootScope, $log) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            $log.error('route error', error);
        }); //deze is heel belangrijk anders geraken je errors verloren en kan je ze niet meer opvangen
    });

})();