// bootbox.js locale configuration
// locale : Arabic
// author : Emad Omar

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {
    bootbox.addLocale('ar', {
        OK: 'موافق',
        CANCEL: 'الغاء',
        CONFIRM: 'تأكيد'
    });
}));