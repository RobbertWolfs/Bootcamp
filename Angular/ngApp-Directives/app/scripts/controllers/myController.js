(function() {

    'use strict';

    angular.module('ngApp')
        .controller('myController', myController);



    function myController() {

        var vm = this;
        vm.doThat = doThat;

        vm.message = '';

        activate();


        /////

        function activate() {
            vm.message = 'Hello World';
        }


        function doThat() {
            console.log('doThat');
        }



    }

})();