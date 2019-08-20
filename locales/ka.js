// bootbox.js locale configuration
// locale : Georgian
// author : Avtandil Kikabidze aka LONGMAN (@akalongman)

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
    bootbox.addLocale('ka', {
        OK      : 'OK',
        CANCEL  : 'გაუქმება',
        CONFIRM : 'დადასტურება'
    });
}));