/**
 * bootbox.js [v4.x/master branch]
 *
 * http://bootboxjs.com/license.txt
 */
// @see https://github.com/makeusabrew/bootbox/issues/71
window.bootbox = window.bootbox || (function(document, $, undefined) {
  "use strict";

  // the base DOM structure needed to create a modal
  var template = [
    '<div class="bootbox modal" tabindex="-1">',
      '<div class="modal-dialog">',
        '<div class="modal-content">',
          '<div class="modal-header">',
            '<button type="button" class="close">&times;</button>',
            '<h4 class="modal-title">&nbsp;</h4>',
          '</div>',
          '<div class="modal-body"></div>',
          '<div class="modal-footer"></div>',
        '</div>',
      '</div>',
    '</div>'
  ].join("\n");

  // cache a reference to the jQueryfied body element
  var appendTo = $("body");

  var defaults = {
    locale: "en",
    backdrop: "static",
    animate: true,
    className: null
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    return locales[defaults.locale][key] || locales.en[key];
  }

  function processCallback(e, elem, callback) {
    // by default we assume a callback will get rid of the dialog,
    // although they are given the opportunity to override this
    var preserveDialog = false;

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    if ($.isFunction(callback)) {
      preserveDialog = (callback(e) === false);
    }

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      elem.modal("hide");
    }
  }

  function sanitize(options) {
    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    if (!options.buttons) {
      options.buttons = [];
    }

    if (!options.title) {
      // @FIXME gah; we need to pad the header a bit...
      options.title = "&nbsp;";
    }

    if (options.show === undefined) {
      // auto show dialogs by default
      options.show = true;
    }

    var buttons = options.buttons;
    var total = buttons.length;
    var i = total;
    var button;

    while (i--) {
      button = buttons[i];

      if (!button.label) {
        throw new Error("Button at index " + i + " requires a label");
      }

      if (!button.className && total <= 2 && i === total-1) {
        // always add a primary to the main option in a two-button dialog
        button.className = "btn-primary";
      }
    }

    return $.extend({}, defaults, options);
  }

  // @NOTE all high level methods will now only
  // accept 1 or 2 args
  // if args.length === 2 then assume str, callback
  // if args.length === 1 then inspect for str Vs object
  exports.alert = function() {
    var options, argv = arguments, argn = argv.length;

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    // @TODO all this arg handling has always been messy;
    // has to be a neater way. Revisit after implementing #confirm
    // and/or #prompt

    if (argn === 1) {
      if (typeof argv[0] === "string") {
        options = {
          message: argv[0],
          buttons: [{
            label: _t("OK")
          }]
        };
      } else if ($.isPlainObject(argv[0])) {
        // @TODO actually want we want to do is pluck a couple of
        // specific options off the provided object and namespace
        // them as buttons: [] args; the rest should be mapped as-is
        options = {
          message: argv[0].message,
          buttons: [{
            label: argv[0].label || _t("OK"),
            callback: argv[0].callback
          }],
          onEscape: argv[0].callback
        };
      } else {
        throw new Error("Invalid argument type");
      }
    } else if (argn === 2) {
      options = {
        message: argv[0],
        buttons: [{
          label: _t("OK"),
          callback: argv[1]
        }],
        onEscape: argv[1]
      };
    }

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options, argv = arguments, argn = argv.length;

    var defaults = {
      cancel: {
        retVal: false,
        label: _t("CANCEL")
      },
      confirm: {
        retVal: true,
        label: _t("CONFIRM")
      }
    };

    var message;
    var cbCancel;
    var cbConfirm;
    var callback;
    var buttons = [];

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 1) {
      // @TODO
      /*
      if ($.isPlainObject(argv[0])) {
        options = {
          message: argv[0].message,
          buttons: [{
            label: argv[0].label || "OK",
            callback: argv[0].callback
          }],
          onEscape: argv[0].callback
        };
      } else {
        throw new Error("Invalid argument type");
      }
      */
    } else if (argn === 2) {
      message = argv[0];

      callback = argv[1];

      // we'll care about the key when checking whether
      // to replace user supplied options or not, but not yet
      $.each(defaults, function(key, value) {
        buttons.push({
          label: value.label,
          callback: function() {
            return callback(value.retVal);
          }
        });
      });

    }

    // #confirm specific validation
    if (!$.isFunction(callback)) {
      throw new Error("Confirm method requires callback");
    }

    options = {
      message: message,
      buttons: buttons,
      onEscape: function() { return callback(false); }
    };

    // @NOTE I guess validation is a two-step process; first we get the options
    // ship-shape regardless of how they were passed (object Vs multiple args)
    // before applying any method-specific validation (e.g. confirm requires
    // a callback to be passed)

    return exports.dialog(options);
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var elem = $(template);

    // buttons
    var buttons = options.buttons;
    var i = buttons.length;
    var button;
    var buttonStr = "";
    var callbacks = {
      "escape": options.onEscape
    };

    while (i--) {
      button = buttons[i];

      // @TODO I don't like this string prepending to itself; bit dirty. Needs reworking
      buttonStr = '<button data-bb-handler="' + i + '" type="button" class="btn ' + button.className + '">' + button.label + '</button>' + buttonStr;
      callbacks[i] = button.callback;
    }

    if (options.animate === true) {
      elem.addClass("fade");
    }

    if (options.className) {
      elem.addClass(options.className);
    }

    elem.find(".modal-body").html(options.message);
    elem.find(".modal-footer").html(buttonStr);

    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    elem.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog (e.g. tooltips)
      if (e.target === this) {
        elem.remove();
      }
    });

    elem.on("shown.bs.modal", function(e) {
      elem.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    elem.on("escape.close.bb", function(e) {
      processCallback(e, elem, callbacks.escape);
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    elem.on("click", ".modal-footer button", function(e) {
      e.preventDefault();

      var callbackIndex = $(this).data("bb-handler");

      processCallback(e, elem, callbacks[callbackIndex]);

    });

    elem.on("click", ".modal-header .close", function(e) {
      e.preventDefault();
      processCallback(e, elem, callbacks.escape);
    });

    elem.on("keyup", function(e) {
      // @TODO make conditional
      if (e.which === 27) {
        elem.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // element to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    appendTo.append(elem);

    elem.modal({
      backdrop: "static", // @TODO config
      keyboard: false,
      show: false
    });

    if (options.show) {
      elem.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return elem;

  };

  exports.setDefaults = function(values) {
    var value;
    $.each(["locale", "backdrop", "animate", "className"], function(_, key) {
      value = values[key];

      if (value !== undefined) {
        defaults[key] = value;
      }
    });
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    br : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Sim"
    },
    da : {
      OK      : "OK",
      CANCEL  : "Annuller",
      CONFIRM : "Accepter"
    },
    de : {
      OK      : "OK",
      CANCEL  : "Abbrechen",
      CONFIRM : "Akzeptieren"
    },
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    es : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Aceptar"
    },
    fi : {
      OK      : "OK",
      CANCEL  : "Peruuta",
      CONFIRM : "OK"
    },
    fr : {
      OK      : "OK",
      CANCEL  : "Annuler",
      CONFIRM : "D'accord"
    },
    it : {
      OK      : "OK",
      CANCEL  : "Annulla",
      CONFIRM : "Conferma"
    },
    nl : {
      OK      : "OK",
      CANCEL  : "Annuleren",
      CONFIRM : "Accepteren"
    },
    pl : {
      OK      : "OK",
      CANCEL  : "Anuluj",
      CONFIRM : "Potwierdź"
    },
    ru : {
      OK      : "OK",
      CANCEL  : "Отмена",
      CONFIRM : "Применить"
    },
    zh_CN : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_TW : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  return exports;

}(document, window.jQuery));
