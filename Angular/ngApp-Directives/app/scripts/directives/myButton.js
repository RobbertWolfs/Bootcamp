(function() {


    'use strict';

    angular.module('ngApp')
        .directive('myButton', myDirective)
        .controller('MyButtonController', MyButtonController);


    function myDirective() {

        return {
            restrict: 'EA',
            template: function(element, attrs) { // geen dependency injection...
                if(attrs.myHref) {
                    return '<a href="' + attrs.myHref + '">' + attrs.myText + '</a>';
                }

                return '<button>' + attrs.myText + '</button>';
            },
            controller: 'MyButtonController',
            controllerAs: 'vm'
        }

    }


    MyButtonController.$inject = ['$scope', '$element', '$attrs', '$log'];
    function MyButtonController($scope, $element, $attrs, $log) {

        activate();

        ///////


        function activate() {

            $log.info($element);
            $log.info($attrs);

        }

    }



})();