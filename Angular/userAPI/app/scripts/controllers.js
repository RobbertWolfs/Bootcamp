(function () {

    'use strict';

    angular
        .module('myApp') // hier is het een referentie en moet je dus geen [] erbij zetten
        .controller('MyController', MyController);


    function MyController($scope, myService) {
        $scope.users = [];
        $scope.sortBy = 'name';
        $scope.message = '';

        myService.getUsers()
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function(err) {
                $scope.message = err.data;
            });


        $scope.sortTableBy = function(predicate) {
            $scope.reverse = ($scope.sortBy === predicate) ? !$scope.reverse : false;
            $scope.sortBy = predicate;
        };

        $scope.deleteUser = function(id) {
            myService.deleteUser(id)
                .then(function(user) {
                    $scope.users = _.without($scope.users, _.findWhere($scope.users, {id: id}));
                })
                .catch(function(err) {
                    $scope.message = err.data;
                });
        };

    }

})();

