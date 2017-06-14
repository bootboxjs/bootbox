describe("bootbox.setTemplates", function () {
  beforeEach(function () {
    this.find = function (selector) {
      return this.dialog.find(selector);
    };
  });

  describe("overwrites default template", function () {
    it("with single parameter", function () {
      bootbox.setTemplates({
        header:
        "<div class='modal-header header-test-for-single'>" +
          "<h4 class='modal-title'></h4>" +
        "</div>"
      });
      this.dialog = bootbox.dialog({
        title: "test",
        message: "test"
      });
      expect(this.find('.modal-header').hasClass("header-test-for-single")).to.be.true;

      bootbox.setTemplates({
        inputs: {
          text: "<input class='bootbox-input bootbox-input-text form-control input-test-for-single' autocomplete=off type='text' />"
        }
      });
      this.dialog = bootbox.prompt("test", function () {});
      expect(this.find('input[type="text"]').hasClass("input-test-for-single")).to.be.true;
    });

    it("with key/value parameters", function () {
      bootbox.setTemplates(
        'header',
        "<div class='modal-header header-test-for-keyvalue'>" +
          "<h4 class='modal-title'></h4>" +
        "</div>"
      );
      this.dialog = bootbox.dialog({
        title: "test",
        message: "test"
      });
      expect(this.find('.modal-header').hasClass("header-test-for-keyvalue")).to.be.true;

      bootbox.setTemplates(
        'inputs',
        {text: "<input class='bootbox-input bootbox-input-text form-control input-test-for-keyvalue' autocomplete=off type='text' />"}
      );
      this.dialog = bootbox.prompt("test", function () {});
      expect(this.find('input[type="text"]').hasClass("input-test-for-keyvalue")).to.be.true;
    });

    it("with nested parameters", function () {
      bootbox.setTemplates(
        'inputs',
        'text',
        "<input class='bootbox-input bootbox-input-text form-control input-test-for-nested' autocomplete=off type='text' />"
      );
      this.dialog = bootbox.prompt("test", function () {});
      expect(this.find('input[type="text"]').hasClass("input-test-for-nested")).to.be.true;
    });
  });
});
