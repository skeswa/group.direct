var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter;

var AppStateDispatcher  = require('../dispatchers/appstate');

// The event types
var events = {
    EVENT_READY: 1
};
// Object representing current app state
var appState = {
    loggedIn: false,
    sessionData: undefined
};

var AppStateStore = assign({}, EventEmitter.prototype, {
    isLoggedIn: function() {
        return appState.loggedIn;
    },
    getSessionData: function() {
        return appState.sessionData;
    }
});

// Register for app state actions
AppStateDispatcher.register(function(action) {
    switch(action.type) {
        case AppStateDispatcher.events.LOGGED_IN:
            appState.sessionData = action.sessionData;
            appState.loggedIn = true;
            return true;
    }

    return false;
});

module.exports = AppStateStore;
