(function() {

    'use strict';


    angular.module('app.controllers')
        .controller('mainController', mainController);


    function mainController($location) {
        var vm = this;
        vm.text = 'Hello World';
        vm.goToView2 = goToView2;

        activate();

        /////////


        function activate() {

        }

        function goToView2() {
            $location.path('view2');
        }
    }

})();
