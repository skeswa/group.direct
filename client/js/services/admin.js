var request = require('superagent');

var AdminService = {
    getCompanySignupRequests: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .get('/GroupDirectTestServices/CompanySignupService.svc/getcompanysignuprequests?userId='+userId+'&offset=0&limit=5&st='+sessionToken+'&status=1')
            // Submit the request
            .end(callback);
    },
    getCompanyList: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectTestServices/CompanySignupService.svc/getcompanylist')
            .send({
                userId: userId,
                status: 1,
                st: sessionToken
            })
            //Submit the request
            .end(callback);
    },
    acceptCompanySignupRequest: function(
        userId,
        requestId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectTestServices/CompanySignupService.svc/acceptcompanysignuprequest')
            .send({
                userId: userId,
                companySignupRequestId: requestId,
                st: sessionToken
            })
            //Submit the request
            .end(callback);
    },
    rejectCompanySignupRequest: function(
        userId,
        requestId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectTestServices/CompanySignupService.svc/rejectcompanysignuprequest')
            .send({
                userId: userId,
                companySignupRequestId: requestId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);

    },
    enableDisableCompany: function(
        companyId,
        action,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectTestServices/CompanySignupService.svc/enabledisblecompany')
            .send({
                companyId: companyId,
                action: action,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    }
};

module.exports = AdminService;