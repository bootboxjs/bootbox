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


      bootbox.alert({
        message: "Hey",
        label: "Okay?!"
      });

      bootbox.alert({
        message: "Hey 2",
        buttons: {
          ok: {
            label: "Okay!!!?!",
            icon: ""
          }
        }
      });

      bootbox.alert({
        message: "Hey",
        // known top-level button keys; risk of clashes
        // although we'll only ever have:
        // ok (alert)
        // cancel (confirm, prompt)
        // confirm (confirm, prompt)
        // forcing these under a buttons: {} object would
        // mean the API is consistent; but do they need to be?
        ok: {
          label: "Okay?!",
          icon: ""
        }
      });

      bootbox.dialog({
        title: "Are you sure?",
        message: "foo bar",
        show: false,
        buttons: {
          key_who_cares: {
            label: "mother trucker",
            className: "some class",
            callback: function() {
              //
            }
          },
          "short form": function() {
            console.log("now I care about the key!");
          }
        },
        onEscape: function() {
          // escape me, eh?
        }
      });


      /*
      bootbox.dialog({
        message: "hi there",
        buttons: {
          "hello": function() {
            //
          },
          "test": {
            callback: function() {
              //
            },
            className: "foo"
          }
        },
        buttons2: [{
          label: "hello",
          className: "foo",
          callback: function() {
            //
          }
        }],
        buttons3: [{
          "hello": function() {
            //
          }
        }, {
          "test": function() {
          }
        }]
      });
      */
    };

    demos.alert_callback = function() {
      /*
        bootbox.alert("Hello world!", function() {
            Example.show("Hello world callback");
        });
        */
       bootbox.dialog({
         title: "Title",
         message: "body here",
         buttons: {
           ok: {
             label: "OK COOL",
             className: "btn-danger"
           },
           not_ok: {
             label: "NOT COOL AT ALL"
           },
           "please?": function() {
           }
         }
       });

       /*
       bootbox.dialog({
         title: "Title",
         message: "body here",
         buttons: [{
           label: "OK COOL",
           className: "btn-danger"
         }, {
           label: "NOT COOL AT ALL"
         }, {
           "please": function() {
           }
         }]
       });
       */

    };

    demos.confirm = function() {
      //bootbox.confirm("Are you sure?"); // nil point
      /*
      bootbox.confirm("Are you sure?", function(result) {
        bootbox.confirm({
          message: "Are you REALLY sure?",
          callback: function(result) {
            console.log("confirm 2");

            bootbox.confirm({
              message: "Sure 3?",
              cancel: {
                label: "CAAANCEL",
                icon: "foo"
              },
              confirm: {
                label: "Carry on"
              }
            });

            bootbox.confirm({
              message: "Sure 3?",
              buttons: {
                cancel: {
                  label: "CAAANCEL",
                  icon: "foo"
                },
                confirm: {
                  label: "Carry on"
                }
              }
            });
              
          }
        });
      });
      /*
        bootbox.confirm("Are you sure?", function(result) {
            Example.show("Confirm result: "+result);
        });
        */
      bootbox.confirm("Are you sure?", function(result) {
        console.log("Confirm 1", result);
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
