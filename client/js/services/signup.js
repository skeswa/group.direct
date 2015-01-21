var request = require('superagent');

var SignupService = {
    userSignupRequest: function(
        firstName,
        lastName,
        userName,
        password,
        gender,
        email,
        dob,
        phone,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/SignupService.svc/usersignuprequest')
            .send({
                userSignupRequest: {
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Password: password,
                    Gender: gender,
                    EmailAddress: email,
                    DOB: dob,
                    Phone: phone
                }
            })
            // Submit the request
            .end(callback);
    }
};

module.exports = SignupService;
