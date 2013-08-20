describe("Bootbox", function() {

  it("is attached to the window object", function() {
    expect(window.bootbox).to.be.an("object");
  });

  it("exposes the correct public API", function() {
    expect(bootbox.alert).to.be.a("function");
    expect(bootbox.confirm).to.be.a("function");
    expect(bootbox.dialog).to.be.a("function");
    expect(bootbox.setDefaults).to.be.a("function");
    expect(bootbox.hideAll).to.be.a("function");
  });

  // @TODO reimplement
  xit("starts with no dialogs in the DOM", function() {
    expect($(".bootbox").length).to.equal(0);
  });

  // very basic smoke tests; nothing too serious here please
  describe("when creating a simple dialog", function() {
    beforeEach(function() {
      this.dialog = bootbox.dialog({
        message: "test"
      });
    });

    it("adds the bootbox class to the dialog", function() {
      expect(this.dialog.hasClass("bootbox")).to.be.true;
    });

    it("adds the bootstrap modal class to the dialog", function() {
      expect(this.dialog.hasClass("modal")).to.be.true;
    });

    it("adds the fade class to the dialog", function() {
      expect(this.dialog.hasClass("fade")).to.be.true;
    });
  });

});
