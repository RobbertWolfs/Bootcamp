(function () {

    'use strict';

    angular
        .module('countdownController', [

            //angular

            // third party

            // custom
        ])
        .controller('CountdownController', CountdownController);


    function CountdownController(_, $interval, $window, $rootScope) {

        var vm = this;
        var timer = null;

        activate();

        /////////////

        function activate() {
            vm.seconds = 10;
            vm.start = true;

            countDown();
        }

        function countDown() {
            timer = $interval(updateCountDown, 1000)
        }

        function updateCountDown() {
            vm.seconds--;

            if (vm.seconds == 0) {
                //$window.alert('Done');
                $rootScope.alertMessage = 'Countdown is done'; // zo geraken we aan de alertController, rootScope niet te veel gebruiken maar voor z'n zaken zou het eventueel nog mogen
                $interval.cancel(timer);
                timer = null;
            }
        }
    }

})();

