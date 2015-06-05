var assign      = require('object-assign'),
    Dispatcher  = require('flux').Dispatcher;

var AppStateDispatcher = assign(new Dispatcher(), {
    events: {
        LOGGED_IN:  1,
        LOGGED_OUT: 2
    },
    handleLoggedIn: function(sessionData) {
        this.dispatch({
            type: this.events.LOGGED_IN,
            sessionData: sessionData
        });
    },
    handleLoggedOut: function() {
        this.dispatch({
            type: this.events.LOGGED_OUT,
            sessionData: undefined
        });
    }
});

module.exports = AppStateDispatcher;
