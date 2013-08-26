/**
 * Bootbox Demos; crude, but effective...
 */
$(function() {
    var demos = {};

    $(document).on("click", "a[data-bb]", function(e) {
        e.preventDefault();
        var type = $(this).data("bb");

        if (typeof demos[type] === 'function') {
            demos[type]();
        }
    });

    // let's namespace the demo methods; it makes them easier
    // to invoke
    demos.alert = function() {
        bootbox.alert("Hello world!");
    };

    demos.alert_callback = function() {
        bootbox.alert("Hello world!", function() {
            Example.show("Hello world callback");
        });
    };

    demos.confirm = function() {
        bootbox.confirm("Are you sure?", function(result) {
            Example.show("Confirm result: "+result);
        });
    };

    demos.alert_button = function() {
        bootbox.alert("This alert has custom button text", "So it does!");
    };

    demos.confirm_buttons = function() {
        bootbox.confirm("This confirm has custom buttons - see?", "No", "Yes!", function(result) {
            if (result) {
                Example.show("Well done!");
            } else {
                Example.show("Oh no - try again!");
            }
        });
    };

    demos.prompt = function() {
        bootbox.prompt("What is your name?", function(result) {
            if (result === null) {
                Example.show("Prompt dismissed");
            } else {
                Example.show("Hi <b>"+result+"</b>");
            }
        });
    };

    demos.dialog = function() {
        bootbox.dialog("I am a custom dialog", [{
            "label" : "Success!",
            "class" : "btn-success",
            "callback": function() {
                Example.show("great success");
            }
        }, {
            "label" : "Danger!",
            "class" : "btn-danger",
            "callback": function() {
                Example.show("uh oh, look out!");
            }
        }, {
            "label" : "Click ME!",
            "class" : "btn-primary",
            "callback": function() {
                Example.show("Primary button");
            }
        }, {
            "label" : "Just a button..."
        }]);
    };
});
