var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    request     = require('superagent');

//Used for dummy service
var getDriversData = require('../data/getDrivers.json'),
    getVehiclesData = require('../data/getVehicles.json'),
    getStudentsData = require('../data/getStudents.json');

var log     = require('../log');

var REMOTE_SERVER_URL = 'http://54.200.112.228';

exports.route = function(app) {
    var serviceProxy = function(req, res) {
        var remoteRequest;
        if (req.method === 'GET') {
            remoteRequest = request.get(REMOTE_SERVER_URL + req.path);
            remoteRequest.query(req.query);
        } else {
            remoteRequest = request.post(REMOTE_SERVER_URL + req.path);
            console.log("URL " + REMOTE_SERVER_URL + req.path);
            remoteRequest.query(req.query);
            remoteRequest.send(req.body);
        }
        remoteRequest.end(function(remoteResponse) {
            res.status(remoteResponse.status).send(remoteResponse.body);
        });
    };
    //Used for dummy service
    app.post('/GroupDirectServices/SchoolBusService.svc/getDrivers', function(req, res){
        res.status(200).json(getDriversData);
    });
    app.post('/GroupDirectServices/SchoolBusService.svc/getVehicles', function(req, res){
        res.status(200).json(getVehiclesData);
    });
    app.post('/GroupDirectServices/SchoolBusService.svc/getStudents', function(req, res){
        res.status(200).json(getStudentsData);
    });
    app.get('/GroupDirectServices/*', serviceProxy);
    app.post('/GroupDirectServices/*', serviceProxy);
        app.get('/ApheliaBusConnectService/*', serviceProxy);
    app.post('/ApheliaBusConnectService/*', serviceProxy);
};
