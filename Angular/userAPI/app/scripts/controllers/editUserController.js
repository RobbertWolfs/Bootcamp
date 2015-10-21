(function () {

    'use strict';

    angular
        .module('editUserController', [

        ])
        .controller('editUserController', editUserController);


    function editUserController($log, $stateParams) {

        var vm = this;
        vm.userId = null;

        activate();

        /////////////

        function activate() {

            vm.userId = $stateParams.userId;

        }
    }

})();

