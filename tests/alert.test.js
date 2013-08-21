describe("bootbox.alert", function() {

  "use strict";

  var self;

  beforeEach(function() {
    self = this;

    this.text = function(selector) {
      return this.find(selector).text();
    };

    this.find = function(selector) {
      return this.dialog.find(selector);
    };
  });

  describe("basic usage tests", function() {

    describe("with one argument", function() {

      describe("where the argument is a string", function() {
        beforeEach(function() {
          this.dialog = bootbox.alert("Hello world!");
        });

        it("shows the expected body copy", function() {
          expect(this.text(".modal-body")).to.equal("Hello world!");
        });

        it("shows an OK button", function() {
          expect(this.text(".modal-footer button:first")).to.equal("OK");
        });

        it("applies the primary class to the button", function() {
          expect(this.find(".modal-footer button:first").hasClass("btn-primary")).to.be.true;
        });

        it("shows a close button", function() {
          expect(this.text(".modal-header button")).to.equal("×");
        });

        it("shows an empty title", function() {
          expect(this.text("h4")).to.equal(" ");
        });

        it("applies the close class to the close button", function() {
          expect(this.find(".modal-header button").hasClass("close")).to.be.true;
        });

      });
    });

    describe("with two arguments", function() {
      describe("where the second argument is not a function", function() {
        beforeEach(function() {
          this.create = function() {
            bootbox.alert("Hello world!", "not a callback");
          };
        });

        it("throws an error requiring a callback", function() {
          expect(this.create).to.throw(/alert requires callback property to be a function when provided/);
        });
      });

      describe("where the second argument is a function", function() {
        beforeEach(function() {
          this.create = function() {
            self.dialog = bootbox.alert("Hello world!", function() {});
          };
        });

        it("does not throw an error", function() {
          expect(this.create).not.to.throw(Error);
        });
      });
    });
  });

  describe("configuration options tests", function() {
    beforeEach(function() {
      this.options = {
        message: "Hello world",
        callback: function() {}
      };

      this.create = function() {
        self.dialog = bootbox.alert(self.options);
      };
    });

    describe("with a custom ok button", function() {
      beforeEach(function() {
        this.options.buttons = {
          ok: {
            label: "Custom OK",
            className: "btn-danger"
          }
        };

        this.create();

        this.button = this.dialog.find(".btn:first");
      });

      it("adds the correct ok button", function() {
        expect(this.button.text()).to.equal("Custom OK");
        expect(this.button.hasClass("btn-danger")).to.be.true;
      });
    });

    describe("with a custom title", function() {
      beforeEach(function() {
        this.options.title = "Hello?";
        this.create();
      });

      it("shows the correct title", function() {
        expect(this.text("h4")).to.equal("Hello?");
      });
    });
  });

  describe("callback tests", function() {
    describe("with a simple callback", function() {
      beforeEach(function() {
        this.callback = sinon.spy();

        this.dialog = bootbox.alert({
          message:"Hello!",
          callback: this.callback
        });

        this.hidden = sinon.spy(this.dialog, "modal");
      });

      describe("when dismissing the dialog by clicking OK", function() {
        beforeEach(function() {
          this.dialog.find(".btn-primary").trigger("click");
        });

        it("should invoke the callback", function() {
          expect(this.callback).to.have.been.called;
        });

        it("should hide the modal", function() {
          expect(this.hidden).to.have.been.calledWithExactly("hide");
        });
      });
    });
  });
});
