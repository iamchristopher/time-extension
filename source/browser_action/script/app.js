var time_tracker = angular.module('time_tracker', [
    'ngResource',
    'ui.router',
    'indexedDB'
]);

time_tracker.config(function($stateProvider, $urlRouterProvider, $indexedDBProvider) {

    $urlRouterProvider
        .otherwise('/app/add');

    $stateProvider
        .state('app', {
            abstract: true,
            controller: 'app_controller',
            templateUrl: 'view/template.html',
            url: '/app'
        })
            .state('app.add', {
                controller: 'add_controller',
                url: '/add',
                templateUrl: 'view/add.html'
            })
            .state('app.list', {
                controller: 'list_controller',
                url: '/list',
                templateUrl: 'view/list.html'
            });

    $indexedDBProvider
        .connection('ourtime')
        .upgradeDatabase(1, function(event, database, transaction) {

            // Create data store
            var data_store = database.createObjectStore('task', {
                keyPath: 'id',
                autoIncrement: true
            });

            // Add indexes
            data_store.createIndex('active_index', 'active', {
                unique: false
            });
        });

});