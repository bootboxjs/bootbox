// bootbox.js locale configuration
// locale : Tamil
// author : Kolappan Nathan

(function (global, factory) {  
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    'use strict';
    bootbox.addLocale('ta', {
        OK      : 'சரி',
        CANCEL  : 'ரத்து செய்',
        CONFIRM : 'உறுதி செய்'
    });
}));
