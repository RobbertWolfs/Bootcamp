(function() {

    'use strict';

    angular.module('myApp')


        .factory('httpAuthenticateInterceptor', function($q) {
            return {
                request : function (request) {
                    request.headers.authorization = 'Robbert Wolfs';
                    return $q.when(request);
                }
            }
        });


})();
