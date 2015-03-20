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

    }
};

module.exports = ContactService;
