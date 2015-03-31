var AppStateStore = require('../stores/appstate');

var AuthMixin = {
    statics: {
        willTransitionTo: function(transition) {
            if (!AppStateStore.isLoggedIn()) {
                transition.redirect('signin');
            }
        }
    }
};

module.exports = AuthMixin;
