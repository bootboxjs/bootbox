// bootbox.js locale configuration
// locale : Japanese
// author : ms183

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
    bootbox.addLocale('ja', {
        OK      : 'OK',
        CANCEL  : 'キャンセル',
        CONFIRM : '確認'
    });
}));