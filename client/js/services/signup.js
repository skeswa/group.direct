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
    },
    activateUserSignupRequest: function(
        email,
        activationCode,
        callback){
        // Build the request
        request
            .post('/GroupDirectServices/SignupService.svc/activateusersignuprequest')
            .send({
                    email: email,
                    code: activationCode
            })
            // Submit the request
            .end(callback);
    },
    companySignupRequest: function(
        firstName,
        lastName,
        userName,
        password,
        email,
        newCompanyName,
        newCompanyEmail,
        newCompanyAddrLine1,
        newCompanyAddrLine2,
        newCompanyCity,
        newCompanyState,
        newCompanyCountry,
        newCompanyZip,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/CompanySignupService.svc/docompanysignuprequest')
            .send({
                signUpModel: {
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Password: password,
                    EmailAddress: email,
                    CompanyName: newCompanyName,
                    CompanyEmail: newCompanyEmail,
                    CompanyAddress1: newCompanyAddrLine1,
                    CompanyAddress2: newCompanyAddrLine2,
                    CompanyCity: newCompanyCity,
                    CompanyState: newCompanyState,
                    CompanyCountry: 221,
                    CompanyZip: newCompanyZip
                }
            })
            // Submit the request
            .end(callback);
    },
    signupForExistingCompany: function(
        firstName,
        lastName,
        userName,
        email,
        password,
        invitationCode,
        callback){
        // Build the request
        request
            .post('/GroupDirectServices/CompanySignupService.svc/dousersignupforexistingcompany')
            .send({
                signUpModel: {
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Password: password,
                    EmailAddress: email
                },
                invitationCode: invitationCode
            })
            // Submit the request
            .end(callback);
    }
};

module.exports = SignupService;
