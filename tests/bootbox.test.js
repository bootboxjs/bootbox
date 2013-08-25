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

  describe("hideAll", function() {
    beforeEach(function() {
      this.hidden = sinon.spy($.fn, "modal");
      bootbox.hideAll();
    });

    it("should hide all .bootbox modals", function() {
      expect(this.hidden).to.have.been.calledWithExactly("hide");
    });
  });

  describe("event listeners", function() {
    describe("hidden.bs.modal", function() {
      beforeEach(function() {
        this.dialog = bootbox.alert("hi");

        this.e = function(target) {
          this.removed = sinon.stub(this.dialog, "remove");

          $(this.dialog).trigger($.Event("hidden.bs.modal", {
            target: target
          }));
        };
      });

      describe("when triggered with the wrong target", function() {
        beforeEach(function() {
          this.e({an: "object"});
        });

        it("does not remove the dialog", function() {
          expect(this.removed).not.to.have.been.called;
        });
      });

      describe("when triggered with the correct target", function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it("removes the dialog", function() {
          expect(this.removed).to.have.been.called;
        });
      });
    });
  });
});
