describe('bootbox.alert', function() {
  'use strict';
  var self;

  beforeEach(function() {
    self = this;

    this.text = function(selector) {
      return this.find(selector).text();
    };

    this.html = function(selector) {
      return this.find(selector).html();
    };

    this.find = function(selector) {
      return this.dialog.find(selector);
    };
  });

  describe('basic usage tests', function() {
    describe('with no arguments', function() {
      beforeEach(function() {
        this.create = function() {
          bootbox.alert();
        };
      });

      it('throws an error regarding argument length', function() {
        expect(this.create).to.throw(/argument length/);
      });
    });

    describe('with one argument', function() {
      describe('where the argument is a string', function() {
        beforeEach(function() {
          this.dialog = bootbox.alert('Hello world!');
        });

        it('applies the bootbox-alert class to the dialog', function() {
          expect(this.dialog.hasClass('bootbox-alert')).to.be.true;
        });

        it('shows the expected body copy', function() {
          expect(this.text('.bootbox-body')).to.equal('Hello world!');
        });

        it('shows an OK button', function() {
          expect(this.text('.modal-footer button:first')).to.equal('OK');
        });

        it('applies the primary class to the button', function() {
          expect(this.find('.modal-footer button:first').hasClass('btn-primary')).to.be.true;
        });
        
        it('applies the bootbox-accept class to the button', function() {
          expect(this.find('.modal-footer button:first').hasClass('bootbox-accept')).to.be.true;
        });

        it('shows a close button inside the body', function() {
          expect(this.text('.modal-body button')).to.equal('×');
        });

        it('applies the close class to the close button', function() {
          expect(this.find('.modal-body button').hasClass('close')).to.be.true;
        });

        it('applies the correct aria-hidden attribute to the close button', function() {
          expect(this.find('button.close').attr('aria-hidden')).to.equal('true');
        });

        it('applies the correct class to the body', function() {
          expect($('body').hasClass('modal-open')).to.be.true;
        });
      });

      describe('where the argument is string containing html', function () {
        beforeEach(function() {
          this.dialog = bootbox.alert('<b>Hello world!</b>');
        });

        it('shows the expected body parsing html to text', function() {
          expect(this.text('.bootbox-body')).to.equal('<b>Hello world!</b>');
        });
      });

      describe('where the argument containes jQuery node', function () {
        beforeEach(function() {
          this.dialog = bootbox.alert($('<b>Hello world!</b>'));
        });

        it('shows the expected body parsing the html to nodes', function() {
          expect(this.text('.bootbox-body')).to.equal('Hello world!');
          expect(this.html('.bootbox-body')).to.equal('<b>Hello world!</b>');
        });
      });
    });

    describe('with two arguments', function() {
      describe('where the second argument is not a function', function() {
        beforeEach(function() {
          this.create = function() {
            bootbox.alert('Hello world!', 'not a callback');
          };
        });

        it('throws an error requiring a callback', function() {
          expect(this.create).to.throw(/alert requires the "callback" property to be a function when provided/);
        });
      });

      describe('where the second argument is a function', function() {
        beforeEach(function() {
          this.create = function() {
            self.dialog = bootbox.alert('Hello world!', function() {});
          };
        });

        it('does not throw an error', function() {
          expect(this.create).not.to.throw(Error);
        });
      });
    });

    describe('with three arguments', function() {
      beforeEach(function() {
        this.create = function() {
          bootbox.alert(1, 2, 3);
        };
      });

      it('throws an error regarding argument length', function() {
        expect(this.create).to.throw(/argument length/);
      });
    });

  });

  describe('configuration options tests', function() {
    beforeEach(function() {
      this.options = {
        message: 'Hello world',
        callback: function() {}
      };

      this.create = function() {
        self.dialog = bootbox.alert(this.options);
      };

      describe('with a custom ok button', function() {
        beforeEach(function() {
          this.options.buttons = {
            ok: {
              label: 'Custom OK',
              className: 'btn-danger'
            }
          };

          this.create();

          this.button = this.dialog.find('.btn:first');
        });

        it('adds the correct ok button', function() {
          expect(this.button.text()).to.equal('Custom OK');
          expect(this.button.hasClass('btn-danger')).to.be.true;
          expect(this.button.hasClass('bootbox-accept')).to.be.true;
        });
      });

      describe('with a custom ok button containing string html', function() {
        beforeEach(function() {
          this.options.buttons = {
            ok: {
              label: '<b>Custom OK</b>',
              className: 'btn-danger'
            }
          };

          this.create();

          this.button = this.dialog.find('.btn:first');
        });

        it('adds the correct ok button', function() {
          expect(this.button.text()).to.equal('<b>Custom OK</b>');
        });
      });

      describe('with a custom ok button containing jQuery node', function() {
        beforeEach(function() {
          this.options.buttons = {
            ok: {
              label: $('<b>Custom OK</b>'),
              className: 'btn-danger'
            }
          };

          this.create();

          this.button = this.dialog.find('.btn:first');
        });

        it('adds the correct ok button', function() {
          expect(this.button.text()).to.equal('Custom OK');
          expect(this.button.html()).to.equal('<b>Custom OK</b>');
        });
      });

      describe('with an unrecognised button key', function() {
        beforeEach(function() {
          this.options.buttons = {
            'Another key': {
              label: 'Custom OK',
              className: 'btn-danger'
            }
          };
        });

        it('throws an error', function() {
          expect(this.create).to.throw('button key "Another key" is not allowed (options are ok)');
        });
      });

      describe('with a custom title', function() {
        beforeEach(function() {
          this.options.title = 'Hello?';
          this.create();
        });

        it('shows the correct title', function() {
          expect(this.text('.modal-title')).to.equal('Hello?');
        });
      });

      describe('with a custom string title containing html', function() {
        beforeEach(function() {
          this.options.title = '<b>Hello?</b>';
          this.create();
        });

        it('shows the correct title', function() {
          expect(this.text('.modal-title')).to.equal('<b>Hello?</b>');
        });
      });

      describe('with a custom jQuery node title', function() {
        beforeEach(function() {
          this.options.title = $('<b>Hello?</b>');
          this.create();
        });

        it('shows the correct title', function() {
          expect(this.text('.modal-title')).to.equal('Hello?');
          expect(this.html('.modal-title')).to.equal('<b>Hello?</b>');
        });
      });
    });
  });

  describe('callback tests', function() {

    describe('with no callback', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert({
          message:'Hello!'
        });

        this.hidden = sinon.spy(this.dialog, 'modal');
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.find('.bootbox-accept').trigger('click');
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.find('.close').trigger('click');
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.trigger('escape.close.bb');
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });
    });

    describe('with a simple callback', function() {
      beforeEach(function() {
        this.callback = sinon.spy();

        this.dialog = bootbox.alert({
          message:'Hello!',
          callback: this.callback
        });

        this.hidden = sinon.spy(this.dialog, 'modal');
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.find('.bootbox-accept').trigger('click');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.find('.close').trigger('click');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.trigger('escape.close.bb');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should hide the modal', function() {
          expect(this.hidden).to.have.been.calledWithExactly('hide');
        });
      });
    });

    describe('with a callback which returns false', function() {
      beforeEach(function() {
        this.callback = sinon.stub();
        this.callback.returns(false);

        this.dialog = bootbox.alert({
          message:'Hello!',
          callback: this.callback
        });

        this.hidden = sinon.spy(this.dialog, 'modal');
      });

      describe('when dismissing the dialog by clicking OK', function() {
        beforeEach(function() {
          this.dialog.find('.bootbox-accept').trigger('click');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });

      describe('when clicking the close button', function() {
        beforeEach(function() {
          this.dialog.find('.close').trigger('click');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });

      describe('when triggering the escape event', function() {
        beforeEach(function() {
          this.dialog.trigger('escape.close.bb');
        });

        it('should invoke the callback', function() {
          expect(this.callback).to.have.been.called;
        });

        it('should pass the dialog as "this"', function() {
          expect(this.callback.thisValues[0]).to.equal(this.dialog);
        });

        it('should not hide the modal', function() {
          expect(this.hidden).not.to.have.been.called;
        });
      });
    });
  });
});
