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

    service.getTaskByID = function(id) {
        return $indexedDB.openStore('task', function(store) {
            return store.find(id);
        });
    }

    service.getTaskByID = function(id) {
        return $indexedDB.openStore('task', function(store) {
            return store.find(id);
        });
    }

    service.addTask = function(data) {
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
        $indexedDB.openStore('task', function(store) {

            // Get any tasks that currently have the active flag
            // so we can disable them
            store.findWhere(
                store.query().$index('active').$eq(1)
            )
                .then(function(tasks) {
                    if (tasks.length === 0) {
                        return;
                    }

                    tasks.forEach(function(task) {
                        task.active = 0;
                    });

                    store.upsert(tasks);
                });

            // Set the new task as active
            store.find(id)
                .then(function(task) {
                    task.active = 1;
                    store.upsert(task);
                });

        });
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