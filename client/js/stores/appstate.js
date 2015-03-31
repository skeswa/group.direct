var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter;

var AppStateDispatcher  = require('../dispatchers/appstate');

var SESSION_DATA_LOCAL_STORAGE_KEY  = 'groupDirectSessionData',
    SESSION_TIME_LIMIT              = 1000 * 60 * 60 * 24 * 7;  // Expires after a week

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
            var localData = this.fetchSessionDataFromLocalStorage();
            if (localData) {
                appState.loggedIn = true;
                appState.sessionData = localData;
            }
        }
        return appState.loggedIn;
    },
    getSessionData: function() {
        if (!appState.sessionData) {
            var localData = this.fetchSessionDataFromLocalStorage();
            if (localData) {
                appState.loggedIn = true;
                appState.sessionData = localData;
                return localData;
            } else {
                return {};
            }
        } else {
            return appState.sessionData;
        }
    },
    fetchSessionDataFromLocalStorage: function() {
        // check local storage
        var payloadString = localStorage.getItem(SESSION_DATA_LOCAL_STORAGE_KEY);
        if (payloadString && payloadString !== '' && payloadString !== 'undefined') {
            try {
                var payload = JSON.parse(payloadString);
                if (!payload.timeStamp || ((new Date()).getTime() - payload.timeStamp > SESSION_TIME_LIMIT)) {
                    localStorage.setItem(SESSION_DATA_LOCAL_STORAGE_KEY, '');
                    return undefined;
                } else {
                    return payload;
                }
            } catch(err) {
                localStorage.setItem(SESSION_DATA_LOCAL_STORAGE_KEY, '');
                return undefined;
            }
        } else {
            return undefined;
        }
    }
});

// Register for app state actions
AppStateDispatcher.register(function(action) {
    switch(action.type) {
        case AppStateDispatcher.events.LOGGED_IN:
            var sessionData = action.sessionData;
            sessionData.timeStamp = (new Date()).getTime();

            appState.sessionData = sessionData;
            appState.loggedIn = true;
            localStorage.setItem(SESSION_DATA_LOCAL_STORAGE_KEY, JSON.stringify(sessionData));
            return true;
        case AppStateDispatcher.events.LOGGED_OUT:
            appState.sessionData = undefined;
            appState.loggedIn = false;
            localStorage.setItem(SESSION_DATA_LOCAL_STORAGE_KEY, '');
            return true;
    }

    return false;
});

module.exports = AppStateStore;
