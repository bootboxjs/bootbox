$(function () {
    try {
        var locales = Object.keys(bootbox.locales());
        for(var i = 0; i < locales.length; i++){
            var option = $('<option value=""></option>');
            option.attr('value', locales[i]);
            option.html(locales[i]);

            $('#locales').append(option);
        }

        Example.init({
            "selector": ".bb-alert"
        });

        $('.example-button').on('click', function (e) {
            e.preventDefault();

            var key = $(this).data('bb-example-key');
            if ($.trim(key) != "") {
                switch (key) {

                    /* Alerts */

                    case 'alert-default':
                        bootbox.alert("This is the default alert!");
                        Example.show('Default alert');
                        break;

                    case 'alert-callback':
                        bootbox.alert("This is an alert with a callback!", function () {
                            Example.show('This was logged in the callback!');
                        });
                        break;

                    case 'alert-options':
                        bootbox.alert({
                            message: "This is an alert with a callback!",
                            callback: function () {
                                Example.show('This was logged in the callback!');
                            }
                        });
                        break;

                    case 'alert-small':
                        bootbox.alert({
                            message: "This is the small alert!",
                            size: 'small'
                        });
                        Example.show('Small alert shown');
                        break;

                    case 'alert-large':
                        bootbox.alert({
                            message: "This is the large alert!",
                            size: 'large'
                        });
                        Example.show('Large alert shown');
                        break;

                    case 'alert-custom-class':
                        bootbox.alert({
                            message: "This is an alert with an additional class!",
                            className: 'rubberBand animated'
                        });
                        Example.show('Custom class alert shown');
                        break;

                    case 'alert-overlay-click':
                        bootbox.alert({
                            message: "This alert can be dismissed by clicking on the background!",
                            backdrop: true
                        });
                        Example.show('Dismissable background alert shown');
                        break;
                        
                    case 'alert-locale':
                        bootbox.alert({
                            message: "This alert uses the Arabic locale!",
                            locale: 'ar'
                        });
                        Example.show('Arabic locale alert shown');
                        break;


                    /* Confirms */

                    case 'confirm-default':
                        bootbox.confirm("This is the default confirm.", function (result) {
                            Example.show('This was logged in the callback: ' + result);
                        });
                        break;

                    case 'confirm-options':
                        bootbox.confirm({
                            message: "This is a confirm with custom button text and color! Do you like it?",
                            buttons: {
                                confirm: {
                                    label: 'Yes',
                                    className: 'btn-success'
                                },
                                cancel: {
                                    label: 'No',
                                    className: 'btn-danger'
                                }
                            },
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'confirm-button-text':
                        bootbox.confirm({
                            title: "Destroy planet?",
                            message: "Do you want to activate the Deathstar now? This cannot be undone.",
                            buttons: {
                                cancel: {
                                    label: '<i class="fa fa-times"></i> Cancel'
                                },
                                confirm: {
                                    label: '<i class="fa fa-check"></i> Confirm'
                                }
                            },
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                    case 'confirm-locale':
                        var locale = $('#locales').val();
                        bootbox.confirm({
                            message: "This confirm uses the selected locale. Were the labels what you expected?",
                            locale: locale,
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;


                   /* Prompts */

                    case 'prompt-default':
                        bootbox.prompt("This is the default prompt!", function (result) {
                            Example.show('This was logged in the callback: ' + result);
                        });
                        break;
                        
                    case 'prompt-custom-locale':
                        var locale = {
                            OK: 'I Suppose',
                            CONFIRM: 'Go Ahead',
                            CANCEL: 'Maybe Not'
                        };

                        bootbox.addLocale('custom', locale);

                        bootbox.prompt({ 
                            title: "This is a prompt with a custom locale! What do you think?", 
                            locale: 'custom',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-checkbox':
                        bootbox.prompt({
                            title: "This is a prompt with a set of checkbox inputs!",
                            value: [1, 3],
                            inputType: 'checkbox',
                            inputOptions: [
                                {
                                    text: 'Choice One',
                                    value: '1',
                                },
                                {
                                    text: 'Choice Two',
                                    value: '2',
                                },
                                {
                                    text: 'Choice Three',
                                    value: '3',
                                }
                            ],
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                    case 'prompt-radio':
                        bootbox.prompt({
                            title: "This is a prompt with a set of radio inputs!",
                            message: '<p>Please select an option below:</p>',
                            inputType: 'radio',
                            inputOptions: [
                                {
                                    text: 'Choice One',
                                    value: '1',
                                },
                                {
                                    text: 'Choice Two',
                                    value: '2',
                                },
                                {
                                    text: 'Choice Three',
                                    value: '3',
                                }
                            ],
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-date':
                        bootbox.prompt({
                            title: "This is a prompt with a date input!",
                            inputType: 'date',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-email':
                        bootbox.prompt({
                            title: "This is a prompt with an email input!",
                            inputType: 'email',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-number':
                        bootbox.prompt({
                            title: "This is a prompt with a number input!",
                            inputType: 'number',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-password':
                        bootbox.prompt({
                            title: "This is a prompt with a password input!",
                            inputType: 'password',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-select':
                        bootbox.prompt({
                            title: "This is a prompt with select!",
                            inputType: 'select',
                            inputOptions: [
                                {
                                    text: 'Choose one...',
                                    value: '',
                                },
                                {
                                    text: 'Choice One',
                                    value: '1',
                                },
                                {
                                    text: 'Choice Two',
                                    value: '2',
                                },
                                {
                                    text: 'Choice Three',
                                    value: '3',
                                }
                            ],
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-textarea':
                        bootbox.prompt({
                            title: "This is a prompt with a textarea!",
                            inputType: 'textarea',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-time':
                        bootbox.prompt({
                            title: "This is a prompt with a time input!",
                            inputType: 'time',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                    case 'prompt-range':
                        bootbox.prompt({
                            title: "This is a prompt with a range input!",
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            step: 5,
                            value: 35,
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;


                        /* Custom dialogs */

                    case 'custom-dialog-as-overlay':
                        var timeout = 3000; // 3 seconds
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center mb-0"><i class="fa fa-spin fa-cog"></i> Please wait while we do something...</p>',
                            closeButton: false
                        });

                        setTimeout(function () {
                            dialog.modal('hide');
                        }, timeout);

                        break;

                    case 'custom-dialog-init':
                        var dialog = bootbox.dialog({
                            title: 'A custom dialog with init',
                            message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
                        });

                        dialog.init(function () {
                            setTimeout(function () {
                                dialog.find('.bootbox-body p').html('I was loaded after the dialog was shown!');
                            }, 3000);
                        });

                        break;

                    case 'custom-dialog-with-buttons':
                        var dialog = bootbox.dialog({
                            title: 'A custom dialog with buttons and callbacks',
                            message: "<p>This dialog has buttons. Each button has it's own callback function.</p>",
                            size: 'large',
                            buttons: {
                                cancel: {
                                    label: "I'm a cancel button!",
                                    className: 'btn-danger',
                                    callback: function(){
                                        Example.show('Custom cancel clicked');
                                    }
                                },
                                noclose: {
                                    label: "I don't close the modal!",
                                    className: 'btn-warning',
                                    callback: function(){
                                        Example.show('Custom button clicked');
                                        return false;
                                    }
                                },
                                ok: {
                                    label: "I'm an OK button!",
                                    className: 'btn-info',
                                    callback: function(){
                                        Example.show('Custom OK clicked');
                                    }
                                }
                            }
                        });

                        break;
                }
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
    }

});