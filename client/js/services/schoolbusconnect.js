var request = require('superagent');

var SchoolBusService = {
    getRoutes: function(
            sessionToken,
            callback) {
            // Build the request
            request
                .post('/ApheliaBusConnectService/BusConnectService.svc/getallactiveroutes')
                .send({
                    st: sessionToken
                })
                // Submit the request
                .end(callback);
    },
    getDrivers: function(
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/GetListOfUsersByRole')
            .send({
                roleId: 7,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },

    //Vehicles
    getVehicles: function(
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/ApheliaBusConnectService/BusConnectService.svc/getallvehicle')
            .send({
                companyId: 1,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    addVehicle: function(
        name,
        model,
        registration,
        description,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/ApheliaBusConnectService/BusConnectService.svc/createvehicle')
            .send({
                vehicle:
                    {
                        Name: name,
                        ModelNo: model,
                        RegistrationNo: registration,
                        Description: description,
                        CompanyId: 1
                    },
                st: sessionToken
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