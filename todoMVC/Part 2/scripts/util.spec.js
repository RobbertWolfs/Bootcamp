describe('util service functions', function () {
    describe('pluralize', function () {

        it('should transform word to words', function () {
            var result = util.pluralize(4, 'word');
            expect(result).toBe('words');
        });

        it('should transform a to a', function () {
            var result = util.pluralize(1, 'a');
            expect(result).toBe('a');
        });

        it('should transform 123 to 123s', function () {
            var result = util.pluralize(3, undefined);
            expect(result).toBe(undefined);
        });
    });
});