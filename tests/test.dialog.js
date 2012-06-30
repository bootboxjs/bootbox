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
    });
});
