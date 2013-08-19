describe("bootbox.dialog", function() {

  describe("with one argument", function() {

    describe("where the argument is not an object", function() {
      beforeEach(function() {
        this.create = function() {
          this.dialog = bootbox.dialog("test");
        };
      });

      it("throws an error", function() {
        expect(this.create).to.throw(/supply an object/);
      });
    });

    describe("where the argument has no message property", function() {
      beforeEach(function() {
        this.create = function() {
          this.dialog = bootbox.dialog({
            invalid: "options"
          });
        };
      });

      it("throws an error", function() {
        expect(this.create).to.throw(/specify a message/);
      });
    });
  });
});
