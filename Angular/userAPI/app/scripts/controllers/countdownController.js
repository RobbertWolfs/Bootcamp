(function () {

    'use strict';

    angular
        .module('countdownController', [

            //angular

            // third party

            // custom
        ])
        .controller('CountdownController', CountdownController);


    CountdownController.$inject = ['$interval', '$window', '$scope', '$log'];
    function CountdownController($interval, $window, $scope, $log) {

        var vm = this;
        var timer = null;

        activate();

        /////////////

        function activate() {
            vm.seconds = 10;
            vm.start = true;

            countDown();
            //
            //$scope.$on(
            //    "$destroy",
            //    function handleDestroyEvent() {
            //        console.log('destroy timer');
            //        $interval.cancel(timer);
            //
            //    }
            //);
        }

        function countDown() {
            //timer = $interval(updateCountDown, 1000) // dit geeft funky errors bij custom filters , tenzij het als dependency wordt ingeladen de filter..


            timer = setTimeout(function () {
                $scope.$apply(function () { // zonder de apply veranderd de vm.seconds wel maar wordt het niet aangepast op het scherm
                    updateCountDown();
                });
            }, 1000);

        }

        function updateCountDown() {
            vm.seconds--;

            console.log(vm.seconds);

            if (vm.seconds == 0) {
                $window.alert('Done');
                $rootScope.alertMessage = 'Countdown is done'; // zo geraken we aan de alertController, rootScope niet te veel gebruiken maar voor z'n zaken zou het eventueel nog mogen
                //$interval.cancel(timer);

                clearTimeout(timer);
                timer = null;
            } else {

                countDown();

            }
        }
    }

})();

