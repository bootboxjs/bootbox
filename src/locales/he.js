// bootbox.js locale configuration
// locale : Hebrew
// author : Chen Alon

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
    bootbox.addLocale('he', {
        OK      : 'אישור',
        CANCEL  : 'ביטול',
        CONFIRM : 'אישור'
    });
}));