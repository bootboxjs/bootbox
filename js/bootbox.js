var bootbox = bootbox || (function() {
    var that = {};

    that.alert = function(str, cb, okStr) {
        if (okStr == null) {
            okStr = "OK";
        }
        if (typeof cb === 'undefined') {
            cb = null;
        }
        that.dialog(
            str,
            [{
                "label": okStr,
                "callback": cb
            }],
            {
                "escape": cb
            }
        );
                /*
                "Withdraw challenge": {
                    "class"    : "danger", 
                    "callback" : function() {
                        hasOutstandingChallenge = false;
                        socket.emit('lobby:challenge:cancel', to);
                    }
                }
                */
        /*
        var div = $([
            "<div class='modal hide fade'>",
                "<div class='modal-body'>",
                    str,
                "</div>",
                "<div class='modal-footer'>",
                    "<a class='btn primary' href='#'>"+okStr+"</a>",
                "</div>",
            "</div>"
        ].join("\n"));

        $("body").append(div);

        div.bind('hidden', function() {
            div.remove();
        });

        div.bind('shown', function() {
            $("a.primary", div).focus();
        });

        div.bind('hide', function() {
            if (typeof cb == 'function') {
                cb();
            }
        });

        $("a", div).click(function(e) {
            e.preventDefault();
            div.modal("hide");
        });

        div.modal({
            "backdrop" : "static",
            "keyboard" : true,
            "show"     : true
        });
        */

    };

    that.confirm = function(str, cb, okStr, cancelStr) {
        if (okStr == null) {
            okStr = "OK";
        }
        if (cancelStr == null) {
            cancelStr = "Cancel";
        }
        var _confirmed = false;
        var div = $([
            "<div class='modal hide fade'>",
                "<div class='modal-body'>",
                    str,
                "</div>",
                "<div class='modal-footer'>",
                    "<a class='btn primary' href='#'>"+okStr+"</a>",
                    "<a class='btn danger' href='#'>"+cancelStr+"</a>",
                "</div>",
            "</div>"
        ].join("\n"));

        $("body").append(div);

        div.bind('hidden', function() {
            div.remove();
        });

        div.bind('hide', function() {
            /* we've disabled this for confirms so shouldn't be an issue
            if (!_confirmed && typeof cb == 'function') {
                //  assume then that we don't want to confirm
                cb(false);
            }
            */
        });

        div.bind('shown', function() {
            $("a.primary", div).focus();
        });

        $("a", div).click(function(e) {
            _confirmed = true;
            var _confirm = $(this).hasClass("primary");
            e.preventDefault();
            div.modal("hide");
            if (typeof cb == 'function') {
                cb(_confirm);
            }
        });

        div.modal({
            "backdrop" : "static",
            "show"     : true
        });
    }

    that.dialog = function(str, handlers, options) {
        var buttons = "";
        var callbacks = [];

        for (var i = 0, j = handlers.length; i < j; i++) {
            var label = null;
            var _class = null;
            var callback = null;

            if (typeof handlers[i].callback == 'function') {
                callback = handlers[i].callback;
            }

            if (handlers[i].class) {
                _class = handlers[i].class;
            } else if (i == 0) {
                _class = 'primary';
            }

            if (handlers[i].label) {
                label = handlers[i].label;
            } else {
                label = "Option "+(i+1);
            }

            console.log(i, _class, callback, label);

            buttons += "<a data-handler='"+i+"' class='btn "+_class+"' href='#'>"+label+"</a>";

            callbacks[i] = callback;
        }

        var div = $([
            "<div class='bootbox modal hide fade'>",
                "<div class='modal-body'>",
                    str,
                "</div>",
                "<div class='modal-footer'>",
                    buttons,
                "</div>",
            "</div>"
        ].join("\n"));

        div.bind('hidden', function() {
            div.remove();
        });

        div.bind('hide', function(e) {
            console.log(e);
        });

        // well, *if* we have a primary - give it focus
        div.bind('shown', function() {
            $("a.primary", div).focus();
        });

        $("a", div).click(function(e) {
            e.preventDefault();
            div.modal("hide");
            var handler = $(this).data("handler");
            var cb = callbacks[handler];
            if (typeof cb == 'function') {
                cb();
            }
        });

        div.modal({
            "backdrop" : "static",
            "show"     : true,
            "keyboard" : (typeof options.escape != 'undefined')
        });

        $("body").append(div);
    }

    return that;
})();
