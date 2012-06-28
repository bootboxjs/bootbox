describe("Bootbox", function() {
    var box;

    before(function() {
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

    describe("class methods", function() {
        describe("#setLocale", function() {
            it("should throw an error when setting an invalid locale", function() {
                assert.throws(function() {
                    bootbox.setLocale('xx')
                });
            });
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
        });
    });

    describe("locales", function() {
        var box1;
        var box2;

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
