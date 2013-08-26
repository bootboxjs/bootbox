describe "bootbox.prompt", ->
  beforeEach ->
    bootbox.init()
    @text = (selector) -> @dialog.find(selector).text()

  describe "basic usage tests", ->

    describe "with one argument", ->

      describe "where the argument is not an object", ->
        beforeEach ->
          @create = -> bootbox.prompt "What is your name?"

        it "throws an error", ->
          expect(@create).to.throw /prompt requires a callback/

      describe "where the argument is an object", ->
        beforeEach ->
          @options = {}
          @create = => @dialog = bootbox.prompt @options

        describe "with a title property", ->
          beforeEach ->
            @options.title = "What is your name?"

          it "throws an error requiring a callback", ->
            expect(@create).to.throw /prompt requires a callback/

          describe "and a callback property", ->
            describe "where the callback is not a function", ->
              beforeEach ->
                @options.callback = "Not a function"

              it "throws an error requiring a callback", ->
                expect(@create).to.throw /prompt requires a callback/

        describe "with a callback function", ->
          beforeEach ->
            @options.callback = -> true

          it "throws an error requiring a title", ->
            expect(@create).to.throw /prompt requires a title/

        describe "with a title and a callback", ->
          beforeEach ->
            @options =
              callback: -> true
              title: "What is your name?"

          it "does not throw an error", ->
            expect(@create).not.to.throw Error

          it "creates a dialog object", ->
            expect(@dialog).to.be.an "object"

          it "adds the correct button labels", ->
            expect(@dialog.find(".btn:first").text()).to.equal "Cancel"
            expect(@dialog.find(".btn:last").text()).to.equal "OK"

          it "adds the correct button classes", ->
            expect(@dialog.find(".btn:first").hasClass("btn-default")).to.be.true
            expect(@dialog.find(".btn:last").hasClass("btn-primary")).to.be.true

    describe "with two arguments", ->
      describe "where the second argument is not a function", ->
        beforeEach ->
          @create = =>
            @dialog = bootbox.prompt "What is your name?", "callback here"

        it "throws an error requiring a callback", ->
          expect(@create).to.throw /prompt requires a callback/

      describe "where the second argument is a function", ->
        beforeEach ->
          @create = =>
            @dialog = bootbox.prompt "What is your name?", -> true

        it "does not throw an error", ->
          expect(@create).not.to.throw Error

        it "creates a dialog object", ->
          expect(@dialog).to.be.an "object"

        it "adds the correct button labels", ->
          expect(@text(".btn:first")).to.equal "Cancel"
          expect(@text(".btn:last")).to.equal "OK"

        it "adds the correct button classes", ->
          expect(@dialog.find(".btn:first").hasClass("btn-default")).to.be.true
          expect(@dialog.find(".btn:last").hasClass("btn-primary")).to.be.true

        it "adds the expected dialog title", ->
          expect(@text("h4")).to.equal "What is your name?"

        it "adds a close button", ->
          expect(@dialog.find(".modal-header .close")).to.be.ok

        it "creates a form with a text input", ->
          expect(@dialog.find("form input[type=text]")).to.be.ok

        it "with no default value", ->
          expect(@dialog.find("form input[type=text]").val()).to.equal ""

        it "shows the dialog", ->
          expect(@dialog.is(":visible")).to.be.true

  describe "configuration options tests", ->
    beforeEach ->
      @options =
        title: "What is your name?"
        callback: -> true

      @create = =>
        @dialog = bootbox.prompt @options

    describe "with a custom cancel button", ->
      beforeEach ->
        @options.buttons =
          cancel:
            label: "Custom cancel"
            className: "btn-danger"

        @create()

        @button = @dialog.find(".btn:first")

      it "adds the correct cancel button", ->
        expect(@button.text()).to.equal "Custom cancel"
        expect(@button.hasClass("btn-danger")).to.be.true

    describe "with a custom confirm button", ->
      beforeEach ->
        @options.buttons =
          confirm:
            label: "Custom confirm"
            className: "btn-warning"

        @create()

        @button = @dialog.find(".btn:last")

      it "adds the correct confirm button", ->
        expect(@button.text()).to.equal "Custom confirm"
        expect(@button.hasClass("btn-warning")).to.be.true

    describe "with an unrecognised button key", ->
      beforeEach ->
        @options.buttons =
          prompt:
            label: "Custom confirm"
            className: "btn-warning"

      it "throws an error", ->
        expect(@create).to.throw /key prompt is not allowed/

    describe "setting show to false", ->
      beforeEach ->
        @options.show = false

        @shown = sinon.spy()

        sinon.stub bootbox, "dialog", =>
          on: ->
          off: ->
          modal: @shown

        @create()

      it "does not show the dialog", ->
        expect(@shown).not.to.have.been.called

  describe "callback tests", ->
    describe "with a simple callback", ->
      beforeEach ->
        @callback = sinon.spy()

        @dialog = bootbox.prompt
          title: "What is your name?"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      describe "when entering no value in the text input", ->

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly ""

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when submitting the form", ->
          beforeEach ->
            @dialog.find(".bootbox-form").trigger "submit"

          it "invokes the callback with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly ""

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when entering a value in the text input", ->
        beforeEach ->
          @dialog.find(".bootbox-input").val "Test input"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when submitting the form", ->
          beforeEach ->
            @dialog.find(".bootbox-form").trigger "submit"

          it "invokes the callback with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when dismissing the dialog by clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

    describe "with a callback which returns false", ->
      beforeEach ->
        @callback = sinon.stub()
        @callback.returns false

        @dialog = bootbox.prompt
          title: "What is your name?"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      describe "when entering no value in the text input", ->

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly ""

          it "should not hide the modal", ->
            expect(@hidden).not.to.have.been.called

      describe "when entering a value in the text input", ->
        beforeEach ->
          @dialog.find(".bootbox-input").val "Test input"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should not hide the modal", ->
            expect(@hidden).not.to.have.been.called

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when dismissing the dialog by clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

    describe "with a default value", ->
      beforeEach ->
        @callback = sinon.spy()

        @dialog = bootbox.prompt
          title: "What is your name?"
          value: "Bob"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      it "populates the input with the default value", ->
        expect(@dialog.find(".bootbox-input").val()).to.equal "Bob"

      describe "when entering no value in the text input", ->

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Bob"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null

      describe "when entering a value in the text input", ->
        beforeEach ->
          @dialog.find(".bootbox-input").val "Alice"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Alice"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null
