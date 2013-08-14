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
    '<div class="modal fade" tabindex="-1">',
      '<div class="modal-dialog">',
        '<div class="modal-content">',
          '<div class="modal-header">',
            '<button type="button" class="close">&times;</button>',
            '<h4 class="modal-title">&nbsp;</h4>',
          '</div>',
          '<div class="modal-body">',
          '</div>',
          '<div class="modal-footer">',
            '<button type="button" class="btn">A Button</button>',
          '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join("\n");

  // cache a reference to the jQueryfied body element
  var appendTo = $("body");

  // our public object; augmented after our private API
  var exports = {};

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

    return options;
  }

  /**
   * @private
   */
  function dialog(options) {
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

      buttonStr = '<button data-bb-handler="' + i + '" type="button" class="btn ' + button.className + '">' + button.label + '</button>' + buttonStr;
      callbacks[i] = button.callback;
    }

    elem.find(".modal-body").html(options.message);
    elem.find(".modal-footer").html(buttonStr);

    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    elem.on("hidden.bs.modal", function(e) {
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

    return elem;

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
            label: "OK"
          }]
        };
      } else if ($.isPlainObject(argv[0])) {
        // @TODO actually want we want to do is pluck a couple of
        // specific options off the provided object and namespace
        // them as buttons: [] args; the rest should be mapped as-is
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
    } else if (argn === 2) {
      options = {
        message: argv[0],
        buttons: [{
          label: "OK",
          callback: argv[1]
        }],
        onEscape: argv[1]
      };
    }

    return dialog(options);
  };

  exports.confirm = function() {
    var options, argv = arguments, argn = argv.length;

    var defaults = {
      cancel: {
        retVal: false,
        label: "Cancel"
      },
      confirm: {
        retVal: true,
        label: "Confirm"
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

    return dialog(options);
  };

  exports.dialog = dialog;

  return exports;

}(document, window.jQuery));
