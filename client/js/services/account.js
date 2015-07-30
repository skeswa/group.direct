var request = require('superagent');

var AccountService = {
    associateApps: function(
        apps,
        companyId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/CompanyServices.svc/associateappstocompany')
            // Submit the request
            .send({
                    appIds: apps,
                    companyId: companyId,
                    st: sessionToken
                })
            .end(callback)
    }
};

module.exports = AccountService;
