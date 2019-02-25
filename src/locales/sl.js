// bootbox.js locale configuration
// locale : Slovenian
// author : @metalcamp

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('sl', {
        OK : 'OK',
        CANCEL : 'Prekliči',
        CONFIRM : 'Potrdi'
    });
}));