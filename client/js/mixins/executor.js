var ExecutorMixin = {
    execute: function() {
        var _this = this,
            args = Array.prototype.slice.call(arguments);
        // Isolate the function call
        var fn = args[0];
        // Get rid of the event parameter of the args
        args.splice(0, 1);
        // Return the executable
        return function() {
            fn.apply(_this, args);
        };
    }
};

module.exports = ExecutorMixin;
