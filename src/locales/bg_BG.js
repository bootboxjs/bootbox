// bootbox.js locale configuration
// locale : Bulgarian
// author :  mraiur

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('bg_BG', {
        OK      : 'Ок',
        CANCEL  : 'Отказ',
        CONFIRM : 'Потвърждавам'
    });
}));