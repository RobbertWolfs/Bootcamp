(function () {
    'use strict';

    angular.module('myApp', [])
        .filter('upper', function () {
            return function (input) {
                return input.toUpperCase();
            }
        })

        .directive('ehSimple', function () {
            return {
                link: function (scope, element) {
                    element.addClass('plain');
                }
            }
        })

        .directive('ehTempl', function () {
            return {
                templateUrl: 'ehTempl.tpl.html',
                controller: function ($scope) {
                    $scope.message = 'hello';
                }
            }
        })

        .directive('ehAlert', function () {
            return {
                link: function (scope, element, attributes) {
                    element.find('div').addClass('alert-' + attributes.typeAlert);
                },
                scope: {
                    close: '&'
                },
                controller: function ($scope) {
                    var vm = this;
                    vm.closeAlert = closeAlert;
                    vm.visible = false;

                    console.log($scope);

                    if($scope.close)
                        vm.visible = true;

                    function closeAlert() {
                        vm.visible = !vm.visible;
                        $scope.close();
                    }

                },
                controllerAs: 'vm',
                templateUrl: 'ehAlert.tpl.html',
                transclude: true
            }
        })
    ;
})();
