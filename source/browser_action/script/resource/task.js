time_tracker.factory('task_service', function($resource, $interval, $filter, $indexedDB) {

    var service = {},
        _tasks = [],
        _timer = null;

    service.getTasks = function() {
        return $indexedDB
            .openStore('task', function(store) {
                return store.getAll()
            });
    }

    service.addTask = function(data) {
        if (!data.hasOwnProperty('active')) {
            data.active = false;
        }

        if (!data.hasOwnProperty('duration')) {
            data.duration = 0;
        }

        $indexedDB.openStore('task', function(store) {
            store
                .insert(data)
                .then(function(e) {
                    var insert_id = e[0];
                    console.log('INSERT:', insert_id);

                    service.setTaskAsActive(insert_id);
                });
        });

    }

    service.setTaskAsActive = function(id) {
        var task = getTaskByID(id),
            active_task = this.getActiveTask();

        active_task.active = false;

        startTracking(id);
        task.active = true;
    }

    service.getActiveTask = function() {
        return $filter('filter')(_tasks, {
            active: true
        })[0];
    }

    service.getTotalTaskTime = function() {
        var time = 0;

        _tasks.filter(function(task) {
            time += task.duration;
        });

        return time;
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