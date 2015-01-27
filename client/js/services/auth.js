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
                password: pass
            })
            .end(callback);
    }
};

module.exports = AuthService;