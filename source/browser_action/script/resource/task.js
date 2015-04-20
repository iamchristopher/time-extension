time_tracker.factory('task_service', function($resource, $q) {

    var service = {},
        _tasks = [];

    service.getTasks = function() {
        return _tasks.reverse();
    }

    service.addTask = function(data) {
        _tasks.push(data);
    }

    return service;

});