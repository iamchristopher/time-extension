var time_tracker = angular.module('time_tracker', [
    'ngResource',
    'ui.router'
]);

time_tracker.config(function($stateProvider, $urlRouterProvider) {

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

});