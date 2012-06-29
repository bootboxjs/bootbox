describe("animate", function() {
    var box;

    before(function() {
        bootbox.animate(true);
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });

    describe("when enabled", function() {
        before(function() {
            box = bootbox.dialog("foo");
        });

        it("should apply the correct class to the modal", function() {
            assert.isTrue(box.hasClass("fade"));
        });
    });

    describe("when disabled but passed as an option", function() {
        before(function() {
            bootbox.animate(false);
            box = bootbox.dialog("foo", [], {"animate": true});
        });

        it("should apply the correct class to the modal", function() {
            assert.isTrue(box.hasClass("fade"));
        });
    });
});
