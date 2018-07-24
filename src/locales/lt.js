// bootbox.js locale configuration
// locale : Lithuanian
// author : Tomas

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('lt', {
        OK      : 'Gerai',
        CANCEL  : 'Atšaukti',
        CONFIRM : 'Patvirtinti'
    });
}));