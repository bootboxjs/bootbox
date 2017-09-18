// bootbox.js locale configuration
// locale : Czech
// author : Lukáš Fryč

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('cs', {
        OK      : 'OK',
        CANCEL  : 'Zrušit',
        CONFIRM : 'Potvrdit'
    });
}));