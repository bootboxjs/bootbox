describe("backdrop", function() {
    var box;

    before(function() {
        bootbox.backdrop(false);
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });

    describe("when disabled", function() {
        before(function() {
            box = bootbox.dialog("foo");
        });

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

    describe("when enabled", function() {
        before(function() {
            bootbox.backdrop(true);
            box = bootbox.dialog("foo");
        });

        it("should add the backdrop element", function() {
            assert.equal(box.next(".modal-backdrop").length, 1);
        });

        describe("but when passed as false as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"backdrop": false});
            });

            it("should add the backdrop element", function() {
                assert.equal(box.next(".modal-backdrop").length, 0);
            });
        });
    });

});
