(function () {

    'use strict';

    angular.module('ngApp')
        .directive('myDirective', myDirective)
        .controller('MyDirectiveController', MyDirectiveController);


    function myDirective() {

        return {
            restrict: 'EA', // E(lement), A(attribute), C(lass), (co)M(ment), => je kan ze enkel schrijven of combineren
            //template : '<div class="something">this is my directive content</div>',
            templateUrl: 'templates/myDirective.html',
            //template: function(element, attrs) { // geen dependency injection...
            //        if(attrs.type == 'link') {
            //            return '<a>...</a>';
            //        }
            //
            //        return '<button>...</button>';
            //},
            //controller: 'MyDirectiveController',
            //controllerAs: 'vm',

            link : function(scope, elements, attrs) { // geen dependency injection...
                element.text('hello');
            },
            transclude : true // De content van het element wordt via ng-transclude overgenomen en in de template gestoken
            //replace : true // dit verwijderd de elementen of divs met attributen in html door de template, wordt vooral gebruikt bij elementen en niet bij attributen
        }

    }


    MyDirectiveController.$inject = ['$scope', '$element', '$attrs', '$log'];
    function MyDirectiveController($scope, $element, $attrs, $log) {

        var vm = this;

        vm.message = attrs.text;


        activate();


        ///////


        function activate() {

            $log.info($element);
            $log.info($attrs);
            $log.info($attrs.myAttr);

        }

    }

})();