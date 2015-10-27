var expect = chai.expect;

describe('listController', function() {

    beforeEach(module('app'));

    var ctrl, $httpBackend, $scope;

    var persons = [
        {
            id: 1,
            name: 'Foo Bar',
            email: 'foo.bar@baz.com',
            age: 26,
            birthDate: new Date(1988, 9, 13),
            married: false
        },
        {
            id: 2,
            name: 'Robbert Wolfs',
            email: 'robbert.bar@baz.com',
            age: 22,
            birthDate: new Date(1988, 9, 13),
            married: true
        }
    ];

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, personService) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:8080/api/persons').respond(persons);
        ctrl = $controller('ListController', {
            personService: personService
        });
    }));


    it('should place persons on ctrl', function() {
        $httpBackend.expectGET('http://localhost:8080/api/persons');
        $httpBackend.flush();
        expect(ctrl.persons).to.be.a('array');
        expect(ctrl.persons).to.deep.equal(persons);
        expect(ctrl.persons.length).to.equal(2);
    });

    it('should remove person 1 on ctrl', function() {
        $httpBackend.expectDELETE('http://localhost:8080/api/persons/1').respond(persons[0]);
        ctrl.removePerson(persons[0]);
        $httpBackend.flush();

        expect(ctrl.persons).to.be.a('array');
        expect(ctrl.persons.length).to.equal(1);
    });


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});