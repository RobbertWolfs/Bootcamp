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


    function AlertController(_) {

        var vm = this;

        activate();

        /////////////

        function activate() {
            vm.alerts = [
                { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
                { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
            ];
        }


        vm.addAlert = function() {
            vm.alerts.push({
                msg : 'Another Alert'
            })
        };

        vm.closeAlert = function(index) {
          vm.alerts.splice(index, 1);
        };
    }

})();

