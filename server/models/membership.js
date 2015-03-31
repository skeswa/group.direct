var Sequelize = require('sequelize');

var MODEL_ID = 'Membership';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                role:   Sequelize.ENUM(
                    'OWNER',
                    'ADMIN',
                    'MEMBER'
                )
            });
        }
        return model;
    },
    relate: function(models) {
        var OrganizationModel   = models.Organization,
            UserModel           = models.User,
            MembershipModel     = models[MODEL_ID];

        // A user has many companies
        MembershipModel.belongsTo(OrganizationModel, {
            as: 'company'
        });
        // A user is an owner of a company
        MembershipModel.belongsTo(UserModel, {
            as: 'user'
        });
    }
};
