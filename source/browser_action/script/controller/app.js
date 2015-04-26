time_tracker.controller('app_controller', function($scope, $rootScope, $interval, task_service) {
    
    $rootScope.updateActiveTask = function() {
        task_service.getActive()
            .then(function(active_task) {
                $scope.active_task = active_task[0];
            });
    }

    $scope.updateTotalTaskTime = function() {
        $interval(function() {
            $scope.total_task_time = task_service.getTotalTaskTime();
        }, 1000);
    }

    $scope.init = function() {
        $scope.updateActiveTask();
    }();

});