/*! @preserve
 * bootbox.js
 * <%= type %> : 5.0.0
 * license : MIT
 * http://bootboxjs.com
 */

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('./bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    <%= content %>
}));
