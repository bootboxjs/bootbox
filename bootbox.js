/**
 * bootbox.js v2.6
 *
 * http://bootboxjs.com/license.txt
 */
var bootbox = window.bootbox || (function($) {

    var _locale        = 'en',
        _defaultLocale = 'en',
        _animate       = true,
        _backdrop      = 'static',
        _defaultHref   = 'javascript:;',
        _classes       = '',
        _icons         = {},
        /* last var should always be the public object we'll return */
        that           = {};

    /**
     * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
     * unlikely to be required. If this gets too large it can be split out into separate JS files.
     */
    var _locales = {
        'en' : {
            OK      : 'OK',
            CANCEL  : 'Cancel',
            CONFIRM: 'OK',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'fr' : {
            OK      : 'OK',
            CANCEL  : 'Annuler',
            CONFIRM: 'D\'accord',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'de' : {
            OK      : 'OK',
            CANCEL  : 'Abbrechen',
            CONFIRM: 'Akzeptieren',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'es' : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM: 'Aceptar',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'br' : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM: 'Sim',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'nl' : {
            OK      : 'OK',
            CANCEL  : 'Annuleren',
            CONFIRM: 'Accepteren',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'ru' : {
            OK      : 'OK',
            CANCEL  : 'Отмена',
            CONFIRM: 'Применить',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'it' : {
            OK      : 'OK',
            CANCEL  : 'Annulla',
            CONFIRM: 'Conferma',
            CONFIRM_TITLE: "Confirm",
            ALERT_TITLE: "Alert",
            DIALOG_TITLE: "Dialog"
        },
        'tr': {
            OK: 'Tamam',
            CANCEL: 'İptal',
            CONFIRM: 'Evet',
            CONFIRM_TITLE: "Onay",
            ALERT_TITLE: "Uyarı",
            DIALOG_TITLE: "İletişim Penceresi"
        }
    };

    /**
     * private methods
     */
    function _translate(str, locale) {
        // we assume if no target locale is probided then we should take it from current setting
        if (locale == null) {
            locale = _locale;
        }
        if (typeof _locales[locale][str] == 'string') {
            return _locales[locale][str];
        }

        // if we couldn't find a lookup then try and fallback to a default translation

        if (locale != _defaultLocale) {
            return _translate(str, _defaultLocale);
        }

        // if we can't do anything then bail out with whatever string was passed in - last resort
        return str;
    }

    /**
     * public API
     */
    that.setLocale = function(locale) {
        for (var i in _locales) {
            if (i == locale) {
                _locale = locale;
                return;
            }
        }
        throw new Error('Invalid locale: '+locale);
    };

    that.addLocale = function(locale, translations) {
        if (typeof _locales[locale] == 'undefined') {
            _locales[locale] = {};
        }
        for (var str in translations) {
            _locales[locale][str] = translations[str];
        }
    };

    that.setIcons = function(icons) {
        _icons = icons;
        if (typeof _icons !== 'object' || _icons == null) {
            _icons = {};
        }
    };

    that.alert = function(/*str, label, cb*/) {
        var str   = "",
            label = _translate('OK'),
            cb    = null;

        switch (arguments.length) {
            case 1:
                // no callback, default button label
                str = arguments[0];
                break;
            case 2:
                // callback *or* custom button label dependent on type
                str = arguments[0];
                if (typeof arguments[1] == 'function') {
                    cb = arguments[1];
                } else {
                    label = arguments[1];
                }
                break;
            case 3:
                // callback and custom button label
                str   = arguments[0];
                label = arguments[1];
                cb    = arguments[2];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-3");
                break;
        }

        return that.dialog(str, [{
            "label": label,
            "icon" : _icons.OK,
            "callback": cb
        }], {
            "onEscape": cb,
            "header": _translate('ALERT_TITLE'),
            "height": 200
        });
    };

    that.confirm = function(/*str, labelCancel, labelOk, cb*/) {
        var str         = "",
            labelCancel = _translate('CANCEL'),
            labelOk     = _translate('CONFIRM'),
            cb          = null;

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'function') {
                    cb = arguments[1];
                } else {
                    labelCancel = arguments[1];
                }
                break;
            case 3:
                str         = arguments[0];
                labelCancel = arguments[1];
                if (typeof arguments[2] == 'function') {
                    cb = arguments[2];
                } else {
                    labelOk = arguments[2];
                }
                break;
            case 4:
                str         = arguments[0];
                labelCancel = arguments[1];
                labelOk     = arguments[2];
                cb          = arguments[3];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-4");
                break;
        }

        return that.dialog(str, [{
            "label": labelCancel,
            "icon" : _icons.CANCEL,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(false);
                }
            }
        }, {
            "label": labelOk,
            "icon" : _icons.CONFIRM,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(true);
                }
            },
            "class": "btn-primary"
        }], {
            "header": _translate('CONFIRM_TITLE'),
            "height": 200
        });
    };

    that.prompt = function(/*str, labelCancel, labelOk, cb, defaultVal*/) {
        var str         = "",
            labelCancel = _translate('CANCEL'),
            labelOk     = _translate('CONFIRM'),
            cb          = null,
            defaultVal  = "";

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'function') {
                    cb = arguments[1];
                } else {
                    labelCancel = arguments[1];
                }
                break;
            case 3:
                str         = arguments[0];
                labelCancel = arguments[1];
                if (typeof arguments[2] == 'function') {
                    cb = arguments[2];
                } else {
                    labelOk = arguments[2];
                }
                break;
            case 4:
                str         = arguments[0];
                labelCancel = arguments[1];
                labelOk     = arguments[2];
                cb          = arguments[3];
                break;
            case 5:
                str         = arguments[0];
                labelCancel = arguments[1];
                labelOk     = arguments[2];
                cb          = arguments[3];
                defaultVal  = arguments[4];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-5");
                break;
        }

        var header = str;

        // let's keep a reference to the form object for later
        var form = $("<form></form>");
        form.append("<input autocomplete='off' style='width: 97%;' type=text value='" + defaultVal + "' />");

        var div = that.dialog(form, [{
            "label": labelCancel,
            "icon" : _icons.CANCEL,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(null);
                }
            }
        }, {
            "label": labelOk,
            "icon" : _icons.CONFIRM,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(
                        form.find("input[type=text]").val()
                    );
                }
            }
        }], {
            "header": header,
            "height": 180
        });

        div.on("shown", function() {
            form.find("input[type=text]").focus();

            // ensure that submitting the form (e.g. with the enter key)
            // replicates the behaviour of a normal prompt()
            form.on("submit", function(e) {
                e.preventDefault();
                div.find(".btn-primary").click();
            });
        });

        return div;
    };

    that.modal = function(/*str, label, options*/) {
        var str;
        var label;
        var options;

        var defaultOptions = {
            "onEscape": null,
            "keyboard": true,
            "backdrop": _backdrop
        };

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'object') {
                    options = arguments[1];
                } else {
                    label = arguments[1];
                }
                break;
            case 3:
                str     = arguments[0];
                label   = arguments[1];
                options = arguments[2];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-3");
                break;
        }

        defaultOptions['header'] = label;

        if (typeof options == 'object') {
            options = $.extend(defaultOptions, options);
        } else {
            options = defaultOptions;
        }

        return that.dialog(str, [], options);
    };

    /**
     * private methods for generating handlers html output and attach to modal footer
     */
    var _generateHandlers = function (handlers, modal) {
        var buttons = [],
            callbacks = []
        ;

        modal.find(".modal-footer").empty();

        var i = handlers.length;
        while (i--) {
            var label = null,
                href = null,
                _class = null,
                icon = '',
                callback = null;

            if (typeof handlers[i]['label'] == 'undefined' &&
                typeof handlers[i]['class'] == 'undefined' &&
                typeof handlers[i]['callback'] == 'undefined') {
                // if we've got nothing we expect, check for condensed format

                var propCount = 0,      // condensed will only match if this == 1
                    property = null;   // save the last property we found

                // be nicer to count the properties without this, but don't think it's possible...
                for (var j in handlers[i]) {
                    property = j;
                    if (++propCount > 1) {
                        // forget it, too many properties
                        break;
                    }
                }

                if (propCount == 1 && typeof handlers[i][j] == 'function') {
                    // matches condensed format of label -> function
                    handlers[i]['label'] = property;
                    handlers[i]['callback'] = handlers[i][j];
                }
            }

            if (typeof handlers[i]['callback'] == 'function') {
                callback = handlers[i]['callback'];
                callbacks[i] = callback;
            }

            if (handlers[i]['class']) {
                _class = handlers[i]['class'];
            } else if (i == handlers.length - 1 && handlers.length <= 2) {
                // always add a primary to the main option in a two-button dialog
                _class = 'btn-primary';
            }

            if (handlers[i]['label']) {
                label = handlers[i]['label'];
            } else {
                label = "Option " + (i + 1);
            }

            if (handlers[i]['icon']) {
                icon = "<i class='" + handlers[i]['icon'] + "'></i> ";
            }

            if (handlers[i]['href']) {
                href = handlers[i]['href'];
            }
            else {
                href = _defaultHref;
            }

            var $button = $("<a data-handler='" + i + "' class='btn " + _class + "' href='" + href + "'>" + icon + "" + label + "</a>");
            modal.find(".modal-footer").append($button);

            $button.on("click", function (e) {
                $self = $(this);
                var hideModal = null;
                var handlerIndex = $self.data("handler");
                // we can't use i in this scope beacuse this is an async event

                // sort of @see https://github.com/makeusabrew/bootbox/pull/68 - heavily adapted
                // if we've got a custom href attribute, all bets are off
                if (href !== _defaultHref) {
                    return;
                }

                e.preventDefault();

                if (typeof callbacks[handlerIndex] == 'function') {
                    hideModal = callbacks[handlerIndex](modal, e); //passing modal itself as a parameter to callback
                }

                // the only way hideModal *will* be false is if a callback exists and
                // returns it as a value. in those situations, don't hide the dialog
                // @see https://github.com/makeusabrew/bootbox/pull/25
                if (hideModal !== false) {
                    hideSource = 'button';
                    modal.modal("hide");
                }
            });

            //buttons.push($button);
        }

        //modal.data("callbacks", callbacks);

        return buttons;
    };

    that.dialog = function(str, handlers, opts) {
        var hideSource = null,
            buttons    = "",
            callbacks  = [],
            options    = options || {};

        var defaults = {
            width: 500,
            height: 400,
            backdrop: _backdrop,
            remote: false,
            keyboard: true,
            header: "Dialog"
            //, classes: undefined
            //, onEscape: function () { }
        };

        var options = $.extend({}, defaults, opts);

        // check for single object and convert to array if necessary
        if (handlers == null) {
            handlers = [];
        } else if (typeof handlers.length == 'undefined') {
            handlers = [handlers];
        }



        // @see https://github.com/makeusabrew/bootbox/issues/46#issuecomment-8235302
        // and https://github.com/twitter/bootstrap/issues/4474
        // for an explanation of the inline overflow: hidden

        var parts = ["<div class='bootbox modal' style='overflow:hidden;'>"];

        if (options['header']) {
            var closeButton = '';
            if (typeof options['headerCloseButton'] == 'undefined' || options['headerCloseButton']) {
                closeButton = "<a href='" + _defaultHref + "' class='close'>&times;</a>";
                //closeButton = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
            }

            parts.push("<div class='modal-header'>"+closeButton+"<h3>"+options['header']+"</h3></div>");
        }

        // push an empty body into which we'll inject the proper content later
        parts.push("<div class='modal-body'></div>");

        if (handlers.length > 0) {
            parts.push("<div class='modal-footer'></div>");
        }

        parts.push("</div>");

        var div = $(parts.join("\n"));

        // check whether we should fade in/out
        var shouldFade = (typeof options.animate === 'undefined') ? _animate : options.animate;

        if (shouldFade) {
            div.addClass("fade");
        }

        div.width(options.width);
        div.find(".modal-body").height(options.height -140);

        var optionalClasses = (typeof options.classes === 'undefined') ? _classes : options.classes;
        if( optionalClasses )  {
          div.addClass( optionalClasses );
        }

        // now we've built up the div properly we can inject the content whether it was a string or a jQuery object
        $(".modal-body", div).html(str);

        div.on("click", '.close', function (e) {
            e.preventDefault();
            div.modal("hide");

        });


        div.bind('hidden', function() {
            div.remove();
        });

        div.bind('hide', function() {
            if (hideSource == 'escape' &&
                typeof options.onEscape == 'function') {
                options.onEscape();
            }
        });

        // hook into the modal's keyup trigger to check for the escape key
        $(document).bind('keyup.modal', function ( e ) {
            if (e.which == 27) {
                hideSource = 'escape';
            }
        });

        // well, *if* we have a primary - give the last dom element (first displayed) focus
        div.bind('shown', function() {
            $("a.btn-primary:last", div).focus();
        });

        // wire up button handlers
        div.on('click', '.modal-footer a, a.close', function(e) {


        });

        if (options.keyboard == null) {
            options.keyboard = (typeof options.onEscape == 'function');
        }

        $("body").append(div);

        div.modal(options);
        div.data("bootboxoptions", options);
        _generateHandlers(handlers, div);


        return div;
    };

    that.hideAll = function() {
        $(".bootbox").modal("hide");
    };

    that.animate = function(animate) {
        _animate = animate;
    };

    that.backdrop = function(backdrop) {
        _backdrop = backdrop;
    };

    that.classes = function(classes) {
        _classes = classes;
    };

    that.setOptions = function (modal, handlers, options) {
        if (typeof modal != "object") {
            return;
        }
        if (typeof options == "object") {
            var exists = modal.data("bootboxoptions");
            exists = $.extend(exists, options);
            if (typeof options.header) {
                modal.find(".modal-header h3").text(options.header);
            }
            if (typeof options.width) {
                modal.width(options.width);
            }
            if (typeof options.height) {
                modal.find(".modal-body").height(options.height);
            }
        }
        if (typeof handlers == "object") {
            _generateHandlers(handlers, modal);
        }

    };

    return that;

})(window.jQuery);

(function ($) {

    $.fn.bootbox = function () {
        var 
            $e = $(this),
            act = null,
            labelCancel = "Cancel",
            labelOk = "OK",
            handlers = [],
            callback = function () { };
            options = {
                callback: function () { },
                header: "Dialog"
            };

        if ($e.length == 0) {
            return;
        }

        if (arguments.length == 0) {
            return bootbox.modal($e.html(), _translate('DIALOG_TITLE'));
        }
        if (arguments.length > 0) {
            if (typeof arguments[0] == "string") {
                switch (arguments[0]) {
                    case "alert":
                        /*str, label, cb*/
                        var label = "Ok";
                        if (arguments.length > 2) {
                            callback = arguments[2];
                        }
                        if (arguments.length > 1) {
                            label = arguments[1];
                        }
                        return bootbox.alert($e.html(), label, callback);
                        break;
                    case "confirm":
                        /*str, labelCancel, labelOk, cb*/
                        if (arguments.length > 3) {
                            callback = arguments[3];
                        }
                        if (arguments.length > 2) {
                            labelOk = arguments[2];
                        }
                        if (arguments.length > 1) {
                            labelCancel = arguments[1];
                        }
                        return bootbox.confirm($e.html(), labelCancel, labelOk, callback);
                        break;
                    case "prompt":
                        /*str, labelCancel, labelOk, cb, defaultVal*/
                        var defaultVal = "";
                        if (arguments.length > 3 && typeof arguments[3] == "function") {
                            callback = arguments[3];
                        }
                        if (arguments.length > 4) {
                            defaultVal = arguments[4];
                        }
                        if (arguments.length > 2) {
                            labelOk = arguments[2];
                        }
                        if (arguments.length > 1) {
                            labelCancel = arguments[1];
                        }
                        return bootbox.prompt($e.html(), labelCancel, labelOk, callback, defaultVal);
                        break;
                    case "modal":
                        /*str, options*/
                        if (arguments.length > 1) {
                            options = $.extend(options, arguments[2]);
                        }
                        return bootbox.modal($e.html(), options);
                        break;
                    case "dialog":
                        /*str, handlers, options*/
                        if (arguments.length > 2) {
                            options = $.extend(options, arguments[2]);
                        }
                        if (arguments.length > 1) {
                            handlers = arguments[1];
                        }
                        return bootbox.dialog($e.html(), handlers, options);
                        break;
                    case "hideAll":
                        return bootbox.hideAll();
                        break;
                    case "animate":
                        /*animate*/
                        return bootbox.animate(arguments[1]);
                        break;
                    case "backdrop":
                        /*backdrop*/
                        return bootbox.backdrop(arguments[1]);
                        break;
                    case "classes":
                        /*classes*/
                        return bootbox.classes(arguments[1]);
                        break;
                    case "setOptions":
                        /*modal, handlers, options*/
                        handlers = null;
                        options = {};
                        if (arguments.length > 2) {
                            handlers = arguments[2];
                        }
                        if (arguments.length > 1) {
                            options = arguments[1];
                        }
                        return bootbox.setOptions($e, handlers, options);
                        break;
                    default:
                        return bootbox.modal($e.html(), _translate('DIALOG_TITLE'));
                        break;
                }
            }
            else if (typeof arguments[0] == "object") {
                options = $.extend(options, arguments[0]);
                return bootbox.dialog($e.html(), [], options);
            }
            else if (typeof arguments[0] == "array") {
                handlers = $.extend(options, arguments[0]);
                return bootbox.dialog($e.html(), handlers);
            }
            else if (arguments.length = 2 && typeof arguments[0] == "array" && typeof arguments[1] == "object") {
                options = $.extend(options, arguments[1]);
                handlers = arguments[0];
                return bootbox.dialog($e.html(), handlers, options);
            }
            //for default behavior
            return bootbox.modal($e.html(), _translate('DIALOG_TITLE'));
        }
    };

})(jQuery);