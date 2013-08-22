describe "bootbox.dialog", ->
  beforeEach ->
    invoke = (s, method) => @dialog.find(s)[method]()

    @text   = (s) -> invoke s, "text"
    @html   = (s) -> invoke s, "html"
    @exists = (s) -> @dialog.find(s).length isnt 0

  describe "invalid usage tests", ->

    describe "with no arguments", ->

      beforeEach ->
        @create = -> bootbox.dialog()

      it "throws an error", ->
        expect(@create).to.throw /supply an object/

    describe "with one argument", ->

      describe "where the argument is not an object", ->
        beforeEach ->
          @create = -> bootbox.dialog "test"

        it "throws an error", ->
          expect(@create).to.throw /supply an object/

      describe "where the argument has no message property", ->
        beforeEach ->
          @create = ->
            bootbox.dialog
              invalid: "options"

        it "throws an error", ->
          expect(@create).to.throw /specify a message/

      describe "where the argument has a button with no label", ->
        beforeEach ->
          @create = ->
            bootbox.dialog
              message: "test"
              buttons:
                ok:
                  callback: -> true

        it "throws an error", ->
          expect(@create).to.throw /button with key ok requires a label/

  describe "when creating a simple dialog", ->
    beforeEach ->
      @dialog = bootbox.dialog
        message: "test"
        buttons:
          one:
            label: "My Button"
        
    it "adds the bootbox class to the dialog", ->
      expect(@dialog.hasClass("bootbox")).to.be.true

    it "adds the bootstrap modal class to the dialog", ->
      expect(@dialog.hasClass("modal")).to.be.true

    it "adds the fade class to the dialog", ->
      expect(@dialog.hasClass("fade")).to.be.true

    it "show the expected message", ->
      expect(@text(".bootbox-body")).to.equal "test"

    it "does not have a header", ->
      expect(@exists(".modal-header")).not.to.be.ok

    it "has a close button inside the body", ->
      expect(@exists(".modal-body .close")).to.be.ok

    it "has a footer", ->
      expect(@exists(".modal-footer")).to.be.ok
