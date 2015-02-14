module.exports = {
    time: {
        sequence: function(splits) {
            for (var split in splits) {
                setTimeout(splits[split], split);
            }
        }
    },
    object: {
        lengthOf: function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        }
    },
    events: {
        once: function (el, type, callback) {
            var typeArray = type.split(' ');

            for (var i = typeArray.length - 1; i >= 0; i--) {
                el.addEventListener(typeArray[i], function(e) {
                    e.target.removeEventListener(e.type, arguments.callee);
                    return callback(e);
                });
            }
        },
        on: function(el, type, callback, capture) {
            el.addEventListener(type, callback, capture || false);
        },
        off: function(el, type, callback, capture) {
            el.removeEventListener(type, callback, capture || false);
        }
    },
    url: {
        getParameterByName: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    },
    dom: {
        isDescendant: function(parent, child) {
            var node = child.parentNode;
            while (node != null) {
                if (node == parent) return true;
                node = node.parentNode;
            }
            return false;
        }
    },
    assets: {
        waitForImages: function(images, done) {
            var img, count = 0, callback = function() {
                if (++count === images.length) {
                    done();
                }
            };

            for (var i = 0; i < images.length; i++) {
                img = new Image();
                img.onload = callback;
                img.src = images[i];
            }
        },
        waitForWebfonts: function(fonts, callback) {
            // Coutesy of Thomas Bachem
            var loadedFonts = 0;
            for (var i = 0, l = fonts.length; i < l; i++) {
                (function(font) {
                    var node = document.createElement('span');
                    // Characters that vary significantly among different fonts
                    node.innerHTML = 'giItT1WQy@!-/#';
                    // Visible - so we can measure it - but not on the screen
                    node.style.position      = 'absolute';
                    node.style.left          = '-10000px';
                    node.style.top           = '-10000px';
                    // Large font size makes even subtle changes obvious
                    node.style.fontSize      = '300px';
                    // Reset any font properties
                    node.style.fontFamily    = 'sans-serif';
                    node.style.fontVariant   = 'normal';
                    node.style.fontStyle     = 'normal';
                    node.style.fontWeight    = 'normal';
                    node.style.letterSpacing = '0';
                    document.body.appendChild(node);
                    // Remember width with no applied web font
                    var width = node.offsetWidth;
                    // Set the font-family
                    node.style.fontFamily = font;

                    var interval;
                    function checkFont() {
                        // Compare current width with original width
                        if (node && node.offsetWidth != width) {
                            ++loadedFonts;
                            node.parentNode.removeChild(node);
                            node = null;
                        }
                        // If all fonts have been loaded
                        if (loadedFonts >= fonts.length) {
                            if (interval) {
                                clearInterval(interval);
                            }
                            if (loadedFonts === fonts.length) {
                                callback();
                                return true;
                            }
                        }
                    };

                    if(!checkFont()) {
                        interval = setInterval(checkFont, 50);
                    }
                })(fonts[i]);
            }
        }
    }
}