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


describe('controller', function() {

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


describe('directive ehSimple', function() {

    beforeEach(module('myApp'));

    var element, $scope;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.message = 'Hello';
        element = angular.element('<div eh-simple>{{ message }}</div>');
        $compile(element)($scope); // belangrijke lijn
        $rootScope.$digest(); // belangrijke lijn
    }));

    it('should equal "hello"', function() {
        console.log('element simple', element.prop('outerHTML'))
        expect(element.html()).to.equal('Hello');
    });

    it('should add a class of plain"', function() {
        expect(element.hasClass('plain')).to.equal(true);
    })
});



describe('directive ehTempl', function() {

    beforeEach(module('myApp'));
    beforeEach(module('ehTempl.tpl.html')); // deze module heeft dezelfde naam als de template

    var element, $scope;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();
        element = angular.element('<eh-templ></eh-templ>');
        $compile(element)($scope); // belangrijke lijn
        $rootScope.$digest(); // belangrijke lijn
    }));

    it('should equal "hello"', function() {
        console.log('element tpl', element.prop('outerHTML'));
        expect(element.find('div').text()).to.equal('--hello--');
        expect(element.find('div')).to.have.class('tpl'); // dit is van jquery-chai
    });

});




describe('directive ehAlert', function() {

    beforeEach(module('myApp'));
    beforeEach(module('ehAlert.tpl.html')); // deze module heeft dezelfde naam als de template

    var element, $scope, $compile;
    beforeEach(inject(function(_$compile_, $rootScope) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
    }));

    function generate(string) {
        var element = angular.element(string);
        $compile(element)($scope); // belangrijke lijn
        $scope.$digest(); // belangrijke lijn

        return element;
    }

    it('should equal to "Dit is gelukt hoor" ', function() {
        var content = 'Dit is gelukt hoor';
        var element = generate('<div eh-alert type-alert="success">' + content + '</div>');
        expect(element.find('div').text()).to.equal(content);
    });

    it('should equal have class alert-success', function() {
        var element = generate('<div eh-alert type-alert="success">Er heeft</div>');
        expect(element.find('div')).to.have.class('alert-success'); // dit is van jquery-chai
    });

    it('should equal have class alert-danger', function() {
        var element = generate('<div eh-alert type-alert="danger">Er heeft</div>');
        expect(element.find('div')).to.have.class('alert-danger'); // dit is van jquery-chai
    });

    it('should equal have class alert-info', function() {
        var element = generate('<div eh-alert type-alert="info">Er heeft</div>');
        expect(element.find('div')).to.have.class('alert-info'); // dit is van jquery-chai
    });

    it('should close the alert', function() {
        var element = generate('<div eh-alert type-alert="info" close="close()">Er heeft</div>');
        expect(element.find('div')).to.have.class('alert-info'); // dit is van jquery-chai
    });

});
