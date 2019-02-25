// bootbox.js locale configuration
// locale : Swedish
// author : Mattias Reichel

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('sv', {
        OK      : 'OK',
        CANCEL  : 'Avbryt',
        CONFIRM : 'OK'
    });
}));