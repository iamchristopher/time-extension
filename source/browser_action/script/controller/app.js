time_tracker.controller('app_controller', function($scope, $rootScope, $interval, task_service) {
    
    $scope.updateActiveTask = function() {
        $scope.active_task = task_service.getActiveTask();
    }

    $scope.updateTotalTaskTime = function() {
        $interval(function() {
            $scope.total_task_time = task_service.getTotalTaskTime();
        }, 1000);
    }

    $scope.init = function() {
        $rootScope.tasks = task_service.getTasks();
    }();

});