describe("Bootbox", function() {
    var box;

    before(function() {
        // we need to stop transitions kicking in as they effectively mean all these tests need to be synchronous
        // we'll deal with all that stuff later
        bootbox.animate(false);
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });


    describe("Initial state", function() {
        it("exists in the global namespace", function() {
            assert.ok(bootbox);
        });

        it("starts with no visible dialogs", function() {
            assert.equal($(".bootbox").length, 0);
        });
    });

    describe("instance methods", function() {
        describe("#alert", function() {
            describe("with one argument", function() {
                before(function() {
                    box = bootbox.alert("Hello world!");
                });

                it("shows the expected body copy", function() {
                    assert.equal(box.find(".modal-body").text(), "Hello world!");
                });

                it("shows an OK button", function() {
                    assert.equal(box.find("a:first").text(), "OK");
                });

                it("has focus on the OK button", function() {
                    assert.isTrue(box.find("a:first").is(":focus"));
                });
            });

            describe("with two arguments", function() {
                describe("where the second argument is a string", function() {
                    before(function() {
                        box = bootbox.alert("Hello world!", "Foo");
                    });

                    it("shows the expected body copy", function() {
                        assert.equal(box.find(".modal-body").html(), "Hello world!");
                    });

                    it("shows the correct label text", function() {
                        assert.equal(box.find("a:first").text(), "Foo");
                    });
                });

                describe("where the second argument is a function", function() {
                    before(function() {
                        box = bootbox.alert("Hello world!", function() { });
                    });

                    it("shows the default label text", function() {
                        assert.equal(box.find("a:first").text(), "OK");
                    });
                });
            });

            describe("with three arguments", function() {
                before(function() {
                    box = bootbox.alert("Foo", "Bar", function() {});
                });

                it("shows the expected body copy", function() {
                    assert.equal(box.find(".modal-body").text(), "Foo");
                });

                it("shows the correct label text", function() {
                    assert.equal(box.find("a:first").text(), "Bar");
                });
            });

            describe("with four arguments", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.alert(1, 2, 3, 4);
                    });
                });
            });

            describe("with a callback", function() {
                describe("when dismissing the dialog by clicking OK", function() {
                    var result;
                    before(function() {
                        box = bootbox.alert("Hi", function() {
                            result = true;
                        });
                    });

                    it("should invoke the callback", function() {
                        box.find("a:first").trigger('click');
                        assert.isTrue(result);
                    });
                });

                describe("when dismissing the dialog by pressing escape", function() {
                    var result;
                    before(function() {
                        box = bootbox.alert("Hi", function() {
                            result = true;
                        });
                    });

                    it("should invoke the callback", function() {
                        // if we do this in the "before", it will dismiss
                        // all the dialogs before their it() methods run. e.g.
                        // _all_ before() run before all it()
                        var e = jQuery.Event("keyup.modal", {which: 27});
                        $(document).trigger(e);

                        assert.isTrue(result);
                    });
                });
            });
        });

        describe("#confirm", function() {
            describe("with one argument", function() {
                before(function() {
                    box = bootbox.confirm("Hello world!");
                });

                it("shows the expected body copy", function() {
                    assert.equal(
                        box.find(".modal-body").html(),
                        "Hello world!"
                    );
                });

                it("shows an OK button", function() {
                    assert.equal(box.find("a:first").html(), "OK");
                });

                it("shows a Cancel button", function() {
                    assert.equal(box.find("a:last").html(), "Cancel");
                });

                it("has focus on the OK button", function() {
                    assert.isTrue(box.find("a:first").is(":focus"));
                });
            });

            describe("with two arguments", function() {
                describe("where the second argument is a string", function() {
                    before(function() {
                        box = bootbox.confirm("Hello world!", "Foo");
                    });

                    it("shows the expected body copy", function() {
                        assert.equal(
                            box.find(".modal-body").html(),
                            "Hello world!"
                        );
                    });

                    it("shows an OK button", function() {
                        assert.equal(box.find("a:first").html(), "OK");
                    });

                    it("shows the custom Cancel label", function() {
                        assert.equal(box.find("a:last").html(), "Foo");
                    });
                });

                describe("where the second argument is a function", function() {
                    before(function() {
                        box = bootbox.confirm("Hello world!", function() { });
                    });

                    it("shows an OK button", function() {
                        assert.equal(box.find("a:first").html(), "OK");
                    });

                    it("shows a Cancel button", function() {
                        assert.equal(box.find("a:last").html(), "Cancel");
                    });
                });
            });

            describe("with three arguments", function() {
                describe("where the third argument is a string", function() {
                    before(function() {
                        box = bootbox.confirm("Hello world!", "Foo", "Bar");
                    });

                    it("shows the expected body copy", function() {
                        assert.equal(
                            box.find(".modal-body").html(),
                            "Hello world!"
                        );
                    });

                    it("shows the custom OK label", function() {
                        assert.equal(box.find("a:first").html(), "Bar");
                    });

                    it("shows the custom Cancel label", function() {
                        assert.equal(box.find("a:last").html(), "Foo");
                    });
                });

                describe("where the third argument is a function", function() {
                    before(function() {
                        box = bootbox.confirm("Hello world!", "Foo", function() { });
                    });

                    it("shows the default OK label", function() {
                        assert.equal(box.find("a:first").html(), "OK");
                    });
                });
            });

            describe("with four arguments", function() {
                before(function() {
                    box = bootbox.confirm("Hello world!", "Foo", "Bar", function() {});
                });

                it("shows the expected body copy", function() {
                    assert.equal(
                        box.find(".modal-body").html(),
                        "Hello world!"
                    );
                });

                it("shows the custom OK label", function() {
                    assert.equal(box.find("a:first").html(), "Bar");
                });

                it("shows the custom Cancel label", function() {
                    assert.equal(box.find("a:last").html(), "Foo");
                });
            });

            describe("with five arguments", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.confirm(1, 2, 3, 4, 5);
                    });
                });
            });
            
            describe("with a callback", function() {
                describe("when dismissing the dialog by clicking OK", function() {
                    var result;
                    before(function() {
                        box = bootbox.confirm("Sure?", function(cbResult) {
                            result = cbResult;
                        });
                    });

                    it("should invoke the callback with a value of true", function() {
                        box.find("a:first").trigger('click');
                        assert.isTrue(result);
                    });
                });

                describe("when dismissing the dialog by clicking Cancel", function() {
                    var result;
                    before(function() {
                        box = bootbox.confirm("Sure?", function(cbResult) {
                            result = cbResult;
                        });
                    });

                    it("should invoke the callback with a value of true", function() {
                        box.find("a:last").trigger('click');
                        assert.isFalse(result);
                    });
                });

                describe("when pressing escape", function() {
                    var called = false;
                    before(function() {
                        box = bootbox.confirm("Sure?", function(cbResult) {
                            called = true;
                        });
                    });

                    it("should not invoke the callback", function() {
                        var e = jQuery.Event("keyup.modal", {which: 27});
                        $(document).trigger(e);

                        assert.isFalse(called);
                    });
                });
            });
        });

        describe("#prompt", function() {
            describe("with one argument", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!");
                });

                it("shows the expected heading", function() {
                    assert.equal(
                        box.find(".modal-header h3").text(),
                        "Hello world!"
                    );
                });

                it("has a form with a text input in the body", function() {
                    assert.ok(box.find(".modal-body form input[type=text]"));
                });

                it("shows an OK button", function() {
                    assert.equal(box.find(".modal-footer a:first").text(), "OK");
                });

                it("shows a Cancel button", function() {
                    assert.equal(box.find(".modal-footer a:last").text(), "Cancel");
                });

                // @todo implement
                it("has focus on the text input");
            });

            describe("with two arguments", function() {
                describe("where the second argument is a string", function() {
                    before(function() {
                        box = bootbox.prompt("Hello world!", "Foo");
                    });

                    it("shows the expected heading", function() {
                        assert.equal(
                            box.find(".modal-header h3").text(),
                            "Hello world!"
                        );
                    });

                    it("shows an OK button", function() {
                        assert.equal(box.find(".modal-footer a:first").html(), "OK");
                    });

                    it("shows the custom Cancel label", function() {
                        assert.equal(box.find(".modal-footer a:last").html(), "Foo");
                    });
                });

                describe("where the second argument is a function", function() {
                    before(function() {
                        box = bootbox.prompt("Hello world!", function() { });
                    });

                    it("shows an OK button", function() {
                        assert.equal(box.find(".modal-footer a:first").html(), "OK");
                    });

                    it("shows a Cancel button", function() {
                        assert.equal(box.find(".modal-footer a:last").html(), "Cancel");
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
                            box.find(".modal-header h3").text(),
                            "Hello world!"
                        );
                    });

                    it("shows the custom OK label", function() {
                        assert.equal(box.find(".modal-footer a:first").html(), "Bar");
                    });

                    it("shows the custom Cancel label", function() {
                        assert.equal(box.find(".modal-footer a:last").html(), "Foo");
                    });
                });

                describe("where the third argument is a function", function() {
                    before(function() {
                        box = bootbox.prompt("Hello world!", "Foo", function() { });
                    });

                    it("shows the default OK label", function() {
                        assert.equal(box.find(".modal-footer a:first").html(), "OK");
                    });
                });
            });

            describe("with four arguments", function() {
                before(function() {
                    box = bootbox.prompt("Hello world!", "Foo", "Bar", function() {});
                });

                it("shows the expected heading", function() {
                    assert.equal(
                        box.find(".modal-header h3").text(),
                        "Hello world!"
                    );
                });

                it("shows the custom OK label", function() {
                    assert.equal(box.find(".modal-footer a:first").html(), "Bar");
                });

                it("shows the custom Cancel label", function() {
                    assert.equal(box.find(".modal-footer a:last").html(), "Foo");
                });
            });

            describe("with five arguments", function() {
                it("throws an error", function() {
                    assert.throws(function() {
                        bootbox.prompt(1, 2, 3, 4, 5);
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
                        box.find(".modal-footer a:first").trigger('click');
                        assert.equal(result, "Foo Bar");
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

                    it("should invoke the callback with a value null", function() {
                        box.find(".modal-footer a:last").trigger('click');
                        assert.isNull(result);
                    });
                });

                describe("when pressing escape", function() {
                    var called = false;
                    before(function() {
                        box = bootbox.confirm("Sure?", function(cbResult) {
                            called = true;
                        });
                    });

                    it("should not invoke the callback", function() {
                        var e = jQuery.Event("keyup.modal", {which: 27});
                        $(document).trigger(e);

                        assert.isFalse(called);
                    });
                });

                /**
                 * we can't test for this since "shown" is called synchronously when
                 * bootbox.animate = false. Therefore, by the time .prompt() tries to
                 * bind its own handler (currently line 284) it's too late; the element
                 * is already shown so the handler won't ever fire
                 */
                /*
                describe("when submitting the form", function() {
                    var result;
                    before(function(done) {
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
                */
            });
        });
    });

    describe("locales", function() {
        var box1;
        var box2;

        it("should throw an error when setting an invalid locale", function() {
            assert.throws(function() {
                bootbox.setLocale('xx')
            });
        });

        describe("en", function() {
            before(function() {
                bootbox.setLocale('en');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Cancel");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "OK");
            });
        });

        describe("fr", function() {
            before(function() {
                bootbox.setLocale('fr');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Annuler");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "D'accord");
            });
        });

        describe("de", function() {
            before(function() {
                bootbox.setLocale('de');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Abbrechen");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "Akzeptieren");
            });
        });

        describe("es", function() {
            before(function() {
                bootbox.setLocale('es');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Cancelar");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "Aceptar");
            });
        });

        describe("br", function() {
            before(function() {
                bootbox.setLocale('br');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Cancelar");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "Sim");
            });
        });

        describe("nl", function() {
            before(function() {
                bootbox.setLocale('nl');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Annuleren");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "Accepteren");
            });
        });

        describe("ru", function() {
            before(function() {
                bootbox.setLocale('ru');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:first").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:last").text(), "Отмена");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:first").text(), "Применить");
            });
        });
    });
});
