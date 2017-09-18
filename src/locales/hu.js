// bootbox.js locale configuration
// locale : Hungarian
// author : Márk Sági-Kazár

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('hu', {
        OK      : 'OK',
        CANCEL  : 'Mégsem',
        CONFIRM : 'Megerősít'
    });
}));