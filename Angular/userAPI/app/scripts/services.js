// PROVIDER VERSIE
(function () {

    'use strict';

    angular
        .module('myApp')
        .provider('userService', userServiceProvider);

    function userServiceProvider() {
        var baseUrl;
        var defaultPageSize;

        // dit is geschreven zoals een service
        this.setBasePath = function(basePath) {
            baseUrl = basePath;
        };

        this.setPageSize = function(pageSize) {
            defaultPageSize = pageSize;
        };

       this.$get = function($http, $resource) {
            // dit is geschreven zoals een factory
            function getUsers(page, sort) {
                return $http.get(baseUrl + 'users?pageSize=' + defaultPageSize + '&page=' + page + '&sort=' + sort)
                    .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
                        var users = response.data;
                        if (users.length < 50) users.lastPage = true;
                        return users;
                    });
            }

            function deleteUser(user) { // het is beter om de volledige user binnen te krijgen dan enkel de id
                return $http.delete(baseUrl + 'users/' + user.id)
                    .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
                        var deletedUser = response.data;
                        return deletedUser;
                    });
            }

            return {
                deleteUser : deleteUser,
                getUsers : getUsers
            }
        };
    }

})();







//// SERVICE VERSIE
//(function () {
//
//    angular
//        .module('myApp')
//        .service('userService', userService);
//
//    function userService($http, config) {
//
//        this.getUsers = function (page, sort) {
//            return $http.get(config.baseUrl + 'users?pageSize=' + config.defaultPageSize + '&page=' + page + '&sort=' + sort)
//                .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var users = response.data;
//                    if (users.length < 50) users.lastPage = true;
//                    return users;
//                });
//        };
//
//        this.deleteUser = function (user) { // het is beter om de volledige user binnen te krijgen dan enkel de id
//            return $http.delete(config.baseUrl + 'users/' + user.id)
//                .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var deletedUser = response.data;
//                    return deletedUser;
//                });
//        }
//    }
//})();






//// SERVICE VERSIE met CLASS (werkt nog niet)
//(function () {
//
//    'use strict';
//
//
//    class userService {
//
//        constructor($http) {
//            this.http = $http;
//
//        };
//
//        getUsers(page, sort) {
//            return  this.http.get('http://localhost:3000/api/users?pageSize=50&page=' + page + '&sort=' + sort)
//                .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var users = response.data;
//                    if (users.length < 50) users.lastPage = true;
//                    return users;
//                });
//        };
//
//        deleteUser(user) { // het is beter om de volledige user binnen te krijgen dan enkel de id
//            return  this.http.delete('http://localhost:3000/api/users/' + user.id)
//                .then(function (response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var deletedUser = response.data;
//                    return deletedUser;
//                });
//        }
//    }
//
//
//    $injector.instantiate(userService);
//
//    angular // je moet dit onderaan zetten anders gaat hij userService niet vinden aangezien het een class is
//        .module('myApp')
//        .service('userService', userService);
//
//})();
//










//// FACTORY VERSIE
// (function () {
//
//    angular
//        .module('myApp')
//        .factory('userService', userService);
//
//
//    function userService($http) {
//
//        function getUsers(page, sort) {
//            return $http.get('http://localhost:3000/api/users?pageSize=50&page=' + page + '&sort=' + sort)
//                .then(function(response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var users = response.data;
//                    if(users.length < 50) users.lastPage = true;
//                    return users;
//                });
//        }
//
//        function deleteUser(user) { // het is beter om de volledige user binnen te krijgen dan enkel de id
//            return $http.delete('http://localhost:3000/api/users/' + user.id)
//                .then(function(response) { // zo kan je enkel de users terug geven en niet het volledige http response
//                    var deletedUser = response.data;
//                    return deletedUser;
//                });
//        }
//
//        return {
//            getUsers: getUsers,
//            deleteUser: deleteUser
//        }
//    }
//
//})();