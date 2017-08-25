// bootbox.js locale configuration
// locale : Ukrainian
// author : OlehBoiko

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('uk', {
        OK      : 'OK',
        CANCEL  : 'Відміна',
        CONFIRM : 'Прийняти'
    });
}));