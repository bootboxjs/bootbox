// bootbox.js locale configuration
// locale : Chinese (Taiwan / Republic of China)
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
    bootbox.addLocale('zh_TW', {
        OK      : 'OK',
        CANCEL  : '取消',
        CONFIRM : '確認'
    });
}));