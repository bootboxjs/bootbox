// bootbox.js locale configuration
// locale : Azerbaijani
// author : Valentin Belousov

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('az', {
        OK: 'OK',
        CANCEL: 'İmtina et',
        CONFIRM: 'Təsdiq et'
    });
}));