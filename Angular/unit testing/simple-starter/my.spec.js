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