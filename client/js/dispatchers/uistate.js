var assign      = require('object-assign'),
    Dispatcher  = require('flux').Dispatcher;

var UIStateDispatcher = assign(new Dispatcher(), {
    events: {
        SESSION_PANEL_SHOWN: 1,
        SESSION_PANEL_HIDDEN: 2
    },
    handleSessionPanelShown: function() {
        this.dispatch({
            type: this.events.SESSION_PANEL_SHOWN
        });
    },
    handleSessionPanelHidden: function() {
        this.dispatch({
            type: this.events.SESSION_PANEL_HIDDEN
        });
    }
});

module.exports = UIStateDispatcher;