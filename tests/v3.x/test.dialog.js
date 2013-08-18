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

        it("applies an inline overflow: hidden style to the modal", function() {
            assert.equal(box.get(0).style.overflow, "hidden");
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

            it("should have the correct href attribute", function() {
                assert.equal(box.find("a:first").attr("href"), "javascript:;");
            });

            it("should apply the btn class to the button", function() {
                assert.isTrue(box.find("a:first").hasClass("btn"));
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

                it("should have the correct href attribute", function() {
                    assert.equal(box.find("a:first").attr("href"), "javascript:;");
                });

                it("should apply the btn class to the button", function() {
                    assert.isTrue(box.find("a:first").hasClass("btn"));
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

            describe("when the href property is overridden", function() {
                var called = false;
                before(function() {
                    box = bootbox.dialog("Foo", {
                        "label": "My Button",
                        "href": "javascript: ;",
                        "callback": function() {
                            called = true;
                        }
                    });
                });

                it("should have the correct href attribute", function() {
                    assert.equal(box.find("a:first").attr("href"), "javascript: ;");
                });

                describe("when clicking the button", function() {
                    it("should not invoke the callback", function() {
                        box.find("a:first").trigger('click');
                        assert.isFalse(called);
                    });

                    it("should not close the dialog", function() {
                        assert.isFalse(box.is(":hidden"));
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

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:first").hasClass("btn"));
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

            describe("where the array has two elements", function() {
                describe("when only supplying label properties", function() {
                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1"
                        }, {
                            "label": "Button 2"
                        }]);
                    });

                    it("should show the correct first button", function() {
                        assert.equal(box.find("a:first").text(), "Button 1");
                    });

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:first").hasClass("btn"));
                    });

                    it("should not apply the primary class to the first button", function() {
                        assert.isFalse(box.find("a:first").hasClass("btn-primary"));
                    });

                    it("should show the correct second button", function() {
                        assert.equal(box.find("a:last").text(), "Button 2");
                    });

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:last").hasClass("btn"));
                    });

                    it("should apply the primary class to the second button", function() {
                        assert.isTrue(box.find("a:last").hasClass("btn-primary"));
                    });
                });

                describe("when supplying a class property to the second button", function() {
                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1"
                        }, {
                            "label": "Button 2",
                            "class": "foo"
                        }]);
                    });

                    it("should show the correct first button", function() {
                        assert.equal(box.find("a:first").text(), "Button 1");
                    });

                    it("should not apply the primary class to the first button", function() {
                        assert.isFalse(box.find("a:first").hasClass("btn-primary"));
                    });

                    it("should show the correct second button", function() {
                        assert.equal(box.find("a:last").text(), "Button 2");
                    });

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:last").hasClass("btn"));
                    });

                    it("should apply the supplied to the second button", function() {
                        assert.isTrue(box.find("a:last").hasClass("foo"));
                    });
                });

                describe("when setting link property to true on the second button", function() {
                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1"
                        }, {
                            "label": "Link 1",
                            "link": true
                        }]);
                    });

                    it("should show the correct first button", function() {
                        assert.equal(box.find("a:first").text(), "Button 1");
                    });

                    it("should not apply the primary class to the first button", function() {
                        assert.isFalse(box.find("a:first").hasClass("btn-primary"));
                    });

                    it("should show the correct second button", function() {
                        assert.equal(box.find("a:last").text(), "Link 1");
                    });
                });
            });

            describe("when supplying a callback for both buttons", function() {
                describe("when clicking the first button", function() {
                    var callback1 = false;
                    var callback2 = false;

                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1",
                            "callback": function() {
                                callback1 = true;
                            }
                        }, {
                            "label": "Button 2",
                            "callback": function() {
                                callback2 = true;
                            }
                        }]);
                    });

                    it("should invoke the correct callback", function() {
                        box.find("a:first").trigger('click');
                        assert.isTrue(callback1);
                        assert.isFalse(callback2);
                    });

                    it("should close the dialog", function() {
                        assert.isTrue(box.is(":hidden"));
                    });
                });

                describe("when clicking the second button", function() {
                    var callback1 = false;
                    var callback2 = false;

                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1",
                            "callback": function() {
                                callback1 = true;
                            }
                        }, {
                            "label": "Button 2",
                            "callback": function() {
                                callback2 = true;
                            }
                        }]);
                    });

                    it("should invoke the correct callback", function() {
                        box.find("a:last").trigger('click');
                        assert.isTrue(callback2);
                        assert.isFalse(callback1);
                    });

                    it("should close the dialog", function() {
                        assert.isTrue(box.is(":hidden"));
                    });
                });
            });

            describe("where the array has more than two elements", function() {
                describe("when only supplying label properties", function() {
                    before(function() {
                        box = bootbox.dialog("Foo", [{
                            "label": "Button 1"
                        }, {
                            "label": "Button 2"
                        }, {
                            "label": "Button 3"
                        }, {
                            "label": "Button 4"
                        }]);
                    });

                    it("should show the correct first button", function() {
                        assert.equal(box.find("a:eq(0)").text(), "Button 1");
                    });

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:eq(0)").hasClass("btn"));
                    });

                    it("should show the correct second button", function() {
                        assert.equal(box.find("a:eq(1)").text(), "Button 2");
                    });

                    it("should apply the btn class to the button", function() {
                        assert.isTrue(box.find("a:eq(1)").hasClass("btn"));
                    });

                    it("should show the correct third button", function() {
                        assert.equal(box.find("a:eq(2)").text(), "Button 3");
                    });

                    it("should apply the btn class to the third button", function() {
                        assert.isTrue(box.find("a:eq(2)").hasClass("btn"));
                    });

                    it("should show the correct fourth button", function() {
                        assert.equal(box.find("a:eq(3)").text(), "Button 4");
                    });

                    it("should apply the btn class to the fourth button", function() {
                        assert.isTrue(box.find("a:eq(3)").hasClass("btn"));
                    });

                    it("should not apply the btn class to the fourth button", function() {
                        assert.isFalse(box.find("a:eq(3)").hasClass("btn-primary"));
                    });
                });
            });
        });
    });

    describe("with three arguments", function() {
        describe("where the third argument is an object", function() {
            describe("when supplying a header string", function() {
                describe("with no other options", function() {
                    before(function() {
                        box = bootbox.dialog("My Body", {
                            "bar": function() {}
                        }, {
                            "header": "My Header"
                        });
                    });

                    it("should show the correct body", function() {
                        assert.equal(box.find(".modal-body").text(), "My Body");
                    });

                    it("should show the correct header", function() {
                        assert.equal(box.find(".modal-header h4").text(), "My Header");
                    });

                    it("should show a close button", function() {
                        assert.equal(box.find(".modal-header a.close").text(), "×");
                    });
                });

                describe("with a headerCloseButton value of false", function() {
                    before(function() {
                        box = bootbox.dialog("My Body", {
                            "bar": function() {}
                        }, {
                            "header": "My Header",
                            "headerCloseButton": false
                        });
                    });

                    it("should not show a close button", function() {
                        assert.equal(box.find(".modal-header a.close").length, 0);
                    });
                });
            });
        });
    });
});
