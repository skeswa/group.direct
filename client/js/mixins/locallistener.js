// Ensures that the "this" keyword inside the "fn" function
// always refers to the "thisRef" parameter.
var localize = function(thisRef, fn) {
    if (typeof(fn) === 'function') {
    return function() {
        fn.apply(thisRef, arguments);
    };
};

// Makes all the functions in the listeners object of
// this component refer to the component with the "this" keyword.
var LocalListenersMixin = {
    componentWillMount: function() {
        var component = this;

        if (this.listeners) {
            for (var listenerName in this.listeners) {
                if (typeof(this.listeners[listenerName]) === 'function') {
                    this.listeners[listenerName] = localize(this, this.listeners[listenerName]);
                }
            }
        }
    }
};

module.exports = LocalListenersMixin;
