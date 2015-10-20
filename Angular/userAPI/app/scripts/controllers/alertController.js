(function () {

    'use strict';

    angular
        .module('alertController', [

            //angular

            // third party
            'ui.bootstrap'

            // custom
        ])
        .controller('AlertController', AlertController);


    function AlertController() {

        var vm = this;

        activate();

        /////////////

        function activate() {
            vm.showAlert = false;
            vm.alertMessage = 'Whoop Whoop, this is me showing an alert';
            vm.alertType = 'success';
        }


        vm.toggleAlert = function() {
           vm.showAlert = !vm.showAlert;
        };


    }

})();

