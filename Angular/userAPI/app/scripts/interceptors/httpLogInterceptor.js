(function() {

    'use strict';

    angular.module('myApp')

        .factory('httpLogInterceptor', function($q) {
            return {
                request : function (request) {
                    console.log('test', request.url);
                    return $q.when(request);
                }
            }
        });

})();
