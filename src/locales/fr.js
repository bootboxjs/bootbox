// bootbox.js locale configuration
// locale : French
// author : Nick Payne, Sebastien Andary

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('fr', {
        OK      : 'OK',
        CANCEL  : 'Annuler',
        CONFIRM : 'Confirmer'
    });
}));