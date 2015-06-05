var AppStateDispatcher  = require('./dispatchers/appstate');

module.exports = {
    // General Actions
    changePageTitle: function(newTitle) {
        if (!newTitle && document) document.title = 'GroupDirect';
        else if (document) document.title = 'GroupDirect | ' + newTitle;
    },
    // Auth Actions
    declareLoggedIn: function(sessionData) {
        console.log("declareLoggedIn", JSON.stringify(sessionData));
        AppStateDispatcher.handleLoggedIn(sessionData);
    },
    declareLoggedOut: function() {
        AppStateDispatcher.handleLoggedOut();
    },
    // Connection Actions
    declareContactFound: function(contactDetails) {
        AppStateDispatcher.handleContactFound(contactDetails);
    }
};
