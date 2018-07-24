// bootbox.js locale configuration
// locale : Dutch
// author : Bas ter Vrugt

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('nl', {
        OK      : 'OK',
        CANCEL  : 'Annuleren',
        CONFIRM : 'Accepteren'
    });
}));