// bootbox.js locale configuration
// locale : Chinese (China / People's Republic of China)
// author : ---

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('zh-ch', {
        OK      : 'OK',
        CANCEL  : '取消',
        CONFIRM : '确认'
    });
}));