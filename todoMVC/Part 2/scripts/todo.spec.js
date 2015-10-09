describe('todo service functions', function () {
    describe('gettings', function () {

        beforeEach(function() {
            todoRepo.init();
            todoRepo.add('testing Edit');
        });

        it('should get first item from list', function () {
            var result = todoRepo.get(0);
            expect(result).toEqual(jasmine.objectContaining({
                title: "testing Edit"
            }));
        });

        it('should add a second item to the list', function () {
            var todo = todoRepo.add('aaa');
            var list = todoRepo.getList();
            expect(list.length).toBe(2);
            expect(todo.title).toBe('aaa');
            expect(todo.completed).toBe(false);
            expect(todo.id.length > 5).toBe(true);
        });

        it('should remove the first item of the list', function () {
            todoRepo.remove(0);
            var list = todoRepo.getList();
            expect(list.length).toBe(0);
        });
    });
});

