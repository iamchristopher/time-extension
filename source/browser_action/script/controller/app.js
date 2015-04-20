time_tracker.controller('app_controller', function($scope, $rootScope, task_service) {
    
    $scope.init = function() {
        $rootScope.tasks = task_service.getTasks();
    }();

});