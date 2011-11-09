describe("Bootbox", function() {
    it("exists in the global namespace", function() {
        expect(bootbox).toBeDefined();
    });

    it("starts with no visible dialogs", function() {
        expect($(".bootbox")).not.toExist();
    });
});
