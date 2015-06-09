var request = require('superagent');

var AuthService = {
    getSession: function(callback) {
        request
            .get('/api/auth/me')
            .end(callback);
    },
    login: function(user, pass, callback) {
        request
            .post('/GroupDirectTestServices/SignupService.svc/login')
            .send({
                userName: user,
                password: pass
            })
            .end(callback);
    },
    logout: function(userId, callback) {
        request
            .post('/GroupDirectTestServices/SignupService.svc/logout')
            .send({
                userId: userId
            })
            .end(callback);
    },
    requestResetPassword: function(email, callback) {
        request
            .post('/GroupDirectTestServices/ApheliaIUserService.svc/RequestResetPassword')
            .send({
                email: email
            })
            .end(callback);
    },
    resetPassword: function(token, pass, callback) {
        request
            .post('/GroupDirectTestServices/ApheliaIUserService.svc/ResetPassword')
            .send({
                token: token,
                password: pass
            })
            .end(callback);
    }
};

module.exports = AuthService;