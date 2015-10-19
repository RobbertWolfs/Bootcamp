(function () {

    angular
        .module('myApp')
        .factory('myService', myService);


    function myService($http) {

        function getUsers() {
            return $http.get('http://localhost:3000/api/users?pageSize=18');
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