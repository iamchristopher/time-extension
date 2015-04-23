time_tracker.controller('list_controller', function($scope, task_service) {

    $scope.trackTask = function(id) {
        task_service.setTaskAsActive(id);
        $scope.updateActiveTask();
    }

    $scope.removeTask = function(id) {
        task_service.removeByID(id)
            .then(function(e) {
                refreshTaskList();
            });
    }
    
    $scope.init = function() {
        refreshTaskList();
    }();

    function refreshTaskList() {
        task_service
            .getTasks()
                .then(function(tasks) {
                    $scope.tasks = tasks;
                });
    }

});