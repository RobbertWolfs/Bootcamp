(function() {

    'use strict';


    angular.module('app.controllers')
        .controller('mainController', mainController);


    function mainController($location, $state) {
        var vm = this;
        vm.text = 'Hello World';


        vm.goToView2 = goToView2;



        activate();

        /////////


        function activate() {

        }

        function goToView2() {
            //wordt gebruikt bij angular-route
            $location.path('view2');

            // wordt gebruikt bij angular-ui-router
            $state.go('view2');
        }
    }

})();
