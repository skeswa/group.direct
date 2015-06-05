var request = require('superagent');

var SchoolBusService = {
    getRoutes: function(
        sessionToken,
        companyId,
        callback) {
        // Build the request
        request
            .post('/ApheliaBusConnectService/BusConnectService.svc/getallactiveroutes')
            .send({
                st: sessionToken,
                companyId: companyId
            })
            // Submit the request
            .end(callback);
    },
    addRoute: function(
        routeName,
        companyId,
        routePoints,
        sessionToken,
        callback) {
            request
                .post('/ApheliaBusConnectService/BusConnectService.svc/addroute')
                .send({
                    route:
                        {
                            Name: routeName,
                            Description: '',
                            CompanyId: companyId
                        },
                    routePointList: routePoints,
                    st: sessionToken
                })
                .end(callback)
    },
    saveIntermediatePointsOnRoute: function(
        routeId,
        intermediatePoints,
        sessionToken,
        callback) {
            request
                .post('/ApheliaBusConnectService/BusConnectService.svc/saveintermediatepoints')
                .send({
                    routeId: routeId,
                    intermediatePoints: intermediatePoints,
                    st: sessionToken
                })
                .end(callback)
    },
    updateRoute: function(
        routeId,
        routeName,
        companyId,
        routePoints,
        sessionToken,
        callback) {
            request
                .post('/ApheliaBusConnectService/BusConnectService.svc/editroute')
                .send({
                    route:
                        {
                            Id: routeId,
                            Name: routeName,
                            Description: '',
                            CompanyId: companyId
                        },
                    routePointList: routePoints,
                    st: sessionToken
                })
                .end(callback)
    },
    deleteRoute: function(
        routeId,
        sessionToken,
        callback) {
            request
                .post('/ApheliaBusConnectService/BusConnectService.svc/deleteroute')
                .send({
                    routeId: routeId,
                    st: sessionToken
                })
                .end(callback);
    },
    addStop: function(
        street1,
        city,
        zip,
        state,
        country,
        lat,
        lng,
        companyId,
        createdOn,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/ApheliaBusConnectService/BusConnectService.svc/addlocation')
            .send({
                location: {
                        Address: street1,
                        Street1: street1,
                        Zip: zip,
                        City: city,
                        State: state,
                        Country: country,
                        Longitude: lng,
                        Latitude: lat,
                        LocationSourceTypeId: 3,
                        CompanyId: companyId,
                        CreatedOn: createdOn
                    },
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },

    getCoordinates: function(
        address,
        callback) {
        // Build the request
        request
            .get('/maps/api/geocode/json?address='+address)
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