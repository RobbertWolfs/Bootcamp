(function () {

    'use strict';

    angular
        .module('myApp') // indien geen extra dependencies : lege [] is verplicht, anders loopt het mis

        // wanneer je een provider gebruikt
        .config(function(userServiceProvider) {
            userServiceProvider.setBasePath('/api/');
            userServiceProvider.setPageSize(20);
        });

})();

