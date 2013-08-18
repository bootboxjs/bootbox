describe("Initial state", function() {
    it("exists in the global namespace", function() {
        assert.ok(bootbox);
    });

    it("starts with no dialogs in the DOM", function() {
        assert.equal($(".bootbox").length, 0);
    });
});
