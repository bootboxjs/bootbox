// bootbox.js locale configuration
// locale : Norwegian
// author : Nils Magnus Englund

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('no', {
        OK      : 'OK',
        CANCEL  : 'Avbryt',
        CONFIRM : 'OK'
    });
}));