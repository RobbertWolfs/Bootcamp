(function () {

    'use strict';


    angular.module('ngApp')
        .directive('tabPane', tabDirective)
        .controller('tabController', tabController);

    function tabDirective() {

        return {
            restrict : 'EA',
            templateUrl : 'templates/tabDirective.html',
            controller : 'tabController',
            controllerAs : 'vm',
            scope : {
                title : '@'
            },
            require : ['^tabs','tabPane'],
            transclude : true,
            link : function(scope, element, attrs, controllers) {

                console.log('test', controllers);

                var tabsCtrl = controllers[0];
                var myCtrl = controllers[1];


                myCtrl.init(tabsCtrl);

            }
        }

    }


    tabController.$inject = ['$scope'];
    function tabController($scope) {
        var vm = this;


        vm.active = false;


        activate();

        ///////

        function activate() {

            //vm.tabMessage = 'test';

        }

        this.title = function() {
          return $scope.title;
        };

        this.init = function(tabsCtrl) {
            tabsCtrl.register(this);
        };

        this.show = function(enable) {
            vm.active = enable;
        }
    }

})();