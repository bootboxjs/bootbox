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

    var i = options.buttons.length;
    
    while (i--) {
      var button = options.buttons[i];

      if (!button.label) {
        throw new Error("Button at index " + i + " requires a label");
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
    var callbacks = {};

    while (i--) {
      button = buttons[i];

      buttonStr = '<button data-bb-handler="' + i + '" type="button" class="btn ' + button.className + '">' + button.label + '</button>' + buttonStr;
      callbacks[i] = button.callback;
    }

    elem.find(".modal-body").html(options.message);
    elem.find(".modal-footer").html(buttonStr);


    // bootstrap event listeners

    elem.on("keyup.dismiss.bs.modal", function(e) {
      // @TODO make conditional
      if (e.which === 27) {
        elem.trigger("escape.close.bb");
      }
    });

    elem.on("hidden.bs.modal", function(e) {
      if (e.target === this) {
        elem.remove();
      }
    });

    elem.on("click", ".modal-footer button", function(e) {
      e.preventDefault();

      var callbackIndex = $(this).data("bb-handler");
      var callback = callbacks[callbackIndex];

      processCallback(e, elem, callback);

    });

    // bootbox event listeners
    elem.on("escape.close.bb", function(e) {
      processCallback(e, elem, options.onEscape);
    });

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
    var options;
    var argv = arguments, argn = argv.length;

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    // @TODO all this arg handling has always been messy;
    // has to be a neater way

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

  exports.dialog = dialog;

  return exports;

}(document, window.jQuery));
