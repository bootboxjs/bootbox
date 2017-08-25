// bootbox.js locale configuration
// locale : Estonian
// author : Pavel Krõlov

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('et', {
        OK      : 'OK',
        CANCEL  : 'Katkesta',
        CONFIRM : 'OK'
    });
}));