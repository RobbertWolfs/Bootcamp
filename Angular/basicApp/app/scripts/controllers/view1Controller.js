(function() {

    'use strict';


    angular.module('app.controllers')
        .controller('view1Controller', view1Controller);


    function view1Controller() {
        var vm = this;
        vm.title = 'View of 1';
        vm.text = 'This is the content of View 1 Controller';

        activate();

        /////////


        function activate() {

        }

    }

})();
