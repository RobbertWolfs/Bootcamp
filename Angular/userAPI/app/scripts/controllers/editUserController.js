(function () {

    'use strict';

    angular
        .module('editUserController', [])
        .controller('editUserController', editUserController);


    function editUserController($log, $stateParams, $scope, userService) {

        var vm = this;
        vm.userId = null;
        vm.submit = submit;
        vm.master = {};

        activate();

        /////////////

        function activate() {

            var userId = $stateParams.userId;

            if(userId) {
                userService.getUser(vm.userId)
                    .then(function (user) {

                        vm.user = user;

                    })
                    .catch(function (err) {
                        vm.message = err.data;
                    });

            }


        }

        function submit(valid) {

            if (!valid)
                return;

            $scope.myForm.submitting = true; // dit moet je via scope oproepen want angular heeft de form op de scope gezet ipv op vm


            userService.saveUser(vm.user)
                .then(function () {


                    vm.message = 'Succesfully added to the DB ';
                    $scope.myForm.submitting = false;
                    vm.user = angular.copy(vm.master);
                    $scope.myForm.$setPristine();
// Since Angular 1.3, set back to untouched state.
                    $scope.myForm.$setUntouched();

                })
                .catch(function (err) {
                    vm.message = err.data;
                });


        }
    }

})();

