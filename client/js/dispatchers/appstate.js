var assign      = require('object-assign'),
    Dispatcher  = require('flux').Dispatcher;

var AppStateDispatcher = assign(new Dispatcher(), {
    events: {
        LOGGED_IN: 1
    },
    handleLoggedIn: function(sessionData) {
        this.dispatch({
            type: this.events.LOGGED_IN,
            sessionData: sessionData
        });
    },
});

module.exports = AppStateDispatcher;
