time_tracker.factory('task_service', function($resource, $q) {

    var service = {},
        _tasks = [];

    service.getTasks = function() {
        // for (var i = 0; i < 5; i++) {
        //     _tasks.push({
        //         id: i,
        //         name: 'Making time tracking extension',
        //         elapsed_time: '--:--:--'
        //     });
        // }

        return _tasks;
    }

    return service;

})