describe('Bootbox', function() {
  'use strict';

  it('is attached to the window object', function() {
    expect(window.bootbox).to.be.an('object');
  });

  it('exposes the correct public API', function() {
    expect(bootbox.alert).to.be.a('function');
    expect(bootbox.confirm).to.be.a('function');
    expect(bootbox.dialog).to.be.a('function');
    expect(bootbox.setDefaults).to.be.a('function');
    expect(bootbox.setLocale).to.be.a('function');
    expect(bootbox.removeLocale).to.be.a('function');
    expect(bootbox.locales).to.be.a('function');
    expect(bootbox.hideAll).to.be.a('function');
  });

  describe('hideAll', function() {
    beforeEach(function() {
      this.hidden = sinon.spy($.fn, 'modal');
      bootbox.hideAll();
    });

    afterEach(function() {
      this.hidden.restore();
    });

    it('should hide all .bootbox modals', function() {
      expect(this.hidden).to.have.been.calledWithExactly('hide');
    });
  });

  describe('event listeners', function() {
    describe('hidden.bs.modal', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert('hi');

        this.removed = sinon.stub(this.dialog, 'remove');

        this.e = function(target) {

          $(this.dialog).trigger($.Event('hidden.bs.modal', {
            target: target
          }));
        };
      });

      afterEach(function() {
        this.removed.restore();
      });

      describe('when triggered with the wrong target', function() {
        beforeEach(function() {
          this.e({an: 'object'});
        });

        it('does not remove the dialog', function() {
          expect(this.removed).not.to.have.been.called;
        });
      });

      describe('when triggered with the correct target', function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it('removes the dialog', function() {
          expect(this.removed).to.have.been.called;
        });
      });
    });
  });

  describe('onHide option', function() {
    describe('hide.bs.modal', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert({ 
          message: 'hi',
          onHide: this.callback
        });

        this.e = function(target) {
          $(this.dialog).trigger($.Event('hide.bs.modal', {
            target: target
          }));
        };
      });

      describe('when triggered with the correct target', function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it('has triggered onHide function', function() {
          expect(this.callback).to.have.been.called;
        });
      });
    });
  });

  describe('onHidden option', function() {
    describe('hidden.bs.modal', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert({ 
          message: 'hi',
          onHidden: this.callback
        });

        this.e = function(target) {
          $(this.dialog).trigger($.Event('hidden.bs.modal', {
            target: target
          }));
        };
      });

      describe('when triggered with the correct target', function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it('has triggered onHidden function', function() {
          expect(this.callback).to.have.been.called;
        });
      });
    });
  });

  describe('onShow option', function() {
    describe('show.bs.modal', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert({ 
          message: 'hi',
          onShow: this.callback
        });
      });

      describe('when triggered with the correct target', function() {
        it('has triggered onShow function', function() {
          expect(this.callback).to.have.been.called;
        });
      });
    });
  });

  describe('If $.fn.modal is undefined', function() {
    beforeEach(function() {
      this.oldModal = window.jQuery.fn.modal;
      window.jQuery.fn.modal = undefined;
    });

    afterEach(function() {
      window.jQuery.fn.modal = this.oldModal;
    });

    describe('When invoking a dialog', function() {
      beforeEach(function() {
        try {
          bootbox.alert('Hi', function() {});
        } catch (e) {
          this.e = e;
        }
      });

      it('throws the correct error', function() {
        expect(this.e.message).to.contain('"$.fn.modal" is not defined');
      });
    });
  });

  describe('adding and removing locales', function() {

    describe('bootbox.addLocale', function() {
      describe('with invalid values', function() {
        beforeEach(function() {
          try {
            bootbox.addLocale('xy', {
              OK: 'BTN1'
            });
          } catch (e) {
            this.e = e;
          }
        });

        it('throws the expected error', function() {
          expect(this.e.message).to.equal('Please supply a translation for "CANCEL"');
        });
      });

      describe('with valid values', function() {
        beforeEach(function() {
          bootbox
          .addLocale('xy', {
            OK: 'BTN1',
            CANCEL: 'BTN2',
            CONFIRM: 'BTN3'
          })
          .setLocale('xy');

          var d1 = bootbox.alert('foo');
          var d2 = bootbox.confirm('foo', function() { return true; });
          this.labels = {
            ok: d1.find('.btn:first').text(),
            cancel: d2.find('.btn:first').text(),
            confirm: d2.find('.btn:last').text()
          };
        });

        it('shows the expected OK translation', function() {
          expect(this.labels.ok).to.equal('BTN1');
        });
        it('shows the expected CANCEL translation', function() {
          expect(this.labels.cancel).to.equal('BTN2');
        });
        it('shows the expected PROMPT translation', function() {
          expect(this.labels.confirm).to.equal('BTN3');
        });
      });
    });

    describe('bootbox.removeLocale', function () {
      beforeEach(function () {
        bootbox.removeLocale('xy');

        var d1 = bootbox.alert('foo');
        var d2 = bootbox.confirm('foo', function () { return true; });
        this.labels = {
          ok: d1.find('.btn:first').text(),
          cancel: d2.find('.btn:first').text(),
          confirm: d2.find('.btn:last').text()
        };
      });

      it('falls back to the default OK translation', function () {
        expect(this.labels.ok).to.equal('OK');
      });
      it('falls back to the default CANCEL translation', function () {
        expect(this.labels.cancel).to.equal('Cancel');
      });
      it('falls back to the default PROMPT translation', function () {
        expect(this.labels.confirm).to.equal('OK');
      });
    });
  });

  describe('backdrop variations', function() {
    beforeEach(function() {
      this.e = function(target) {
        $(this.dialog).trigger($.Event('click.dismiss.bs.modal', {
          target: target
        }));
      };
    });

    describe('with the default value', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert('hi', this.callback);
      });

      describe('When triggering the backdrop click dismiss event', function() {
        beforeEach(function() {
          this.e({an: 'object'});
        });

        it('does not invoke the callback', function() {
          expect(this.callback).not.to.have.been.called;
        });
      });
    });

    describe('when set to false', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert({
          message: 'hi',
          callback: this.callback,
          backdrop: false
        });
      });

      describe('When triggering the backdrop click dismiss event', function() {
        describe('With the wrong target', function() {
          beforeEach(function() {
            this.e({an: 'object'});
          });

          it('does not invoke the callback', function() {
            expect(this.callback).not.to.have.been.called;
          });
        });

        describe('With the correct target', function() {
          beforeEach(function() {
            this.e(this.dialog.get(0));
          });

          it('invokes the callback', function() {
            expect(this.callback).not.to.have.been.called;
          });
        });
      });
    });

    describe('when set to true', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.dialog = bootbox.alert({
          message: 'hi',
          callback: this.callback,
          backdrop: true
        });
      });

      describe('When triggering the backdrop click dismiss event', function() {
        describe('With the wrong target', function() {
          beforeEach(function() {
            this.e({an: 'object'});
          });

          it('does not invoke the callback', function() {
            expect(this.callback).not.to.have.been.called;
          });
        });

        describe('With the correct target', function() {
          beforeEach(function() {
            this.e(this.dialog.children('.modal-backdrop').get(0));
          });

          it('invokes the callback', function() {
            expect(this.callback).to.have.been.called;
          });

          it('should pass the dialog as "this"', function() {
            expect(this.callback.thisValues[0]).to.equal(this.dialog);
          });
        });
      });
    });
  });

  describe('resuable: true dialog', function() {
    describe('hidden.bs.modal', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert({ message: 'hi', reusable: true });

        this.removed = sinon.stub(this.dialog, 'remove');

        this.e = function(target) {
          $(this.dialog).trigger($.Event('hidden.bs.modal', {
            target: target
          }));
        };
      });

      afterEach(function() {
        this.removed.restore();
      });

      describe('when triggered with `reusable: true`', function() {
        beforeEach(function() {
          this.e({an: 'object'});
        });

        it('does not remove the dialog', function() {
          expect(this.removed).not.to.have.been.called;
        });
      });
    });
  });

  describe('resuable: false dialog', function() {
    describe('hidden.bs.modal', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert({ message: 'hi', reusable: false });

        this.removed = sinon.stub(this.dialog, 'remove');

        this.e = function(target) {
          $(this.dialog).trigger($.Event('hidden.bs.modal', {
            target: target
          }));
        };
      });

      afterEach(function() {
        this.removed.restore();
      });

      describe('when triggered with `reusable: false`', function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it('removes the dialog', function() {
          expect(this.removed).to.have.been.called;
        });
      });
    });
  });

  describe('resuable not set dialog', function() {
    describe('hidden.bs.modal', function() {
      beforeEach(function() {
        this.dialog = bootbox.alert({ message: 'hi' });

        this.removed = sinon.stub(this.dialog, 'remove');

        this.e = function(target) {
          $(this.dialog).trigger($.Event('hidden.bs.modal', {
            target: target
          }));
        };
      });

      afterEach(function() {
        this.removed.restore();
      });

      describe('when triggered with `reusable` not set', function() {
        beforeEach(function() {
          this.e(this.dialog.get(0));
        });

        it('removes the dialog', function() {
          expect(this.removed).to.have.been.called;
        });
      });
    });
  });
});
