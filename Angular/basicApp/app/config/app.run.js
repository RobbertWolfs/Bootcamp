(function() {
    'use strict';

    angular.module('basicApp')
        .run(function($rootScope, $log) {
            $rootScope.$on('$routeChangeStart', function(next, current) {
                $log.info('route start', next, current);
            });

            $rootScope.$on('$routeChangeSuccess', function(current, previous) {
                $log.info('route changed', current, previous);
            });

            $rootScope.$on('$routeChangeError', function(current, previous) {
                $log.error('route error', current, previous);
            });
        });
})();