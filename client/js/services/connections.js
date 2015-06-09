var request = require('superagent');

var ContactService = {
    //search
    getUserByEmail: function(
        email,
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/GetUserByEmail')
            .send({
                email: email,
                userId: userId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    //Send Add Request to existing user:
    addContactRequest: function(
        requesterId,
        requesteeId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/addContactRequest')
            .send({
                RequesterId: requesterId,
                RequesteeId: requesteeId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    //Send Add Request to new user:
    sendInviteToEmail : function(
        requesterId,
        requesteeEmail,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/SendInviteToEmail')
            .send({
                requesterId: requesterId,
                requesteeEmail: requesteeEmail,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },
    getAddRequestsByUserId: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/GetAddRequestsByUserId')
            .send({
                userId: userId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);

    },
    getUserContactsByUserId: function(
        userId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/GetUserContactsByUserId')
            .send({
                userId: userId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);

    },
    approveDenyContactRequest: function(
        requestId,
        status,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/approvedenycontactrequest')
            .send({
                RequestId: requestId,
                status: status,
                st: sessionToken
            })
            //Submit the request
            .end(callback);
    },
    deleteContactByUserId: function(
        userId,
        contactId,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ContactService.svc/DeleteContactByUserId')
            .send({
                userId: userId,
                contactId: contactId,
                st: sessionToken
            })
            // Submit the request
            .end(callback);

    },
    //Get company users
    getCompanyUsers: function(
        companyId,
        userId,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/CompanyServices.svc/getcompanyusers')
            .send({
                companyId: companyId,
                userId: userId,
                st: sessionToken
            })
            .end(callback)
    },
    inviteWithPasscode: function(
        userId,
        companyId,
        email,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/CompanySignupService.svc/invitewithpasscode')
            .send({
                userId: userId,
                companyId: companyId,
                email: email,
                st: sessionToken
            })
            .end(callback)
    },
    removeCompanyUser: function(
        userId,
        adminId,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/CompanyServices.svc/deletecompanyuserbyid')
            .send({
                userId: userId,
                adminId: adminId,
                st: sessionToken
            })
            .end(callback)
    }
};

module.exports = ContactService;
