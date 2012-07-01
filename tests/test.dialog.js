describe("#dialog", function() {
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
            box = bootbox.dialog("Foo");
        });

        it("displays the correct body copy", function() {
            assert.equal(box.find(".modal-body").text(), "Foo");
        });

        it("displays no footer", function() {
            assert.equal(box.find(".modal-footer").length, 0);
        });

        it("displays no header", function() {
            assert.equal(box.find(".modal-header").length, 0);
        });

        it("applies the bootbox class to the modal", function() {
            assert.isTrue(box.hasClass("bootbox"));
        });
    });

    describe("with two arguments", function() {
        describe("where the second argument is an object of string => function", function() {
            var called = false;
            before(function() {
                box = bootbox.dialog("Foo", {
                    "My Label": function() {
                        called = true;
                    }
                });
            });

            it("should show a footer", function() {
                assert.ok(box.find(".modal-footer"));
            });

            it("should show the correct label text", function() {
                assert.equal(box.find("a:first").text(), "My Label");
            });

            it("should apply the primary class to the button", function() {
                assert.isTrue(box.find("a:first").hasClass("btn-primary"));
            });

            describe("when clicking the button", function() {
                it("should invoke the callback", function() {
                    box.find("a:first").trigger('click');
                    assert.isTrue(called);
                });

                it("should close the dialog", function() {
                    assert.isTrue(box.is(":hidden"));
                });
            });
        });

        describe("where the second argument is an object", function() {
            describe("when all expected properties are present", function() {
                var called = false;
                before(function() {
                    box = bootbox.dialog("Foo", {
                        "class": "my-class",
                        "label": "My Button",
                        "icon": "my-icon-class",
                        "callback": function() {
                            called = true;
                        }
                    });
                });

                it("should show the correct label text", function() {
                    // this is correct; the presence of the icon means we get a space
                    assert.equal(box.find("a:first").text(), " My Button");
                });

                it("should apply the correct class to the button", function() {
                    assert.isTrue(box.find("a:first").hasClass("my-class"));
                });

                it("should not apply the primary class to the button", function() {
                    assert.isFalse(box.find("a:first").hasClass("btn-primary"));
                });

                it("should add an icon element to the button", function() {
                    assert.ok(box.find("a:first i.my-icon-class").length);
                });

                describe("when clicking the button", function() {
                    it("should invoke the callback", function() {
                        box.find("a:first").trigger('click');
                        assert.isTrue(called);
                    });

                    it("should close the dialog", function() {
                        assert.isTrue(box.is(":hidden"));
                    });
                });
            });

            describe("when only the callback property is present", function() {
                var called = false;
                before(function() {
                    box = bootbox.dialog("Foo", {
                        "callback": function() {
                            called = true;
                        }
                    });
                });

                it("should show the default fallback label text", function() {
                    // this is correct; the presence of the icon means we get a space
                    assert.equal(box.find("a:first").text(), "Option 1");
                });

                it("should apply the primary class to the button", function() {
                    assert.isTrue(box.find("a:first").hasClass("btn-primary"));
                });

                it("should not add an icon element to the button", function() {
                    assert.equal(box.find("a:first i").length, 0);
                });

                describe("when clicking the button", function() {
                    it("should invoke the callback", function() {
                        box.find("a:first").trigger('click');
                        assert.isTrue(called);
                    });

                    it("should close the dialog", function() {
                        assert.isTrue(box.is(":hidden"));
                    });
                });
            });
        });

        describe("where the second argument is an array", function() {
            describe("when the array is empty", function() {
                before(function() {
                    box = bootbox.dialog("Foo", []);
                });

                it("displays the correct body copy", function() {
                    assert.equal(box.find(".modal-body").text(), "Foo");
                });

                it("displays no footer", function() {
                    assert.equal(box.find(".modal-footer").length, 0);
                });

                it("displays no header", function() {
                    assert.equal(box.find(".modal-header").length, 0);
                });
            });

            describe("where the array has one element", function() {
                describe("when the element is an object of string => function", function() {
                    var called = false;
                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "My Label": function() {
                                called = true;
                            }
                        }]);
                    });

                    it("should show a footer", function() {
                        assert.ok(box.find(".modal-footer"));
                    });

                    it("should show the correct label text", function() {
                        assert.equal(box.find("a:first").text(), "My Label");
                    });

                    it("should apply the primary class to the button", function() {
                        assert.isTrue(box.find("a:first").hasClass("btn-primary"));
                    });

                    describe("when clicking the button", function() {
                        it("should invoke the callback", function() {
                            box.find("a:first").trigger('click');
                            assert.isTrue(called);
                        });

                        it("should close the dialog", function() {
                            assert.isTrue(box.is(":hidden"));
                        });
                    });
                });
            });
        });
    });
});
