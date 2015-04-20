time_tracker.factory('task_service', function($resource, $interval, $filter) {

    var service = {},
        _tasks = [],
        _timer = null;

    service.getTasks = function() {
        return _tasks.reverse();
    }

    service.addTask = function(data) {
        data.id = _tasks.length + 1;
        _tasks.push(data);
        this.startTracking(data.id);
    }

    service.startTracking = function(id) {
        if (_timer) {
            $interval.cancel(_timer);
            _timer = null;
        }

        _timer = $interval(function() {
            incrementTaskDuration(id);
        }, 1000)
    }

    service.stopTracking = function() {
    }

    function incrementTaskDuration(id) {
        var task = $filter('filter')(_tasks, {id: id})[0];
        task.duration++;
    }

    return service;

});