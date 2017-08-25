// bootbox.js locale configuration
// locale : Polish
// author : Szczepan Cieślik

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('pl', {
        OK      : 'OK',
        CANCEL  : 'Anuluj',
        CONFIRM : 'Potwierdź'
    });
}));