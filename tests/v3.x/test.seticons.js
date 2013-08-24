describe("#setIcons", function() {
    var box;

    before(function() {
        bootbox.animate(false);

        bootbox.setIcons({
            CANCEL: "cancel",
            CONFIRM: "confirm",
            OK: "ok"
        });
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });

    describe("when invoking an alert dialog", function() {
        before(function() {
            box = bootbox.alert("Hello world!");
        });

        it("should add an icon element to the OK button", function() {
            assert.isTrue(box.find("a:last i").hasClass("ok"));
        });
    });

    describe("when invoking a confirm dialog", function() {
        before(function() {
            box = bootbox.confirm("Hello world!");
        });

        it("should add an icon element to the CONFIRM button", function() {
            assert.isTrue(box.find("a:last i").hasClass("confirm"));
        });

        it("should add an icon element to the CANCEL button", function() {
            assert.isTrue(box.find("a:first i").hasClass("cancel"));
        });
    });

    describe("when invoking a prompt dialog", function() {
        before(function() {
            box = bootbox.prompt("Hello world!");
        });

        it("should add an icon element to the CONFIRM button", function() {
            assert.isTrue(box.find(".modal-footer a:last i").hasClass("confirm"));
        });

        it("should add an icon element to the CANCEL button", function() {
            assert.isTrue(box.find(".modal-footer a:first i").hasClass("cancel"));
        });
    });
});
