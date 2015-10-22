(function() {


    'use strict';

    angular.module('myApp')
        .factory('httpErrorInterceptor', ['$q', 'toaster', function($q, toaster) {
            return {
                request : function(request) {
                    return request;
                },
                responseError : function(response) {
                    toaster.pop('error', "Error", response.data);
                    //$window.alert('Oops, Something went wrong, please try again.');
                    return $q.reject(response);
                }
            }
        }]);

})();