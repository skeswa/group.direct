var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    request     = require('superagent');

//Used for dummy service
var getVehiclesData = require('../data/getVehicles.json'),
    getStudentsData = require('../data/getStudents.json');

var log     = require('../log');

var REMOTE_SERVER_URL = 'http://54.200.112.228',
    GOOGLE_API_SERVER_URL = 'https://maps.googleapis.com';

exports.route = function(app) {
    var serviceProxy = function(req, res) {
        var remoteRequest;
        if (req.method === 'GET') {
            remoteRequest = request.get(REMOTE_SERVER_URL + req.path);
            remoteRequest.query(req.query);
        } else {
            remoteRequest = request.post(REMOTE_SERVER_URL + req.path);
            remoteRequest.query(req.query);
            remoteRequest.send(req.body);
        }
        remoteRequest.end(function(remoteResponse) {
            res.status(remoteResponse.status).send(remoteResponse.body);
        });
    };
    var googleMapsProxy = function(req, res) {
        var gApiRequest;
        if (req.method === 'GET') {
            gApiRequest = request.get(GOOGLE_API_SERVER_URL + req.path);
            gApiRequest.query(req.query);
        } else {
            gApiRequest = request.post(GOOGLE_API_SERVER_URL + req.path);
            gApiRequest.query(req.query);
            gApiRequest.send(req.body);
        }
        console.log("gApiRequest", GOOGLE_API_SERVER_URL + req.path);
        gApiRequest.end(function(remoteResponse) {
            res.status(remoteResponse.status).send(remoteResponse.body);
        });
    };
    //Used for dummy service
    app.post('/GroupDirectTestServices/SchoolBusService.svc/getVehicles', function(req, res){
        res.status(200).json(getVehiclesData);
    });
    app.post('/GroupDirectTestServices/SchoolBusService.svc/getStudents', function(req, res){
        res.status(200).json(getStudentsData);
    });

    app.get('/GroupDirectTestServices/*', serviceProxy);
    app.post('/GroupDirectTestServices/*', serviceProxy);
    app.get('/ApheliaBusConnectTestService/*', serviceProxy);
    app.post('/ApheliaBusConnectTestService/*', serviceProxy);
    app.get('/maps/api/*', googleMapsProxy);
};