describe "bootbox.prompt", ->
  beforeEach ->
    window.bootbox = bootbox.init()

    @find   = (selector) -> @dialog.find selector
    @text   = (selector) -> @find(selector).text()
    @exists = (selector) -> @find(selector).length isnt 0

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

          it "applies the bootbox-prompt class to the dialog", ->
            expect(@dialog.hasClass("bootbox-prompt")).to.be.true

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

    describe "invalid prompt type", ->
      beforeEach ->
        @options.inputType = 'foobar'

      it "throws an error", ->
        expect(@create).to.throw /invalid prompt type/

    describe "setting inputType text", ->
      beforeEach ->
        @options.inputType = "text"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows text input ", ->
          expect(@exists("input[type='text']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='text']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='text']").hasClass("bootbox-input-text")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "John Smith"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='text']").val()).to.equal "John Smith"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter your name"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='text']").prop("placeholder")).to.equal "enter your name"

      describe "with pattern", ->
        beforeEach ->
          @options.pattern = "\d{1,2}/\d{1,2}/\d{4}"
          @create()

        it "has correct pattern value", ->
          expect(@find("input[type='text']").prop("pattern")).to.equal "\d{1,2}/\d{1,2}/\d{4}"

      describe "with maxlength", ->
        beforeEach ->
          @options.maxlength = 5
          @create()

        it "has correct maxlength value", ->
          expect(@find("input[type='text']").prop("maxlength")).to.equal 5

    describe "setting inputType textarea", ->
      beforeEach ->
        @options.inputType = "textarea"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows text input", ->
          expect(@exists("textarea")).to.be.ok

        it "has proper class", ->
          expect(@find("textarea").hasClass("bootbox-input")).to.be.ok
          expect(@find("textarea").hasClass("bootbox-input-textarea")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "Once upon a time..."
          @create()

        it "has correct default value", ->
          expect(@find("textarea").val()).to.equal "Once upon a time..."

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter your favorite fairy tale"
          @create()

        it "has correct placeholder value", ->
          expect(@find("textarea").prop("placeholder")).to.equal "enter your favorite fairy tale"

    describe "setting inputType email", ->
      beforeEach ->
        @options.inputType = "email"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows email input", ->
          expect(@exists("input[type='email']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='email']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='email']").hasClass("bootbox-input-email")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "john@smith.com"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='email']").val()).to.equal "john@smith.com"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter your email"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='email']").prop("placeholder")).to.equal "enter your email"

      describe "with pattern", ->
        beforeEach ->
          @options.pattern = "\d{1,2}/\d{1,2}/\d{4}"
          @create()

        it "has correct pattern value", ->
          expect(@find("input[type='email']").prop("pattern")).to.equal "\d{1,2}/\d{1,2}/\d{4}"

    describe "setting inputType password", ->
      beforeEach ->
        @options.inputType = "password"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows password input", ->
          expect(@exists("input[type='password']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='password']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='password']").hasClass("bootbox-input-password")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "qwerty"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='password']").val()).to.equal "qwerty"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter your password"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='password']").prop("placeholder")).to.equal "enter your password"

    describe "setting inputType select", ->
      describe "without options", ->
        beforeEach ->
          @options.inputType = 'select'

        it "throws an error", ->
          expect(@create).to.throw /prompt with select requires options/

      describe "with invalid options", ->
        beforeEach ->
          @options.inputType = 'select'
          @options.inputOptions = 'foo'

        it "throws an error", ->
          expect(@create).to.throw "Please pass an array of input options"

      describe "with empty options", ->
        beforeEach ->
          @options.inputType = 'select'
          @options.inputOptions = []

        it "throws an error", ->
          expect(@create).to.throw /prompt with select requires options/

      describe "with options in the wrong format", ->
        beforeEach ->
          @options.inputType = "select"
          @options.inputOptions = [{foo: "bar"}]

        it "throws an error", ->
          expect(@create).to.throw /given options in wrong format/

      describe "with a value but no text", ->
        beforeEach ->
          @options.inputType = 'select'
          @options.inputOptions = [{value: 'bar'}]

        it "throws an error", ->
          expect(@create).to.throw /given options in wrong format/

      describe "with an invalid second options", ->
        beforeEach ->
          @options.inputType = 'select'
          @options.inputOptions = [
            {value: "bar", text: "bar"}
            {text: "foo"}
          ]

        it "throws an error", ->
          expect(@create).to.throw /given options in wrong format/


      describe "with valid options", ->
        beforeEach ->
          @options.inputType = "select"
          @options.inputOptions = [{value: 1, text: 'foo'},{value: 2, text: 'bar'},{value: 3, text: 'foobar'}]

          @create()

        it "shows select input", ->
          expect(@exists("select")).to.be.ok

        it "has proper class", ->
          expect(@find("select").hasClass("bootbox-input")).to.be.ok
          expect(@find("select").hasClass("bootbox-input-select")).to.be.ok

        it "with three options", ->
          expect(@find("option").length).to.equal 3

      describe "with zero as the first option", ->
        beforeEach ->
          @options.inputType = "select"
          @options.inputOptions = [{value: 0, text: "foo"}]

          @create()

        it "shows the select input", ->
          expect(@exists("select")).to.be.ok

      describe "with false as the first option", ->
        beforeEach ->
          @options.inputType = "select"
          @options.inputOptions = [{value: false, text: "foo"}]

          @create()

        it "shows the select input", ->
          expect(@exists("select")).to.be.ok

      describe "with option groups", ->
        beforeEach ->
          @options.inputType = 'select'
          @options.inputOptions = [
            {value: 1, group: 'foo', text: 'foo'}
            {value: 2, group: 'bar', text: 'bar'}
            {value: 3, group: 'foo', text: 'foobar'}
            {value: 4, group: 'bar', text: 'barfoo'}
          ]

          @create()

        it "shows select input", ->
          expect(@exists("select")).to.be.ok

        it "has proper class", ->
          expect(@find("select").hasClass("bootbox-input")).to.be.ok
          expect(@find("select").hasClass("bootbox-input-select")).to.be.ok

        it "with two option group", ->
          expect(@find("optgroup").length).to.equal 2

        it "with four options", ->
          expect(@find("option").length).to.equal 4

    describe "setting inputType checkbox", ->
      describe "without options", ->
        beforeEach ->
          @options.inputType = 'checkbox'

        it "throws an error", ->
            expect(@create).to.throw /prompt with checkbox requires options/

      describe "with options in the wrong format", ->
        beforeEach ->
          @options.inputType = "checkbox"
          @options.inputOptions = [{foo: "bar"}]

        it "throws an error", ->
          expect(@create).to.throw /given options in wrong format/

      describe "with options", ->
        beforeEach ->
          @options.inputType = 'checkbox'
          @options.inputOptions = [
            {value: 1, text: 'foo'}
            {value: 2, text: 'bar'}
            {value: 3, text: 'foobar'}
          ]

          @create()

        it "shows checkbox input", ->
          expect(@exists("input[type='checkbox']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='checkbox']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='checkbox']").hasClass("bootbox-input-checkbox")).to.be.ok

        it "with three checkboxes", ->
          expect(@find("input[type='checkbox']").length).to.equal 3

    describe "setting inputType date", ->
      beforeEach ->
        @options.inputType = "date"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows date input ", ->
          expect(@exists("input[type='date']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='date']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='date']").hasClass("bootbox-input-date")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "17/08/2005"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='date']").val()).to.equal "17/08/2005"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter the date"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='date']").prop("placeholder")).to.equal "enter the date"

      describe "with pattern", ->
        beforeEach ->
          @options.pattern = "\d{1,2}/\d{1,2}/\d{4}"
          @create()

        it "has correct pattern value", ->
          expect(@find("input[type='date']").prop("pattern")).to.equal "\d{1,2}/\d{1,2}/\d{4}"

    describe "setting inputType time", ->
      beforeEach ->
        @options.inputType = "time"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows time input", ->
          expect(@exists("input[type='time']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='time']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='time']").hasClass("bootbox-input-time")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "19:02"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='time']").val()).to.equal "19:02"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter the time"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='time']").prop("placeholder")).to.equal "enter the time"

      describe "with pattern", ->
        beforeEach ->
          @options.pattern = "\d{1,2}/\d{1,2}/\d{4}"
          @create()

        it "has correct pattern value", ->
          expect(@find("input[type='time']").prop("pattern")).to.equal "\d{1,2}/\d{1,2}/\d{4}"

    describe "setting inputType number", ->
      beforeEach ->
        @options.inputType = "number"

      describe "without default value", ->
        beforeEach ->
          @create()

        it "shows number input ", ->
          expect(@exists("input[type='number']")).to.be.ok

        it "has proper class", ->
          expect(@find("input[type='number']").hasClass("bootbox-input")).to.be.ok
          expect(@find("input[type='number']").hasClass("bootbox-input-number")).to.be.ok

      describe "with default value", ->
        beforeEach ->
          @options.value = "300"
          @create()

        it "has correct default value", ->
          expect(@find("input[type='number']").val()).to.equal "300"

      describe "with placeholder", ->
        beforeEach ->
          @options.placeholder = "enter the number"
          @create()

        it "has correct placeholder value", ->
          expect(@find("input[type='number']").prop("placeholder")).to.equal "enter the number"

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly ""

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when submitting the form", ->
          beforeEach ->
            @dialog.find(".bootbox-form").trigger "submit"

          it "invokes the callback with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly ""

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when submitting the form", ->
          beforeEach ->
            @dialog.find(".bootbox-form").trigger "submit"

          it "invokes the callback with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should hide the modal", ->
          expect(@hidden).to.have.been.calledWithExactly "hide"

      describe "when dismissing the dialog by clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Test input"

          it "should not hide the modal", ->
            expect(@hidden).not.to.have.been.called

      describe "when dismissing the dialog by clicking Cancel", ->
        beforeEach ->
          @dialog.find(".btn-default").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when triggering the escape event", ->
        beforeEach ->
          @dialog.trigger "escape.close.bb"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

        it "with the correct value", ->
          expect(@callback).to.have.been.calledWithExactly null

        it "should not hide the modal", ->
          expect(@hidden).not.to.have.been.called

      describe "when dismissing the dialog by clicking the close button", ->
        beforeEach ->
          @dialog.find(".close").trigger "click"

        it "should invoke the callback", ->
          expect(@callback).to.have.been.called

        it "should pass the dialog as `this`", ->
          expect(@callback.thisValues[0]).to.equal @dialog

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Bob"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

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

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "Alice"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null

    describe "with a placeholder", ->
      beforeEach ->
        @callback = sinon.spy()

        @dialog = bootbox.prompt
          title: "What is your name?"
          placeholder: "e.g. Bob Smith"
          callback: -> true

      it "populates the input with the placeholder attribute", ->
        expect(@dialog.find(".bootbox-input").attr("placeholder")).to.equal "e.g. Bob Smith"

    describe "with inputType select", ->
      describe "without a default value", ->
        beforeEach ->
          @callback = sinon.spy()

          @dialog = bootbox.prompt
            title: "What is your IDE?"
            callback: @callback
            inputType: "select"
            inputOptions: [
              {value: '#', text: 'Choose one'},
              {value: 1, text: 'Vim'},
              {value: 2, text: 'Sublime Text'},
              {value: 3, text: 'WebStorm/PhpStorm'},
              {value: 4, text: 'Komodo IDE'},
            ]

          @hidden = sinon.spy @dialog, "modal"

        it "has correct number values in list", ->
          expect(@find(".bootbox-input-select option").length).to.equal 5

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "#"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null

      describe "with a default value", ->
        beforeEach ->
          @callback = sinon.spy()

          @dialog = bootbox.prompt
            title: "What is your IDE?"
            callback: @callback
            value: 1
            inputType: "select"
            inputOptions: [
              {value: '#', text: 'Choose one'},
              {value: 1, text: 'Vim'},
              {value: 2, text: 'Sublime Text'},
              {value: 3, text: 'WebStorm/PhpStorm'},
              {value: 4, text: 'Komodo IDE'},
            ]

          @hidden = sinon.spy @dialog, "modal"

        it "specified option is selected", ->
          expect(@dialog.find(".bootbox-input-select").val()).to.equal "1"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "1"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null

        describe "when changing the selected option and dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".bootbox-input-select").val(3)
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "3"

    describe "with inputType email", ->
      describe "without a default value", ->
        beforeEach ->
          @callback = sinon.spy()

          @dialog = bootbox.prompt
            title: "What is your email?"
            inputType: "email"
            callback: @callback

          @hidden = sinon.spy @dialog, "modal"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "should pass the dialog as `this`", ->
            expect(@callback.thisValues[0]).to.equal @dialog

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

        describe "when entering a value in the email input", ->
          beforeEach ->
            @dialog.find(".bootbox-input-email").val "john@smith.com"

          describe "when dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "should pass the dialog as `this`", ->
              expect(@callback.thisValues[0]).to.equal @dialog

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly "john@smith.com"

          describe "when dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

      describe "with a default value", ->
        beforeEach ->
          @callback = sinon.spy()

          @dialog = bootbox.prompt
            title: "What is your email?"
            inputType: "email"
            value: "john@smith.com"
            callback: @callback

          @hidden = sinon.spy @dialog, "modal"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "john@smith.com"

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when submitting the form", ->
          beforeEach ->
            @dialog.find(".bootbox-form").trigger "submit"

          it "invokes the callback with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly "john@smith.com"

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when changing a value in the email input", ->
          beforeEach ->
            @dialog.find(".bootbox-input-email").val "smith@john.com"

          describe "when dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly "smith@john.com"

          describe "when dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

    describe "with input type checkbox", ->
      describe "without a default value", ->
        beforeEach ->
          @callback = sinon.spy()

          @dialog = bootbox.prompt
            title: "What is your IDE?"
            inputType: 'checkbox'
            inputOptions: [
              {value: 1, text: 'Vim'},
              {value: 2, text: 'Sublime Text'},
              {value: 3, text: 'WebStorm/PhpStorm'},
              {value: 4, text: 'Komodo IDE'},
            ]
            callback: @callback

          @hidden = sinon.spy @dialog, "modal"

        describe "when dismissing the dialog by clicking OK", ->
          beforeEach ->
            @dialog.find(".btn-primary").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with an undefined value", ->
            expect(@callback).to.have.been.calledWithExactly []

          it "should hide the modal", ->
            expect(@hidden).to.have.been.calledWithExactly "hide"

        describe "when dismissing the dialog by clicking Cancel", ->
          beforeEach ->
            @dialog.find(".btn-default").trigger "click"

          it "should invoke the callback", ->
            expect(@callback).to.have.been.called

          it "with the correct value", ->
            expect(@callback).to.have.been.calledWithExactly null

      describe "with default value", ->
        describe "one value checked", ->
          beforeEach ->
            @callback = sinon.spy()

            @dialog = bootbox.prompt
              title: "What is your IDE?"
              callback: @callback
              value: 2
              inputType: "checkbox"
              inputOptions: [
                {value: 1, text: 'Vim'},
                {value: 2, text: 'Sublime Text'},
                {value: 3, text: 'WebStorm/PhpStorm'},
                {value: 4, text: 'Komodo IDE'},
              ]

            @hidden = sinon.spy @dialog, "modal"

          it "specified checkbox is checked", ->
            expect(@dialog.find("input:checkbox:checked").val()).to.equal "2"

          describe "when dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly ["2"]

          describe "when dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

          describe "when changing the checked option and dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find("input:checkbox:checked").prop('checked', false)
              @dialog.find("input:checkbox[value=3]").prop('checked', true)
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

          describe "when changing the selected option and dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find("input:checkbox:checked").prop('checked', false)
              @dialog.find("input:checkbox[value=3]").prop('checked', true)
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly ["3"]

        describe "multiple value checked", ->
          beforeEach ->
            @callback = sinon.spy()

            @dialog = bootbox.prompt
              title: "What is your IDE?"
              callback: @callback
              value: [2, 3]
              inputType: "checkbox"
              inputOptions: [
                {value: 1, text: 'Vim'}
                {value: 2, text: 'Sublime Text'}
                {value: 3, text: 'WebStorm/PhpStorm'}
                {value: 4, text: 'Komodo IDE'}
              ]

            @hidden = sinon.spy @dialog, "modal"

          it "specified checkboxes are checked", ->
            checked = []

            @dialog.find("input:checkbox:checked").each (foo, bar) =>
              checked.push $(bar).val()

            expect(checked).to.deep.equal ["2", "3"]

          describe "when dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly ["2", "3"]

          describe "when dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

          describe "when changing the checked options and dismissing the dialog by clicking Cancel", ->
            beforeEach ->
              @dialog.find("input:checkbox:checked").prop('checked', false)
              @dialog.find("input:checkbox[value=1]").prop('checked', true)
              @dialog.find("input:checkbox[value=4]").prop('checked', true)
              @dialog.find(".btn-default").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly null

          describe "when changing the checked options and dismissing the dialog by clicking OK", ->
            beforeEach ->
              @dialog.find("input:checkbox:checked").prop('checked', false)
              @dialog.find("input:checkbox[value=1]").prop('checked', true)
              @dialog.find("input:checkbox[value=4]").prop('checked', true)
              @dialog.find(".btn-primary").trigger "click"

            it "should invoke the callback", ->
              expect(@callback).to.have.been.called

            it "with the correct value", ->
              expect(@callback).to.have.been.calledWithExactly ["1", "4"]

