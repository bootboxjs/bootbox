describe("Bootbox", function() {

  "use strict";

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

  describe("If $.fn.modal is undefined", function() {
    beforeEach(function() {
      this.oldModal = window.jQuery.fn.modal;
      window.jQuery.fn.modal = undefined;
    });

    afterEach(function() {
      window.jQuery.fn.modal = this.oldModal;
    });

    describe("When invoking a dialog", function() {
      beforeEach(function() {
        try {
          bootbox.alert("Hi", function() {});
        } catch (e) {
          this.e = e;
        }
      });

      it("throws the correct error", function() {
        expect(this.e.message).to.contain("$.fn.modal is not defined");
      });
    });
  });

  describe("adding and removing locales", function() {

    describe("bootbox.addLocale", function() {
      describe("with invalid values", function() {
        beforeEach(function() {
          try {
            bootbox.addLocale("xy", {
              OK: "BTN1"
            });
          } catch (e) {
            this.e = e;
          }
        });

        it("throws the expected error", function() {
          expect(this.e.message).to.equal("Please supply a translation for 'CANCEL'");
        });
      });

      describe("with invalid values", function() {
        beforeEach(function() {
          bootbox
          .addLocale("xy", {
            OK: "BTN1",
            CANCEL: "BTN2",
            CONFIRM: "BTN3"
          })
          .setLocale("xy");

          var d1 = bootbox.alert("foo");
          var d2 = bootbox.confirm("foo", function() { return true; });
          this.labels = {
            ok: d1.find(".btn:first").text(),
            cancel: d2.find(".btn:first").text(),
            confirm: d2.find(".btn:last").text()
          };
        });

        it("shows the expected OK translation", function() {
          expect(this.labels.ok).to.equal("BTN1");
        });
        it("shows the expected CANCEL translation", function() {
          expect(this.labels.cancel).to.equal("BTN2");
        });
        it("shows the expected PROMPT translation", function() {
          expect(this.labels.confirm).to.equal("BTN3");
        });
      });
    });

    describe("bootbox.removeLocale", function () {
      beforeEach(function () {
        bootbox.removeLocale("xy");

        var d1 = bootbox.alert("foo");
        var d2 = bootbox.confirm("foo", function () { return true; });
        this.labels = {
          ok: d1.find(".btn:first").text(),
          cancel: d2.find(".btn:first").text(),
          confirm: d2.find(".btn:last").text()
        };
      });

      it("falls back to the default OK translation", function () {
        expect(this.labels.ok).to.equal("OK");
      });
      it("falls back to the default CANCEL translation", function () {
        expect(this.labels.cancel).to.equal("Cancel");
      });
      it("falls back to the default PROMPT translation", function () {
        expect(this.labels.confirm).to.equal("OK");
      });
    });
  });
});
