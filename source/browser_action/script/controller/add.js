time_tracker.controller('add_controller', function($scope, $rootScope, task_service) {

    $scope.processTask = function() {
        if ($scope.new_task.$invalid) {
            return false;
        }

        var task_data = {
            name: $scope.new_task.name,
            notes: $scope.new_task.notes,
            duration: 0
        }

        addTask(task_data);
    }
    
    $scope.init = function() {
    }();

    function addTask(data) {
        task_service.addTask(data);
        $scope.updateActiveTask();
        $scope.updateTotalTaskTime();
    }

});