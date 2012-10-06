describe("backdrop", function() {
    var box;

    before(function() {
        bootbox.animate(false);
    });

    var hide = function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    };

    describe("by default", function() {
        before(function() {
            box = bootbox.dialog("foo");
        });

        after(hide);

        it("should add the backdrop element", function() {
            assert.equal(box.next(".modal-backdrop").length, 1);
        });

        describe("when clicking the backdrop", function() {
            before(function() {
                $(".modal-backdrop").click();
            });

            // because by default backdrop should === 'static'
            it("should still keep the dialog shown", function() {
                assert.equal($(".bootbox").length, 1);
            });
        });
    });

    describe("when disabled", function() {
        before(function() {
            bootbox.backdrop(false);
            box = bootbox.dialog("foo");
        });

        after(hide);

        it("should not add the backdrop element", function() {
            assert.equal(box.next(".modal-backdrop").length, 0);
        });

        describe("but when passed as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"backdrop": true});
            });

            it("should add the backdrop element", function() {
                assert.equal(box.next(".modal-backdrop").length, 1);
            });
        });

    });

    describe("when set to true", function() {
        before(function() {
            bootbox.backdrop(true);
            box = bootbox.dialog("foo");
        });

        after(hide);

        it("should add the backdrop element", function() {
            assert.equal(box.next(".modal-backdrop").length, 1);
        });

        describe("when clicking the backdrop", function() {
            before(function() {
                $(".modal-backdrop").click();
            });

            it("should dismiss the dialog", function() {
                assert.equal($(".bootbox").length, 0);
            });
        });

        describe("but when passed as false as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"backdrop": false});
            });

            it("should not add the backdrop element", function() {
                assert.equal(box.next(".modal-backdrop").length, 0);
            });
        });
    });

});
