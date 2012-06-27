describe("Bootbox", function() {

    describe("Initial state", function() {
        it("exists in the global namespace", function() {
            assert.ok(bootbox);
        });

        it("starts with no visible dialogs", function() {
            assert.equal($(".bootbox").length, 0);
        });
    });
    
    describe("#alert", function() {
        it("shows an OK button when invoked with a single argument", function() {
            var box = bootbox.alert("Hello world!");

            assert.equal($(".bootbox a:first").html(), "OK");
        });
    });
});
