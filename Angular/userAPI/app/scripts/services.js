(function () {

    angular
        .module('myApp')
        .factory('myService', myService)
        .factory('_', underscore);

    function underscore() {
        return _;
    }

    function myService($http) {

        function getUsers(sort) {
            return $http.get('http://localhost:3000/api/users?pageSize=12&sort=' + sort);
        }


        function deleteUser(id) {
            return $http.delete('http://localhost:3000/api/users/' + id);
        }

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    }

})();