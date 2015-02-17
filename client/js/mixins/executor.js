var ExecutorMixin = {
    // Generates preloads a function call with certain parameters.
    // First argument is the function to call, and what
    // follows are the arguments thereof.
    //
    // Example: to make a console.log that prints "Hello World", simply call:
    //          this.createExecutable(console.log, 'Hello', 'World');
    createExecutable: function() {
        var _this = this,
            args = Array.prototype.slice.call(arguments);
        // Isolate the function call
        var fn = args[0];
        // Get rid of the event parameter of the args
        args.splice(0, 1);
        // Return the executable
        return function() {
            var innerArgs = Array.prototype.slice.call(arguments);
            fn.apply(_this, args.concat(innerArgs));
        };
    }
};

module.exports = ExecutorMixin;
