var AppStateDispatcher  = require('./dispatchers/appstate'),
    UIStateDispatcher   = require('./dispatchers/uistate');

module.exports = {
    // General Actions
    changePageTitle: function(newTitle) {
        if (!newTitle && document) document.title = 'GroupDirect';
        else if (document) document.title = 'GroupDirect | ' + newTitle;
    },
    // App State Actions
    declareSplashLoaded: function() {
        AppStateDispatcher.handleSplashLoaded();
    },
    declareSessionDataLoaded: function(sessionData) {
        AppStateDispatcher.handleSessionDataLoaded(sessionData);
    }
};
