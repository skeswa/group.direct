var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter;

var AppStateDispatcher  = require('../dispatchers/appstate');

var SESSION_DATA_LOCAL_STORAGE_KEY = 'groupDirectSessionData';

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
        if (!appState.sessionData) {
           this.fetchSessionDataFromLocalStorage();
        }
        return appState.loggedIn;
    },
    getSessionData: function() {
        if (!appState.sessionData) {
           return this.fetchSessionDataFromLocalStorage();
        }
        return appState.sessionData;
    },
    fetchSessionDataFromLocalStorage: function() {
        // check local storage
        var payloadString = localStorage.getItem(SESSION_DATA_LOCAL_STORAGE_KEY);
        if (payloadString) {
            var payload = JSON.parse(payloadString);
            appState.sessionData = payload;
            appState.loggedIn = true;
            return payload;
        }
    }
});

// Register for app state actions
AppStateDispatcher.register(function(action) {
    switch(action.type) {
        case AppStateDispatcher.events.LOGGED_IN:
            appState.sessionData = action.sessionData;
            appState.loggedIn = true;
            localStorage.setItem(SESSION_DATA_LOCAL_STORAGE_KEY, JSON.stringify(appState.sessionData));
            return true;
    }

    return false;
});

module.exports = AppStateStore;
