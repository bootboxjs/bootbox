// bootbox.js locale configuration
// locale : Danish
// author : Frederik Alkærsig

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('da', {
        OK      : 'OK',
        CANCEL  : 'Annuller',
        CONFIRM : 'Accepter'
    });
}));