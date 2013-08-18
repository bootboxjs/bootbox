describe("#setBtnIcons", function() {
    var box;

    before(function() {
        bootbox.animate(false);

        bootbox.setBtnClasses({
            CONFIRM: 'btn-danger',
            CANCEL: 'btn-primary',
            OK: 'btn-inverse'
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

        it("should change the default button class for the OK button", function() {
            assert.isTrue(box.find("a:last").hasClass("btn-inverse"));
        });
    });

    describe("when invoking a confirm dialog", function() {
        before(function() {
            box = bootbox.confirm("Hello world!");
        });

        it("should change the default button class for the CONFIRM button", function() {
            assert.isTrue(box.find("a:last").hasClass("btn-danger"));
        });

        it("should change the default button class for the CANCEL button", function() {
            assert.isTrue(box.find("a:first").hasClass("btn-primary"));
        });
    });

    describe("when invoking a prompt dialog", function() {
        before(function() {
            box = bootbox.prompt("Hello world!");
        });

        it("should change the default button class for the CONFIRM button", function() {
            assert.isTrue(box.find(".modal-footer a:last").hasClass("btn-danger"));
        });

        it("should change the default button class for the CANCEL button", function() {
            assert.isTrue(box.find(".modal-footer a:first").hasClass("btn-primary"));
        });
    });
});
