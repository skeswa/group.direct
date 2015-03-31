var Sequelize = require('sequelize');

var MODEL_ID = 'Organization';

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
    }
};
