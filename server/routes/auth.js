var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    passport    = require('passport');

var log     = require('../log');

exports.route = function(app) {
    app.get('/api/auth/me', function(req, res) {
        if (!req.user) {
            res.status(200).send({});
        } else {
            res.status(200).json({
                id:         req.user.id,
                userName:   req.user.userName,
                firstName:  req.user.firstName,
                lastName:   req.user.lastName
            });
        }
    });

    app.post('/api/auth/login', passport.authenticate('local'), function(req, res) {
        // Authentication succeeded
        return res.status(200).json({
            id:         req.user.id,
            userName:   req.user.userName,
            firstName:  req.user.firstName,
            lastName:   req.user.lastName
        });
    });
};