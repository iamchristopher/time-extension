time_tracker.controller('list_controller', function($scope, task_service) {

    $scope.trackTask = function(id) {
        task_service.setTaskAsActive(id);
    }
    
    $scope.init = function() {
    }();

});