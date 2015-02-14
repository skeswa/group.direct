var request = require('superagent');

var ContactService = {
    getUserByEmail: function(
        email,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/SignupService.svc/GetUserByEmail')
            .send({
                email: email,
                st: sessionToken
            })
            // Submit the request
            .end(callback);
    },
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
