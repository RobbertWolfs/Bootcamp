(function() {

    'use strict';


    angular.module('app.controllers')
        .controller('view2Controller', view2Controller);


    function view2Controller($log, $routeParams, $route) {
        //Via $routeParams kunnen we parameters meekrijgen via de url

        var vm = this;
        vm.title = 'View of 2';
        vm.text = 'This is the content of View 2 Controller';

        $log.info('route parameter', $routeParams.userId); // de userId staat zo ingesteld in app.config

        activate();

        /////////


        function activate() {

        }

    }

})();
