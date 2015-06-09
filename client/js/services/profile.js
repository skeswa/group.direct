var request = require('superagent');

var ProfileService = {
    getProfileInfo: function(
        userId,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/GetProfileInfo')
            .send({
                userId: userId,
                st: sessionToken
            })
            .end(callback);
    },
    saveProfileInfo: function(
        userId,
        firstName,
        lastName,
        email,
        phone,
        addressId,
        address1,
        address2,
        city,
        province,
        zip,
        country,
        sessionToken,
        callback) {
        // Build the request
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/SaveProfileInfo')
            .send({
                userModel: {
                    AddressId: addressId,
                    ContactNumber: phone,
                    Email: email,
                    FirstName: firstName,
                    Id: userId,
                    LastName: lastName
                },
                address: {
                    Address1: address1,
                    Address2: address2,
                    City: city,
                    Country: country,
                    State: province,
                    Zipcode: zip
                },
                st: sessionToken
            })
            .end(callback);
    },
    getCompanyById: function(
        companyId,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/CompanySignupService.svc/getcompanybyid')
            .send({
                companyId: companyId,
                st: sessionToken
            })
            .end(callback)
    },
//Apps screen services - move to separate file if it gets longer
    getApps: function(
        companyId,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/CompanyServices.svc/getcompanyassociatedapplication')
            .send({
                companyId: companyId,
                st: sessionToken
            })
            .end(callback)
    },
//Settings screen services - move to separate file if it gets longer
    updatePassword: function(
        userId,
        currentPassword,
        newPassword,
        sessionToken,
        callback) {
        request
            .post('/GroupDirectServices/ApheliaIUserService.svc/UpdatePassword')
            .send({
                userId: userId,
                currentPassword: currentPassword,
                newPassword: newPassword,
                st: sessionToken
            })
            .end(callback)
    }
};

module.exports = ProfileService;