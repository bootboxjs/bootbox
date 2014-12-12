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

    demos.prompt_default_value = function(){
        bootbox.prompt({
            title: "What is your real name?",
            value: "makeusabrew",
            callback: function(result) {
                if (result === null) {
                    Example.show("Prompt dismissed");
                } else {
                    Example.show("Hi <b>"+result+"</b>");
                }
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

  demos.custom_html = function () {
    bootbox.dialog({
      title: "That html",
      message: '<img src="images/bootstrap_logo.png" width="100px"/><br/> You can also use <b>html</b>'
    });
  };

  demos.custom_form = function () {
    bootbox.dialog({
        title: "This is a form in a modal.",
        message: '<div class="row">  ' +
          '<div class="col-md-12"> ' +
          '<form class="form-horizontal"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="name">Name</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="name" name="name" type="text" placeholder="Your name" class="form-control input-md"> ' +
          '<span class="help-block">Here goes your name</span> </div> ' +
          '</div> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="awesomeness">How awesome is this?</label> ' +
          '<div class="col-md-4"> <div class="radio"> <label for="awesomeness-0"> ' +
          '<input type="radio" name="awesomeness" id="awesomeness-0" value="Really awesome" checked="checked"> ' +
          'Really awesome </label> ' +
          '</div><div class="radio"> <label for="awesomeness-1"> ' +
          '<input type="radio" name="awesomeness" id="awesomeness-1" value="Super awesome"> Super awesome </label> ' +
          '</div> ' +
          '</div> </div>' +
          '</form> </div>  </div>',
        buttons: {
          success: {
            label: "Save",
            className: "btn-success",
            callback: function () {
              var name = $('#name').val();
              var answer = $("input[name='awesomeness']:checked").val()
              Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");
            }
          }
        }
      }
    );
  };

});
