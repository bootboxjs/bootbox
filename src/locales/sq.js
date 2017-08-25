// bootbox.js locale configuration
// locale : Albanian
// author : Knut Hühne

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('sq', {
        OK : 'OK',
        CANCEL : 'Anulo',
        CONFIRM : 'Prano'
    });
}));