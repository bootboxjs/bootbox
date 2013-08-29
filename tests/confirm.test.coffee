describe "bootbox.confirm", ->
  beforeEach ->
    bootbox.init()

  describe "basic usage tests", ->

    describe "with one argument", ->

      describe "where the argument is not an object", ->
        beforeEach ->
          @create = -> bootbox.confirm "Are you sure?"

        it "throws an error", ->
          expect(@create).to.throw /confirm requires a callback/

      describe "where the argument is an object", ->
        beforeEach ->
          @options = {}
          @create = => @dialog = bootbox.confirm @options

        describe "with a message property", ->
          beforeEach ->
            @options.message = "Are you sure?"

          it "throws an error requiring a callback", ->
            expect(@create).to.throw /confirm requires a callback/

        describe "with a callback property", ->
          describe "where the callback is not a function", ->
            beforeEach ->
              @options.callback = "Are you sure?"

            it "throws an error requiring a callback", ->
              expect(@create).to.throw /confirm requires a callback/

          describe "where the callback is a function", ->
            beforeEach ->
              @options.callback = -> true

            it "throws an error requiring a message", ->
              expect(@create).to.throw /Please specify a message/

        describe "with a message and a callback", ->
          beforeEach ->
            @options =
              callback: -> true
              message: "Are you sure?"

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
            @dialog = bootbox.confirm "Are you sure?", "callback here"

        it "throws an error requiring a callback", ->
          expect(@create).to.throw /confirm requires a callback/

      describe "where the second argument is a function", ->
        beforeEach ->
          @create = =>
            @dialog = bootbox.confirm "Are you sure?", -> true

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

        it "shows the dialog", ->
          expect(@dialog.is(":visible")).to.be.true

  describe "configuration options tests", ->
    beforeEach ->
      @options =
        message: "Are you sure?"
        callback: -> true

      @create = =>
        @dialog = bootbox.confirm @options

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
          "Bad key":
            label: "Custom confirm"
            className: "btn-warning"

      it "throws an error", ->
        expect(@create).to.throw /key is not allowed/

  describe "callback tests", ->
    describe "with a simple callback", ->
      beforeEach ->
        @callback = sinon.spy()

        @dialog = bootbox.confirm
          message: "Are you sure?"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      describe "when dismissing the dialog by clicking OK", ->
        beforeEach ->
          @dialog.find(".btn-primary").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly true

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly false

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly false

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

    describe "with a callback which returns false", ->
      beforeEach ->
        @callback = sinon.stub()
        @callback.returns false

        @dialog = bootbox.confirm
          message: "Are you sure?"
          callback: @callback

        @hidden = sinon.spy @dialog, "modal"

      describe "when dismissing the dialog by clicking OK", ->
        beforeEach ->
          @dialog.find(".btn-primary").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly true

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly false

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly false

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called
