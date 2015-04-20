time_tracker.factory('task_service', function($resource, $interval, $filter) {

    var service = {},
        _tasks = [],
        _timer = null;

    service.getTasks = function() {
        return _tasks.reverse();
    }

    service.addTask = function(data) {
        data.id = _tasks.length + 1;
        data.active = true;

        _tasks.push(data);

        this.setTaskAsActive(data.id);
    }

    service.setTaskAsActive = function(id) {
        var task = getTaskByID(id),
            active_task = this.getActiveTask();

        active_task.active = false;

        startTracking(id);
        task.active = true;
    }

    service.getActiveTask = function() {
        console.log('test')
        return $filter('filter')(_tasks, {
            active: true
        })[0];
    }

    function incrementTaskDuration(id) {
        var task = getTaskByID(id);
        task.duration++;
    }

    function getTaskByID(id) {
        return $filter('filter')(_tasks, {
            id: id
        })[0];
    }

    function startTracking(id) {
        if (_timer) {
            $interval.cancel(_timer);
            _timer = null;
        }

        _timer = $interval(function() {
            incrementTaskDuration(id);
        }, 1000)
    }

    function stopTracking(id) {
    }

    return service;

});