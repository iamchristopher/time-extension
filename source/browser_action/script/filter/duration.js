time_tracker.filter('duration', function() {

    return function(input) {
        if (isNaN(input)) {
            input = 0;
        }

        var s = input % 60,
            m = Math.floor(input / 60) % 60,
            h = Math.floor(input / (60 * 60));

        return  (h > 0 ? (h + 'h ') : '') + (m > 0 ? (m + 'm ') : '') + s + 's';
    };

});