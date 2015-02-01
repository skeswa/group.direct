var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter;

var UIStateDispatcher  = require('../dispatchers/uistate');

// The event types
var events = {
    EVENT_SESSION_PANEL_VISIBILITY_CHANGED: 1
};
// Object representing current UI state
var uiState = {
    sessionPanelVisible: false
};

var UIStateStore = assign({}, EventEmitter.prototype, {
    sessionPanelIsVisible: function () {
        return uiState.sessionPanelVisible;
    },
    // Sessionn panel visibility event functions
    emitSessionPanelVisibilityChanged: function(visible) {
        this.emit(events.EVENT_SESSION_PANEL_VISIBILITY_CHANGED, visible);
    },
    onSessionPanelVisibilityChanged: function(callback) {
        this.on(events.EVENT_SESSION_PANEL_VISIBILITY_CHANGED, callback);
    },
    offSessionPanelVisibilityChanged: function(callback) {
        this.removeListener(events.EVENT_SESSION_PANEL_VISIBILITY_CHANGED, callback);
    }
});

// Register for app state actions
UIStateDispatcher.register(function(action) {
    switch(action.type) {
        case UIStateDispatcher.events.SESSION_PANEL_SHOWN:
            uiState.sessionPanelVisible = true;
            UIStateStore.emitSessionPanelVisibilityChanged(uiState.sessionPanelVisible);
            return true;
        case UIStateDispatcher.events.SESSION_PANEL_HIDDEN:
            uiState.sessionPanelVisible = false;
            UIStateStore.emitSessionPanelVisibilityChanged(uiState.sessionPanelVisible);
            return true;
    }

    return false;
});

module.exports = UIStateStore;