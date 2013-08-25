describe("Bootbox", function() {

  beforeEach(function() {
    bootbox.init();
  });

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

  // @TODO reimplement
  xdescribe("hideAll", function() {
    beforeEach(function() {
      this.hidden = sinon.spy($(".bootbox"), "modal");
      bootbox.hideAll();
    });

    it("should hide all .bootbox modals", function() {
      expect(this.hidden).to.have.been.calledWithExactly("hide");
    });
  });
});
