// bootbox.js locale configuration
// locale : Slovak
// author : Stano Paška

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('sk', {
        OK      : 'OK',
        CANCEL  : 'Zrušiť',
        CONFIRM : 'Potvrdiť'
    });
}));