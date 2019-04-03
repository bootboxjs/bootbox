// bootbox.js locale configuration
// locale : Korean
// author : rigning

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
    bootbox.addLocale('ko', {
        OK: 'OK',
        CANCEL: '취소',
        CONFIRM: '확인'
    });
}));