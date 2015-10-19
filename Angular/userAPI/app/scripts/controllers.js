(function () {

    'use strict';

    angular
        .module('myApp', ['infinite-scroll']) // hier is het een referentie en moet je dus geen [] erbij zetten
        .controller('MyController', MyController);


    function MyController($scope, myService, _) {
        $scope.users = [];
        $scope.sortBy = 'email';
        $scope.message = '';
        $scope.busy = false;
        $scope.page = 1;

        myService.getUsers($scope.page, $scope.sortBy)
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function(err) {
                $scope.message = err.data;
            });


        $scope.sortTableBy = function(predicate) {
            $scope.reverse = ($scope.sortBy === predicate) ? !$scope.reverse : false;
            $scope.sortBy = predicate;

            if($scope.reverse) {
              predicate = '-' + predicate;
            }

            myService.getUsers($scope.page, predicate)
                .then(function (response) {
                    $scope.users = response.data;
                })
                .catch(function(err) {
                    $scope.message = err.data;
                });
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

        $scope.loadMore = function() {


            if ($scope.busy) return;

            $scope.busy = true;

            console.log('load more');


            myService.getUsers($scope.page, $scope.sortBy)
                .then(function (response) {
                    $scope.users.push(response.data);
                    $scope.page += 1;
                    $scope.busy = false;
                })
                .catch(function(err) {
                    $scope.message = err.data;
                });
        };

    }

})();

