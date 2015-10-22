(function () {

    'use strict';

    angular
        .module('userController', [

            //angular

            // third party
            'infinite-scroll'

            // custom
        ])
        .controller('UserListController', UserListController);


    UserListController.$inject = ['userService', '_', '$filter', '$location', 'users'];
    function UserListController(userService, _, $filter, $location, users) {

        var vm = this;

        vm.users = [];
        vm.sortBy = 'email';
        vm.errorMessage = '';
        vm.busy = false;
        vm.page = 1;
        vm.text = '<strong>Hello World</strong>';
        vm.editUser = editUser;

        activate();

        /////////////

        function activate() {

            var gmailFilter = $filter('gmail'); //dit zorgt voor betere performance dan dat je hem in je html filterd

            vm.users = users; // de users komen van app.config in de resolve en krijg je hier binnen als param
            // dit is niet meer nodig door het lijntje hierboven
            //userService.getUsers(vm.page, vm.sortBy)
            //    .then(function (users) {
            //        var filteredUsers = gmailFilter(users);
            //        vm.users = filteredUsers;
            //    })
            //    .catch(function (err) {
            //        vm.errorMessage = err.data;
            //    });
        }

        function editUser(user) {
            $location.path('edit/' + user.id)
        }

        vm.sortTableBy = function (columnToSort) {
            vm.reverse = (vm.sortBy === columnToSort) ? !vm.reverse : false;
            vm.sortBy = columnToSort;

            if (vm.reverse) {
                columnToSort = '-' + columnToSort;
            }

            userService.getUsers(vm.page, columnToSort)
                .then(function (users) {
                    vm.users = users;
                })
                .catch(function (err) {
                    vm.errorMessage = err.data;
                });
        };

        vm.deleteUser = function (user) {
            userService.deleteUser(user) // het is beter om de volledige user mee te geven dan enkel de id
                .then(function (deletedUser) {
                    vm.users = _.without(vm.users, _.findWhere(vm.users, user)); // we moeten user gebruiken ipv deletedUser
                })
                .catch(function (err) {
                    vm.errorMessage = err.data;
                });
        };

        vm.loadMore = function () {
            if (vm.busy) return;
            vm.busy = true;

            userService.getUsers(vm.page, vm.sortBy)
                .then(function (users) {
                    vm.users = vm.users.concat(users);

                    if (!users.lastPage) {
                        vm.page += 1;
                        vm.busy = false;
                    }
                })
                .catch(function (err) {
                    vm.errorMessage = err.data;
                });
        };
    }

})();

