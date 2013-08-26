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

      describe "where the argument has a button with an invalid value", ->
        beforeEach ->
          @create = ->
            bootbox.dialog
              message: "test"
              buttons:
                ok: "foo"

        it "throws an error", ->
          expect(@create).to.throw /button with key ok must be an object/

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
      expect(@dialog.next(".modal-backdrop").length).to.equal 1

  describe "when creating a dialog with a button", ->
    beforeEach ->
      @create = (button = {}) =>
        @dialog = bootbox.dialog
          message: "test"
          buttons:
            one: button

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

    describe "when the button has a custom class", ->
      beforeEach ->
        @create
          label: "Test Label"
          className: "btn-custom"

      it "shows the correct button text", ->
        expect(@text(".btn")).to.equal "Test Label"

      it "adds the custom class to the button", ->
        expect(@class(".btn", "btn-custom")).to.be.true

    describe "when the button has no explicit label", ->
      beforeEach ->
        @create = (buttons) ->
          @dialog = bootbox.dialog
            message: "test"
            buttons: buttons

      describe "when its value is an object", ->
        beforeEach ->
          @create
            "Short form":
              className: "btn-custom"
              callback: -> true

        it "uses the key name as the button text", ->
          expect(@text(".btn")).to.equal "Short form"

        it "adds the custom class to the button", ->
          expect(@class(".btn", "btn-custom")).to.be.true

      describe "when its value is a function", ->
        beforeEach ->
          @callback = sinon.spy()
          @create
            my_label: @callback

        it "uses the key name as the button text", ->
          expect(@text(".btn")).to.equal "my_label"

        describe "when dismissing the dialog by clicking the button", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

      describe "when its value is not an object or function", ->
        beforeEach ->
          @badCreate = =>
            @create
              "Short form": "hello world"

        it "throws an error", ->
          expect(@badCreate).to.throw /button with key Short form must be an object/

  describe "when creating a dialog with a title", ->
    beforeEach ->
      @dialog = bootbox.dialog
        title: "My Title"
        message: "test"

    it "has a header", ->
      expect(@exists(".modal-header")).to.be.ok

    it "shows the correct title text", ->
      expect(@text(".modal-title")).to.equal "My Title"

    it "has a close button inside the header", ->
      expect(@exists(".modal-header .close")).to.be.ok

  describe "when creating a dialog with no backdrop", ->
    beforeEach ->
      @dialog = bootbox.dialog
        message: "No backdrop in sight"
        backdrop: false

    it "does not have a backdrop", ->
      expect(@dialog.next(".modal-backdrop").length).to.equal 0

  describe "when creating a dialog with no close button", ->
    beforeEach ->
      @dialog = bootbox.dialog
        message: "No backdrop in sight"
        closeButton: false

    it "does not have a close button inside the body", ->
      expect(@exists(".modal-body .close")).not.to.be.ok

  describe "when creating a dialog with an onEscape handler", ->
    beforeEach ->
      @e = (keyCode) ->
        $(@dialog).trigger($.Event "keyup", which: keyCode)

    describe "with a simple callback", ->
      beforeEach ->
        @callback = sinon.spy()

        @dialog = bootbox.dialog
          message: "Are you sure?"
          onEscape: @callback

        @hidden = sinon.spy @dialog, "modal"
        @trigger = sinon.spy(@dialog, "trigger").withArgs "escape.close.bb"

      describe "when triggering the keyup event", ->

        describe "when the key is not the escape key", ->
          beforeEach -> @e 15

          it "does not trigger the escape event", ->
            expect(@trigger).not.to.have.been.called

          it "should not hide the modal", ->
            expect(@hidden).not.to.have.been.called

        describe "when the key is the escape key", ->
          beforeEach -> @e 27

          it "triggers the escape event", ->
            expect(@trigger).to.have.been.calledWithExactly "escape.close.bb"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

    describe "with a callback which returns false", ->
      beforeEach ->
        @callback = sinon.stub().returns false

        @dialog = bootbox.dialog
          message: "Are you sure?"
          onEscape: @callback

        @hidden = sinon.spy @dialog, "modal"

      describe "when triggering the escape keyup event", ->
        beforeEach -> @e 27

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called
