var AppStateDispatcher  = require('./dispatchers/appstate');

module.exports = {
    // General Actions
    changePageTitle: function(newTitle) {
        if (!newTitle && document) document.title = 'GroupDirect';
        else if (document) document.title = 'GroupDirect | ' + newTitle;
    },
    // Auth Actions
    declareLoggedIn: function(sessionData) {
        AppStateDispatcher.handleLoggedIn(sessionData);
    }
};
