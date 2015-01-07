var assign      = require('object-assign'),
    Dispatcher  = require('flux').Dispatcher;

var AppStateDispatcher = assign(new Dispatcher(), {
    events: {
        HEADER_LOADED: 1,
        SESSION_DATA_LOADED: 2,
        SPLASH_LOADED: 3
    },
    handleHeaderLoaded: function() {
        this.dispatch({
            type: this.events.HEADER_LOADED
        });
    },
    handleSessionDataLoaded: function(sessionData) {
        this.dispatch({
            type: this.events.SESSION_DATA_LOADED,
            sessionData: sessionData
        });
    },
    handleSplashLoaded: function() {
        this.dispatch({
            type: this.events.SPLASH_LOADED
        });
    }
});

module.exports = AppStateDispatcher;