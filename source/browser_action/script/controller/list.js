time_tracker.controller('list_controller', function($scope, task_service) {

    $scope.trackTask = function(id) {
        task_service.startTracking(id);
    }
    
    $scope.init = function() {
    }();

});