var expect = chai.expect;

describe('module to test', function() {

    //beforeEach(function() {
    //    //angular.mock.module('app'); // is 1 manier
    //    //module('app'); // is 2de manier
    //});

    //var $scope, $rootScope; // je kan ze zoals hier als global vars zetten of anders kan je gebruik maken van this.
    var upperFilter;
    beforeEach(module('myApp')); // is 3de manier

    // zodat we aan alles van angular geraken via de rootScope
    beforeEach(inject(function(_$rootScope_, _upperFilter_) { // door er bv _$rootScope_ van te maken kan je wel dezelfde vars gebruiken
        // init test here
        //$rootScope = _$rootScope_;
        //$scope = $rootScope.$new();
        //$scope.name = 'test';
        //$rootScope.message = 'hello';

        upperFilter = _upperFilter_;
    }));

    it('should make input uppercase', function() {
        expect(upperFilter('hello')).to.equal('HELLO');
    });


});


describe('module to test', function() {

    beforeEach(module('myApp'));

    var ctrl, $scope;
    beforeEach(inject(function($controller, $rootScope, $location, customerService, $q) {
        $scope = $rootScope;

        var customers = [
            { "name": "Dave Jones", "city": "Phoenix"},
            { "name": "Jamie Riley", "city": "Atlanta"}
        ];

        var stub = sinon.stub(customerService, 'getCustomers')
            .returns($q.resolve(customers));

        ctrl = $controller('MainController', {
            $scope : $scope,
            $location : $location,
            customerService : customerService
        });

        $scope.$digest(); // moet je hier oproepenen anders wordt deze digest niet getriggerd

    }));

    it('should place message on scope', function() {
        expect($scope.message).to.equal('hello world');
    });

    it('should place customers on scope', function() {

        expect($scope.customers).to.be.a('array');
        expect($scope.customers.length).to.equal(2);
    });

    it('should place a new customer on customer list', function() {

        //arrange
        $scope.newCustomer = {
            name : 'bdelen',
            city : 'antwerp'
        };

        //act
        $scope.addCustomer();

        //assert
        expect($scope.customers).to.be.a('array');
        expect($scope.customers.length).to.equal(3);



    });

});


describe('service', function() { // describe.only zorgt ervoor dat enkel dit wordt gerunt en niet alle describes

    beforeEach(module('myApp'));

    var customerService, $httpBackend;

    beforeEach(inject(function(_customerService_, _$httpBackend_) {
        customerService = _customerService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return customers', function() { // it.only zorgt ervoor dat enkel dit wordt gerunt en niet alle its
        //arrange

        var customers = [
            { "name": "Dave Jones", "city": "Phoenix"},
            { "name": "Jamie Riley", "city": "Atlanta"}
        ];

        $httpBackend.whenGET("data.json")
            .respond(customers);

        //act
        customerService.getCustomers()
            .then(function(customers) {
                expect(customers).to.be.a('array');
                expect(customers.length).to.equal(2);
            });

        //assert
        $httpBackend.flush();

    });

    afterEach(function() { //  dit zorgt ervoor dat er geen extra requests gebeuren die je vergeten bent te testen
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    });
});
