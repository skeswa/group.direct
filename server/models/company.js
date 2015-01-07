var Sequelize = require('sequelize');

var MODEL_ID = 'Company';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                name:                   Sequelize.STRING,
                addressLine1:           Sequelize.STRING,
                addressLine2:           Sequelize.STRING,
                city:                   Sequelize.STRING,
                zip:                    Sequelize.STRING,
                state:                  Sequelize.STRING,
                country:                Sequelize.STRING,
            });
        }
        return model;
    },
    relate: function(db) {
        var UserModel       = require('./user').model(db),
            CompanyModel    = module.exports.model(db);

        // A company has an admin
        CompanyModel.hasOne(UserModel, {
            as: 'admin'
        });
    }
};
