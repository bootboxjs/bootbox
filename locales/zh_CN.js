// bootbox.js locale configuration
// locale : Chinese (China / People's Republic of China)
// author : Nick Payne

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
    bootbox.addLocale('zh_CN', {
        OK      : 'OK',
        CANCEL  : '取消',
        CONFIRM : '确认'
    });
}));