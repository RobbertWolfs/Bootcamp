var expect = chai.expect;

var person = {
    id: 1,
    name: 'Foo Bar',
    email: 'foo.bar@baz.com',
    age: 26,
    birthDate: new Date(1988, 9, 13),
    married: false
};


var emptyPerson = {
    name : 'Robbert Wolfs',
    email : 'robbert@test.be'
};


describe('detailController', function () {

    beforeEach(module('app'));

    var ctrl, $httpBackend, $scope;

    beforeEach(inject(function ($rootScope, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/api/persons/1').respond(person);
        //$rootScope.$digest();
    }));


    it('should get person on ctrl', inject(function ($controller) {
        $httpBackend.expectGET('http://localhost:8080/api/persons/1');

        ctrl = $controller('DetailController', {
            $routeParams: {
                id: 1
            }
        });

        $httpBackend.flush();
        expect(ctrl.person).to.be.a('object');
        expect(ctrl.person).to.deep.equal(person);
    }));

    it('should return object when no id', inject(function ($controller) {
        ctrl = $controller('DetailController', {
            $routeParams: {}
        });

        expect(ctrl.person).to.be.a('object');
    }));

    it('should submit the form and add a person', inject(function ($controller, $location) {
        $httpBackend.expectPOST('http://localhost:8080/api/persons').respond(person);

        var spy = sinon.spy($location, 'path');

        ctrl = $controller('DetailController', {
            $routeParams: {},
            $location : $location
        });

        ctrl.person = emptyPerson;

        ctrl.submitForm(true);

        $httpBackend.flush();

        expect(spy).to.have.been.calledWith('/list');

    }));

    xit('should submit the form and update a person', inject(function ($controller) {
        $httpBackend.expectPUT('http://localhost:8080/api/persons/1').respond(person);

        var spy = sinon.spy($location, 'path');

        ctrl = $controller('DetailController', {
            $routeParams: {  id : 1},
            $location : $location
        });

        ctrl.person = person;

        ctrl.submitForm(true);

        $httpBackend.flush();

        expect(spy).to.have.been.calledWith('/list');
    }));


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});





