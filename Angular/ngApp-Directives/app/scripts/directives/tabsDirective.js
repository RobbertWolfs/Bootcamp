(function () {

    'use strict';


    angular.module('ngApp')
        .directive('tabs', tabsDirective)
        .controller('tabsController', tabsController);




    function tabsDirective() {

        return {
            restrict : 'EA',
            templateUrl : 'templates/tabsDirective.html',
            controller : 'tabsController',
            controllerAs : 'vm',
            transclude : true

        }

    }


    tabsController.$inject = ['$scope'];
    function tabsController($scope) {
        var vm = this;

        vm.register = register;
        vm.tabs = [];
        vm.showTab = showTab;

        activate();

        ///////

        function activate() {



        }


        function register(controller) {

            if(vm.tabs.length == 0) {
                controller.show(true);
            }
            vm.tabs.push(controller);
        }

        function showTab(currentTab) {

            vm.tabs.forEach(function(tab) {
                if(currentTab == tab) {
                    tab.show(true);
                } else {
                    tab.show(false);
                }

            });
        }

    }

})();