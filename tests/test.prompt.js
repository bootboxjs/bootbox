describe("#prompt", function() {
    var box;

    before(function() {
        bootbox.animate(false);
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });

    describe("with one argument", function() {
        before(function() {
            box = bootbox.prompt("Hello world!");
        });

        it("shows the expected heading", function() {
            assert.equal(
                box.find(".modal-header h4").text(),
                "Hello world!"
            );
        });

        it("has a form with a text input in the body", function() {
            assert.ok(box.find(".modal-body form input[type=text]"));
        });

        it("shows an OK button", function() {
            assert.equal(box.find(".modal-footer a:last").text(), "OK");
        });

        it("shows a Cancel button", function() {
            assert.equal(box.find(".modal-footer a:first").text(), "Cancel");
        });

        it("shows a close button", function() {
            assert.equal(box.find(".modal-header a.close").text(), "×");
        });

        it("does not apply the primary class to the cancel button", function() {
            assert.isFalse(box.find(".modal-footer a:first").hasClass("btn-primary"));
        });

        it("applies the primary class to the OK button", function() {
            assert.isTrue(box.find(".modal-footer a:last").hasClass("btn-primary"));
        });

        /* @TODO: reimplement under karma if possible
        var focusFn = window.mochaPhantomJS !== undefined ? null : function() {
            assert.isTrue(box.find(":input:first").is(":focus"));
        };

        it("has focus on the text input", focusFn);
        */
    });

    describe("with two arguments", function() {
        describe("where the second argument is a string", function() {
            before(function() {
                box = bootbox.prompt("Hello world!", "Foo");
            });

            it("shows the expected heading", function() {
                assert.equal(
                    box.find(".modal-header h4").text(),
                    "Hello world!"
                );
            });

            it("shows an OK button", function() {
                assert.equal(box.find(".modal-footer a:last").html(), "OK");
            });

            it("shows the custom Cancel label", function() {
                assert.equal(box.find(".modal-footer a:first").html(), "Foo");
            });
        });

        describe("where the second argument is a function", function() {
            before(function() {
                box = bootbox.prompt("Hello world!", function() { });
            });

            it("shows an OK button", function() {
                assert.equal(box.find(".modal-footer a:last").html(), "OK");
            });

            it("shows a Cancel button", function() {
                assert.equal(box.find(".modal-footer a:first").html(), "Cancel");
            });
        });
    });

    describe("with three arguments", function() {
        describe("where the third argument is a string", function() {
            before(function() {
                box = bootbox.prompt("Hello world!", "Foo", "Bar");
            });

            it("shows the expected heading", function() {
                assert.equal(
                    box.find(".modal-header h4").text(),
                    "Hello world!"
                );
            });

            it("shows the custom OK label", function() {
                assert.equal(box.find(".modal-footer a:last").html(), "Bar");
            });

            it("shows the custom Cancel label", function() {
                assert.equal(box.find(".modal-footer a:first").html(), "Foo");
            });
        });

        describe("where the third argument is a function", function() {
            before(function() {
                box = bootbox.prompt("Hello world!", "Foo", function() { });
            });

            it("shows the default OK label", function() {
                assert.equal(box.find(".modal-footer a:last").html(), "OK");
            });
        });
    });

    describe("with four arguments", function() {
        before(function() {
            box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {});
        });

        it("shows the expected heading", function() {
            assert.equal(
                box.find(".modal-header h4").text(),
                "Hello world!"
            );
        });

        it("shows the custom OK label", function() {
            assert.equal(box.find(".modal-footer a:last").html(), "Bar");
        });

        it("shows the custom Cancel label", function() {
            assert.equal(box.find(".modal-footer a:first").html(), "Foo");
        });
    });

    describe("with five arguments", function() {
        before(function() {
            box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, "default");
        });

        it("shows the expected heading", function() {
            assert.equal(
                box.find(".modal-header h4").text(),
                "Hello world!"
            );
        });

        it("shows the custom OK label", function() {
            assert.equal(box.find(".modal-footer a:last").html(), "Bar");
        });

        it("shows the custom Cancel label", function() {
            assert.equal(box.find(".modal-footer a:first").html(), "Foo");
        });

        it("shows the input with correct default value", function() {
            assert.equal(box.find(".modal-body input").val(), "default");
        });
    });

    describe("with five arguments, last is object", function() {
        describe("type not given.", function() {
            it("throws an error", function() {
                assert.throws(function() {
                    bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {});
                });
            });
        });

        describe("invalid prompt type.", function() {
            it("throws an error", function() {
                assert.throws(function() {
                    bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'foo'});
                });
            });
        });

        describe("modal has correct header", function() {
            describe("with 'default' given", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'text', value: 'default'});
                });

                it("shows the expected heading", function() {
                    assert.equal(
                        box.find(".modal-header h4").text(),
                        "Hello world!"
                    );
                });
            });
        });

        describe("modal has correct labels", function() {
            before(function() {
                box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'text', value: 'default'});
            });

            it("shows the custom OK label", function() {
                assert.equal(box.find(".modal-footer a:last").html(), "Bar");
            });

            it("shows the custom Cancel label", function() {
                assert.equal(box.find(".modal-footer a:first").html(), "Foo");
            });
        });

        describe("type 'text'", function() {
            describe("modal has correct input type", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'text', value: 'default'});
                });

                it("has a form with a text input in the body", function() {
                    assert.ok(box.find(".modal-body form input[type=text]"));
                });
            });

            describe("with 'default' given", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'text', value: 'default'});
                });

                it("shows the input with correct default value", function() {
                    assert.equal(box.find(".modal-body input").val(), "default");
                });
            });

            describe("without 'default' given", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'text'});
                });

                it("shows the input with correct default value", function() {
                    assert.equal(box.find(".modal-body input").val(), "");
                });
            });
        });

        describe("type 'select'", function() {
            describe("without 'options' value", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'select'});
                    });
                });
            });

            describe("with invalid 'options' value", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'select', options: 'foo'});
                    });
                });
            });

            describe("with empty 'options'", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.prompt("Hello world!", "Foo", "Bar", function() {}, {type: 'select', options: []});
                    });
                });
            });

            describe("with invalid 'options' values", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.prompt(
                            "Hello world!",
                            "Foo",
                            "Bar",
                            function() {},
                            {
                                type: 'select',
                                options: [
                                    {foo: 'bar'}
                                ]
                            }
                        );
                    });
                });
            });

            describe("modal has correct input type", function() {
                var options = [
                    {value: '1', text: 'foo'},
                    {value: '2', text: 'bar'}
                ];

                before(function() {
                    box = bootbox.prompt(
                        "Hello world!",
                        "Foo",
                        "Bar",
                        function() {},
                        {
                            type: 'select',
                            options: options
                        }
                    );
                });

                it("has a form with a select in the body", function() {
                    assert.ok(box.find(".modal-body form select"));
                });
            });

            describe("select list has correct values", function() {
                var options = [
                    {value: '1', text: 'foo'},
                    {value: '2', text: 'bar'}
                ];

                before(function() {
                    box = bootbox.prompt(
                        "Hello world!",
                        "Foo",
                        "Bar",
                        function() {},
                        {
                            type: 'select',
                            options: options
                        }
                    );
                });

                it("has correct number of options", function() {
                    assert.equal(box.find(".modal-body form select option").length, 2);
                });

                it("has correct options in select list", function() {
                    var items = box.find(".modal-body form select > option").map(function() {
                        var opt = {};

                        opt["value"] = $(this).val();
                        opt["text"] = $(this).text();

                        return opt;
                    }).get();

                    assert.deepEqual(items, options);
                });
            });

            describe("select list has 'default' value selected.", function() {
                var options = [
                    {value: '1', text: 'foo'},
                    {value: '2', text: 'bar'},
                    {value: '3', text: 'barfoo'}
                ];

                var selectedValue = 2;

                before(function() {
                    box = bootbox.prompt(
                        "Hello world!",
                        "Foo",
                        "Bar",
                        function() {},
                        {
                            type: 'select',
                            options: options,
                            value: selectedValue
                        }
                    );
                });

                it("has specified value selected", function() {
                    assert.equal(box.find("option:selected").val(), selectedValue);
                });
            });
        });
    });

    describe("with six arguments", function() {
        it("throws an error", function() {
            assert.throws(function() {
                bootbox.prompt(1, 2, 3, 4, 5, 6);
            });
        });
    });

    describe("with a callback", function() {
        describe("when dismissing the dialog by clicking OK", function() {
            var result;
            before(function() {
                box = bootbox.prompt("Sure?", function(cbResult) {
                    result = cbResult;
                });
                box.find("input[type=text]").val("Foo Bar");
            });

            it("should invoke the callback with the value of the input", function() {
                box.find(".modal-footer a:last").trigger('click');
                assert.equal(result, "Foo Bar");
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });

            describe("when the callback returns false", function() {
                var result;
                before(function() {
                    box = bootbox.prompt("Sure?", function(cbResult) {
                        result = cbResult;
                        return false;
                    });
                    box.find("input[type=text]").val("Foo Bar");
                });

                it("should invoke the callback with the value of the input", function() {
                    box.find(".modal-footer a:last").trigger('click');
                    assert.equal(result, "Foo Bar");
                });

                it("should not close the dialog", function() {
                    assert.isFalse(box.is(":hidden"));
                });
            });
        });

        describe("when dismissing the dialog by clicking Cancel", function() {
            var result = "not null";
            before(function() {
                box = bootbox.prompt("Sure?", function(cbResult) {
                    result = cbResult;
                });
                box.find("input[type=text]").val("Foo Bar");
            });

            it("should invoke the callback with a value of null", function() {
                box.find(".modal-footer a:first").trigger('click');
                assert.isNull(result);
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });

            describe("when the callback returns false", function() {
                var result;
                before(function() {
                    box = bootbox.prompt("Sure?", function(cbResult) {
                        result = cbResult;
                        return false;
                    });
                    box.find("input[type=text]").val("Foo Bar");
                });

                it("should invoke the callback with a value of null", function() {
                    box.find(".modal-footer a:first").trigger('click');
                    assert.isNull(result);
                });

                it("should not close the dialog", function() {
                    assert.isFalse(box.is(":hidden"));
                });
            });
        });

        describe("when pressing escape", function() {
            var result = true;
            before(function() {
                box = bootbox.prompt("Sure?", function(cbResult) {
                    result = cbResult;
                });
            });

            it("should invoke the callback with a value of null", function() {
                var e = jQuery.Event("keyup.dismiss.modal", {which: 27});
                $(box).trigger(e);

                assert.isNull(result);
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });

            describe("when the callback returns false", function() {
                var result = true;
                before(function() {
                    box = bootbox.prompt("Sure?", function(cbResult) {
                        result = cbResult;
                        return false;
                    });
                });

                it("should invoke the callback with a value of null", function() {
                    var e = jQuery.Event("keyup.dismiss.modal", {which: 27});
                    $(box).trigger(e);

                    assert.isNull(result);
                });

                it("should not close the dialog", function() {
                    assert.isFalse(box.is(":hidden"));
                });
            });
        });

        describe("when pressing close", function() {
            var result = true;
            before(function() {
                box = bootbox.prompt("Sure?", function(cbResult) {
                    result = cbResult;
                });

                box.find(".modal-header .close").click();
            });

            it("should invoke the callback with a value of null", function() {
                assert.isNull(result);
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });
        });

        describe("when submitting the form", function() {
            var result;
            before(function() {
                box = bootbox.prompt("Sure?", function(cbResult) {
                    result = cbResult;
                });
                box.find("input[type=text]").val("Foo Bar");
            });

            it("should invoke the callback with the value of the input", function() {
                box.find(".modal-body form").trigger('submit');
                assert.equal(result, "Foo Bar");
            });
        });
    });

    describe("without a callback", function() {
        describe("when pressing escape", function() {
            before(function() {
                box = bootbox.prompt("Hello");
            });

            it("should close the dialog", function() {
                var e = jQuery.Event("keyup.dismiss.modal", {which: 27});
                $(box).trigger(e);

                assert.isTrue(box.is(":hidden"));
            });
        });
    });
});
