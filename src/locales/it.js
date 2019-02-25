// bootbox.js locale configuration
// locale : Italian
// author : Mauro

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('it', {
        OK      : 'OK',
        CANCEL  : 'Annulla',
        CONFIRM : 'Conferma'
    });
}));