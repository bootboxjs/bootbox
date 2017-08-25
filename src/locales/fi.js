// bootbox.js locale configuration
// locale : Finnish
// author : Nick Payne

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('fi', {
        OK      : 'OK',
        CANCEL  : 'Peruuta',
        CONFIRM : 'OK'
    });
}));