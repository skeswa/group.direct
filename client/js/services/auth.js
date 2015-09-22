var request = require('superagent');

var AuthService = {
    getSession: function(callback) {
        request
            .get('/api/auth/me')
            .end(callback);
    },
    login: function(user, pass, callback) {
        request
            .post('/GroupDirectServices/SignupService.svc/login')
            .send({
                userName: user,
                password: pass,
                platformId: 1
            })
            .end(callback);
    },
    logout: function(userId, callback) {
        request
            .post('/GroupDirectServices/SignupService.svc/logout')
            .send({
                userId: userId
            })
            .end(callback);
    },
    requestResetPassword: function(email, callback) {
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/RequestResetPassword')
            .send({
                email: email
            })
            .end(callback);
    },
    resetPassword: function(token, pass, callback) {
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/ResetPassword')
            .send({
                token: token,
                password: pass
            })
            .end(callback);
    }
};

module.exports = AuthService;