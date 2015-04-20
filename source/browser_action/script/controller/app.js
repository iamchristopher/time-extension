time_tracker.controller('app_controller', function($scope, $rootScope, task_service) {
    
    $scope.updateActiveTask = function() {
        $scope.active_task = task_service.getActiveTask();
    }

    $scope.init = function() {
        $rootScope.tasks = task_service.getTasks();
    }();

});