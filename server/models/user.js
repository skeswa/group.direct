var Sequelize = require('sequelize');

var MODEL_ID = 'User';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                firstName:              Sequelize.STRING,
                lastName:               Sequelize.STRING,
                userName:               Sequelize.STRING,
                password:               Sequelize.STRING,
                email: {
                    type:       Sequelize.STRING,
                    validate:   {
                        isEmail: true
                    }
                }
            });
        }
        return model;
    }
};
