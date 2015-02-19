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
    }
};

module.exports = ProfileService;