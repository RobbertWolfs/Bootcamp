var todoRepo = (function() {
    'use strict';

    var todos = [];

    function init() {
        todos = util.store('todos-jquery');
    }

    function add(title) {
        var todo = {
            id: util.uuid(),
            title: title,
            completed: false
        };
        todos.push(todo);
        return todo;
    }

    function remove(index) {
        todos.splice(index, 1);
    }

    function get(id) {
        return todos[id];
    }

    function hasActiveItems() {
        return getList('active').length === 0;
    }

    function storeItems() {
         util.store('todos-jquery', todos);
    }

    function getList(filter) {
        if (filter === 'active') {
            return _getActiveTodos();
        }

        if (filter === 'completed') {
            return _getCompletedTodos();
        }

        return todos;
    }


    function _getActiveTodos() {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    }

    function _getCompletedTodos() {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }

    function store() {
        util.store('todos-jquery', todos);
    }

    function toggleAll(active) {
        todos.forEach(function (todo) {
            todo.completed = active;
        });
    }

    function destroyCompleted() {
        todos = getList('active');
    }

    function update(i, value) {
        if (value) {
            todos[i].title = value;
        } else {
            todos[i].splice(i, 1);
        }
    }

    return {
        init : init,
        add : add,
        remove : remove,
        get : get,
        getList : getList,
        store : store,
        toggleAll : toggleAll,
        storeItems : storeItems,
        destroyCompleted : destroyCompleted,
        update : update,
        hasActiveItems : hasActiveItems
    }
})();
