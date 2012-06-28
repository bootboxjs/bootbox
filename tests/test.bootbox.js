describe("Bootbox", function() {
    var box;

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
            before(function() {
                box = bootbox.alert("Hello world!");
            });

            it("shows the expected body copy", function() {
                assert.equal(box.find(".modal-body").html(), "Hello world!");
            });

            it("shows an OK button", function() {
                assert.equal(box.find("a:first").html(), "OK");
            });
        });

        describe("#confirm", function() {
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

            it("shows an Cancel button", function() {
                assert.equal(box.find("a:last").html(), "Cancel");
            });
        });
    });
});
