var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    request     = require('superagent');

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
            remoteRequest.query(req.query);
            remoteRequest.send(req.body);
        }
        remoteRequest.end(function(remoteResponse) {
            if (remoteResponse.ok) {
                res.status(200).send(remoteResponse.body);
            } else {
                res.status(500).send(remoteResponse.text);
            }
        });
    };

    app.get('/GroupDirectServices/*', serviceProxy);
    app.post('/GroupDirectServices/*', serviceProxy);
};
