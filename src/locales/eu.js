// bootbox.js locale configuration
// locale : Basque
// author : Iker Ibarguren

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('eu', {
        OK      : 'OK',
        CANCEL  : 'Ezeztatu',
        CONFIRM : 'Onartu'
    });
}));