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
    "<div class='bootbox modal' tabindex='-1'>",
      "<div class='modal-dialog'>",
        "<div class='modal-content'>",
          "<div class='modal-header'>",
            "<button type='button' class='close'>&times;</button>",
            "<h4 class='modal-title'></h4>",
          "</div>",
          "<div class='modal-body'></div>",
          "<div class='modal-footer'></div>",
        "</div>",
      "</div>",
    "</div>"
  ].join("\n");

  // cache a reference to the jQueryfied body element
  var appendTo = $("body");

  var defaults = {
    // default language
    locale: "en",
    // show backdrop or not
    backdrop: true,
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // show the modal header or not
    header: true,
    // whether or not to include a close button, if a header is present
    closeButton: true,
    // show the dialog immediately by default
    show: true
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    return locales[defaults.locale][key] || locales.en[key];
  }

  function processCallback(e, dialog, callback) {
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
      dialog.modal("hide");
    }
  }

  function sanitize(options) {
    var buttons = options.buttons;
    var total;
    var key;
    var keyIndex;
    var button;

    total = (function getKeyLength(obj) {
      var k, t = 0;
      for (k in obj) {
        t ++;
      }
      return t;
    }(buttons));

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    if (!options.title) {
      // @FIXME gah; we need to pad the header a bit...
      options.title = "&nbsp;";
    }

    // we only support Bootstrap's "static" and false backdrop args
    // supporting true would mean you could dismiss the dialog without
    // explicitly interacting with it
    options.backdrop = options.backdrop ? "static" : false;

    keyIndex = 0;

    for (key in buttons) {
      keyIndex ++;

      button = buttons[key];

      if (!button.label) {
        throw new Error("Button with key " + key + " requires a label");
      }

      if (!button.className) {
        if (total <= 2 && keyIndex === total) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    }

    return options;
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
          buttons: {
            ok: {
              label: _t("OK")
            }
          }
        };
      } else if ($.isPlainObject(argv[0])) {
        // @TODO actually want we want to do is pluck a couple of
        // specific options off the provided object and namespace
        // them as buttons: [] args; the rest should be mapped as-is
        options = {
          message: argv[0].message,
          buttons: {
            ok: {
              label: argv[0].label || _t("OK"),
              callback: argv[0].callback
            }
          },
          onEscape: argv[0].callback
        };
      } else {
        throw new Error("Invalid argument type");
      }
    } else if (argn === 2) {
      options = {
        message: argv[0],
        buttons: {
          ok: {
            label: _t("OK"),
            callback: argv[1]
          }
        },
        onEscape: argv[1]
      };
    }

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options, argv = arguments, argn = argv.length;
    var message;
    var callback;
    var buttons = {
      cancel: {
        label: _t("CANCEL"),
        callback: function() {
          return callback(false);
        }
      },
      confirm: {
        label: _t("CONFIRM"),
        callback: function() {
          return callback(true);
        }
      }
    };


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
    }

    // #confirm specific validation
    if (!$.isFunction(callback)) {
      throw new Error("Confirm method requires callback");
    }

    options = {
      message: message,
      buttons: buttons,
      onEscape: buttons.cancel.callback
    };

    // @NOTE I guess validation is a two-step process; first we get the options
    // ship-shape regardless of how they were passed (object Vs multiple args)
    // before applying any method-specific validation (e.g. confirm requires
    // a callback to be passed)

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options, argv = arguments, argn = argv.length;
    var dialog;
    var title;
    var callback;
    var form;
    var input;
    var value = "";
    var buttons = {
      cancel: {
        label: _t("CANCEL"),
        callback: function() {
          // native prompts dismiss with null
          // vs confirms which dissmiss with false...
          return callback(null);
        }
      },
      confirm: {
        label: _t("CONFIRM"),
        callback: function() {
          callback(input.val());
        }
      }
    };

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 1) {
      // @TODO
    } else if (argn === 2) {
      title = argv[0];
      callback = argv[1];
    }

    form = $("<form class='bootbox-form'></form>");
    input = $("<input class='bootbox-input input-block-level' autocomplete=off type=text value='" + value + "' />");
    form.append(input);

    // #prompt specific validation
    if (!$.isFunction(callback)) {
      throw new Error("Confirm method requires callback");
    }

    options = {
      title: title,
      message: form,
      buttons: buttons,
      onEscape: buttons.cancel.callback,
      // deliberately don't show the dialog yet, we want to
      // bind some listeners to it first...
      show: false
    };

    form.on("submit", function(e) {
      e.preventDefault();
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      input.focus();
    });

    dialog.modal("show");

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(template);
    var buttons = options.buttons;
    var button;
    var key;
    var buttonStr = "";
    var callbacks = {
      "escape": options.onEscape
    };

    for (key in buttons) {
      button = buttons[key];

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    }

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }
    dialog.find(".modal-body").html(options.message);
    dialog.find(".modal-footer").html(buttonStr);

    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    dialog.on("escape.close.bb", function(e) {
      // @NOTE
      // if we declared processCallback locally we could take
      // advantage of our scope to just make the following...
      // processCallback(e, "escape");
      // and the one a bit further:
      // processCallback(e, $(this).data("bb-handler")
      // worth considering...
      processCallback(e, dialog, callbacks.escape);
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      e.preventDefault();

      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);

    });

    dialog.on("click", ".modal-header .close", function(e) {
      e.preventDefault();
      processCallback(e, dialog, callbacks.escape);
    });

    dialog.on("keyup", function(e) {
      // @TODO make conditional
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    appendTo.append(dialog);

    dialog.modal({
      backdrop: options.backdrop,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
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

    return dialog;

  };

  exports.setDefaults = function(values) {
    $.extend(defaults, values);
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
