(function () {

    angular
        .module('myApp')
        .factory('userService', userService);
        //.factory('_', underscore);

    function underscore() {
        return _;
    }

    function userService($http) {

        function getUsers(page, sort) {
            return $http.get('http://localhost:3000/api/users?pageSize=50&page=' + page + '&sort=' + sort)
                .then(function(response) { // zo kan je enkel de users terug geven en niet het volledige http response
                    var users = response.data;
                    if(users.length < 50) users.lastPage = true;
                    return users;
                });
        }

        function deleteUser(user) { // het is beter om de volledige user binnen te krijgen dan enkel de id
            return $http.delete('http://localhost:3000/api/users/' + user.id)
                .then(function(response) { // zo kan je enkel de users terug geven en niet het volledige http response
                    var deletedUser = response.data;
                    return deletedUser;
                });
        }

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    }

})();