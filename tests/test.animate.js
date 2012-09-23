describe("animate", function() {
    var box;

    before(function() {
        bootbox.animate(false);
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

        it("should not apply the fade class to the modal", function() {
            assert.isFalse(box.hasClass("fade"));
        });

        describe("but when passed as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"animate": true});
            });

            it("should apply the fade class to the modal", function() {
                assert.isTrue(box.hasClass("fade"));
            });
        });

    });

    describe("when enabled", function() {
        before(function() {
            bootbox.animate(true);
            box = bootbox.dialog("foo");
        });

        it("should apply the fade class to the modal", function() {
            assert.isTrue(box.hasClass("fade"));
        });

        describe("but when passed as false an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"animate": false});
            });

            it("should not apply the fade class to the modal", function() {
                assert.isFalse(box.hasClass("fade"));
            });
        });
    });

});
