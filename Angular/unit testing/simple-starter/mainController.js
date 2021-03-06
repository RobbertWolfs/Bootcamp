(function() {
	'use strict';

	angular
		.module("myApp")
		.controller("MainController", MainController);

	function MainController($scope, $location, customerService) {

        $scope.customers = [];
        $scope.addCustomer = addCustomer;
        $scope.message = 'hello world';

	    activate();

	    function activate() {
	        customerService.getCustomers()
                .then(function(customers) {
	                $scope.customers = customers;
	            });
	    }


		function close() {
			console.log('closed');
		}

	    function addCustomer() {
			$scope.customers.push( {
				name: $scope.newCustomer.name,
				city: $scope.newCustomer.city,
			});
            $location.path('/');
	    };
	};

})();
