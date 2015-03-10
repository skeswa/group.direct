var request = require('superagent');

var SchoolBusService = {
    getRoutes: function(
            userId,
            sessionToken,
            callback) {
            // Build the request
            request
                .post('/GroupDirectServices/SchoolBusService.svc/getRoutes')
                .send({
                    userId: userId,
                    sessionToken: sessionToken
                })
                // Submit the request
                .end(callback);
    },
    getDrivers: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/SchoolBusService.svc/getDrivers')
            .send({
                userId: userId,
                sessionToken: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    getVehicles: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/SchoolBusService.svc/getVehicles')
            .send({
                userId: userId,
                sessionToken: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    getStudents: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/SchoolBusService.svc/getStudents')
            .send({
                userId: userId,
                sessionToken: sessionToken
            })
            // Submit the request
            .end(callback);
    }
};

module.exports = SchoolBusService;