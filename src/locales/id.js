// bootbox.js locale configuration
// locale : Indonesian
// author : Budi Irawan

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('id', {
        OK      : 'OK',
        CANCEL  : 'Batal',
        CONFIRM : 'OK'
    });
}));