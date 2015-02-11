var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    request     = require('superagent');

var userContactsByIdData = require('../data/userContactsById.json');

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

    app.post('/GroupDirectServices/ContactService.svc/GetUserContactsByUserId', function(req, res){
        res.status(200).json(userContactsByIdData);
    });
    app.get('/GroupDirectServices/*', serviceProxy);
    app.post('/GroupDirectServices/*', serviceProxy);
};
