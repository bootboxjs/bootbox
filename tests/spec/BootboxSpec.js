describe("Bootbox", function() {

    describe("Initial state", function() {
        it("exists in the global namespace", function() {
            expect(bootbox).toBeDefined();
        });

        it("starts with no visible dialogs", function() {
            expect($(".bootbox")).not.toExist();
        });
    });

    describe("Alerts", function() {
        var box;

        beforeEach(function() {
            box = null;
        });

        afterEach(function() {
            // remove box cleanly
        });

        it("shows an OK button when invoked with a single argument", function() {
            box = bootbox.alert("Hello world!");

            expect($("a", box)).toHaveText("OK");
        });
    });
});
