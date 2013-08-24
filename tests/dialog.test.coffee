describe "bootbox.dialog", ->
  beforeEach ->
    bootbox.init()

    # need to take care with these helpers; don't want too much
    # cleverness in the tests which runs the risk of making them
    # harder to read. Could we look at custom expectations instead?
    @find   = (s)    -> @dialog.find s
    @exists = (s)    -> @find(s).length isnt 0
    @class  = (s, c) -> @find(s).hasClass(c)
    @invoke = (s, m) -> @find(s)[m]()
    @text   = (s)    -> @invoke s, "text"
    @html   = (s)    -> @invoke s, "html"

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

  describe "when creating a minimal dialog", ->
    beforeEach ->
      @dialog = bootbox.dialog
        message: "test"

    it "adds the bootbox class to the dialog", ->
      expect(@dialog.hasClass("bootbox")).to.be.true

    it "adds the bootstrap modal class to the dialog", ->
      expect(@dialog.hasClass("modal")).to.be.true

    it "adds the fade class to the dialog", ->
      expect(@dialog.hasClass("fade")).to.be.true

    it "shows the expected message", ->
      expect(@text(".bootbox-body")).to.equal "test"

    it "does not have a header", ->
      expect(@exists(".modal-header")).not.to.be.ok

    it "has a close button inside the body", ->
      expect(@exists(".modal-body .close")).to.be.ok

    it "does not have a footer", ->
      expect(@exists(".modal-footer")).not.to.be.ok

    it "has a backdrop", ->
      expect(@dialog.next(".modal-backdrop")).to.be.ok

  describe "when creating dialog with a button", ->
    beforeEach ->
      @create = (button = {}) =>
        @dialog = bootbox.dialog
          message: "test"
          buttons:
            one: button

    describe "when the button has no label", ->

      it "throws an error", ->
        expect(@create).to.throw /button with key one requires a label/

    describe "when the button has no callback", ->
      beforeEach ->
        @create
          label: "My Label"

        @hidden = sinon.spy @dialog, "modal"

      it "shows a footer", ->
        expect(@exists(".modal-footer")).to.be.ok

      it "shows one button", ->
        expect(@find(".btn").length).to.equal 1

      it "shows the correct button text", ->
        expect(@text(".btn")).to.equal "My Label"

      it "applies the correct button class", ->
        expect(@class(".btn", "btn-primary")).to.be.true

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

    describe "when the button has a label and callback", ->
      beforeEach ->
        @callback = sinon.spy()

        @create
          label: "Another Label"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      it "shows a footer", ->
        expect(@exists(".modal-footer")).to.be.ok

      it "shows the correct button text", ->
        expect(@text(".btn")).to.equal "Another Label"

      describe "when dismissing the dialog by clicking OK", ->
        beforeEach ->
          @dialog.find(".btn-primary").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should not invoke the callback", ->
          expect(@callback).not.to.have.been.called

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should not invoke the callback", ->
          expect(@callback).not.to.have.been.called

        it "should hide the modal", ->
          expect(@hidden).to.have.been.called
