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
      bootbox.dialog({
        message: "I am a custom dialog",
        title: "Custom title",
        buttons: {
          success: {
            label: "Success!",
            className: "btn-success",
            callback: function() {
              Example.show("great success");
            }
          },
          danger: {
            label: "Danger!",
            className: "btn-danger",
            callback: function() {
              Example.show("uh oh, look out!");
            }
          },
          main: {
            label: "Click ME!",
            className: "btn-primary",
            callback: function() {
              Example.show("Primary button");
            }
          }
        }
      });
    };
    
    demos.custom_html = function(){
        var some_html = '<img src="images/bootstrap_logo.png" width="100px"/><br />';
        some_html += '<h2>You can use custom HTML too!</h2><br />';
        some_html += '<h4>Just be sure to mind your quote marks</h4>';
        bootbox.alert(some_html);
    };
   
});
