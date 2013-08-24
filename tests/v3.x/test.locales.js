describe("setLocale", function() {
    var box1;
    var box2;

    after(function() {
        bootbox.setLocale('en');
    });

    it("should throw an error when setting an invalid locale", function() {
        assert.throws(function() {
            bootbox.setLocale('xx');
        });
    });

    describe("English", function() {
        before(function() {
            bootbox.setLocale('en');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Cancel");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "OK");
        });
    });

    describe("French", function() {
        before(function() {
            bootbox.setLocale('fr');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Annuler");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "D'accord");
        });
    });

    describe("German", function() {
        before(function() {
            bootbox.setLocale('de');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Abbrechen");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Akzeptieren");
        });
    });

    describe("Spanish", function() {
        before(function() {
            bootbox.setLocale('es');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Cancelar");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Aceptar");
        });
    });

    describe("Portuguese", function() {
        before(function() {
            bootbox.setLocale('br');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Cancelar");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Sim");
        });
    });

    describe("Dutch", function() {
        before(function() {
            bootbox.setLocale('nl');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Annuleren");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Accepteren");
        });
    });

    describe("Russian", function() {
        before(function() {
            bootbox.setLocale('ru');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Отмена");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Применить");
        });
    });

    describe("Italian", function() {
        before(function() {
            bootbox.setLocale('it');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Annulla");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Conferma");
        });
    });

    describe("Polish", function() {
        before(function() {
            bootbox.setLocale('pl');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Anuluj");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Potwierdź");
        });
    });

    describe("Danish", function() {
        before(function() {
            bootbox.setLocale('da');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:last").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:first").text(), "Annuller");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:last").text(), "Accepter");
        });
    });

    describe("Chinese", function() {
        describe("Taiwan", function() {
            before(function() {
                bootbox.setLocale('zh_TW');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:last").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:first").text(), "取消");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:last").text(), "確認");
            });
        });

        describe("China", function() {
            before(function() {
                bootbox.setLocale('zh_CN');

                box1 = bootbox.alert("foo");
                box2 = bootbox.confirm("bar");
            });

            it("shows the correct OK translation", function() {
                assert.equal(box1.find("a:last").text(), "OK");
            });

            it("shows the correct CANCEL translation", function() {
                assert.equal(box2.find("a:first").text(), "取消");
            });

            it("shows the correct CONFIRM translation", function() {
                assert.equal(box2.find("a:last").text(), "确认");
            });
        });
    });

});
