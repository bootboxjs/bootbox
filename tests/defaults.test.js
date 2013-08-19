describe("bootbox.setDefaults", function() {

  beforeEach(function() {
    this.find = function(selector) {
      return this.dialog.find(selector);
    };
  });

  describe("when setting animate to false", function() {
    beforeEach(function() {
      bootbox.setDefaults({
        animate: false
      });
    });

    describe("when creating a dialog", function() {
      beforeEach(function() {
        this.dialog = bootbox.dialog({
          message: "test"
        });
      });

      it("does not add the fade class to the dialog", function() {
        expect(this.dialog.hasClass("fade")).to.be.false;
      });

      describe("when setting animate to true", function() {
        beforeEach(function() {
          bootbox.setDefaults({
            animate: true
          });
        });

        describe("when creating a dialog", function() {
          beforeEach(function() {
            this.dialog = bootbox.dialog({
              message: "test"
            });
          });

          it("adds the fade class to the dialog", function() {
            expect(this.dialog.hasClass("fade")).to.be.true;
          });
        });
      });
    });
  });
});
