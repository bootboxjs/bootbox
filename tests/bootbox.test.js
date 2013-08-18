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

  it("starts with no dialogs in the DOM", function() {
    expect($(".bootbox").length).to.equal(0);
  });
});
