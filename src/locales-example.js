(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bootbox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('./bootbox'));
    } else {
        factory(global.bootbox);
    }
}(this, function (bootbox) {

    (function () {
        bootbox.addLocale('en', {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        });
    })();

    (function () {
        bootbox.addLocale('fr', {
            OK: "OK",
            CANCEL: "Annuler",
            CONFIRM: "Confirmer"
        });
    })();

    (function () {
        bootbox.addLocale('tr', {
            OK: "Tamam",
            CANCEL: "İptal",
            CONFIRM: "Onayla"
        });
    })();
}));