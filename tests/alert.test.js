describe("bootbox.alert", function() {

  beforeEach(function() {
  });

  describe("with one argument", function() {

    describe("where the argument is a string", function() {
      beforeEach(function() {
        this.dialog = bootbox.alert("Hello world!");

        this.text = function(selector) {
          return this.find(selector).text();
        };

        this.find = function(selector) {
          return this.dialog.find(selector);
        };
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

      it("applies the close class to the close button", function() {
        expect(this.find(".modal-header button").hasClass("close")).to.be.true;
      });

    });
  });
});
