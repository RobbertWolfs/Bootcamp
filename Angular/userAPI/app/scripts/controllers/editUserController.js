(function () {

    'use strict';

    angular
        .module('editUserController', [

        ])
        .controller('editUserController', editUserController);


    function editUserController($log, $routeParams) {

        var vm = this;
        vm.userId = null;

        activate();

        /////////////

        function activate() {

            vm.userId = $routeParams.userId;

        }
    }

})();

