describe "bootbox.confirm", ->
  describe "basic tests", ->
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

  describe "configuration options tests", ->
