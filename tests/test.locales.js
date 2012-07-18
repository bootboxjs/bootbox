describe("setLocale", function() {
    var box1;
    var box2;

    it("should throw an error when setting an invalid locale", function() {
        assert.throws(function() {
            bootbox.setLocale('xx')
        });
    });

    describe("English", function() {
        before(function() {
            bootbox.setLocale('en');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Cancel");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "OK");
        });
    });

    describe("French", function() {
        before(function() {
            bootbox.setLocale('fr');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Annuler");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "D'accord");
        });
    });

    describe("German", function() {
        before(function() {
            bootbox.setLocale('de');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Abbrechen");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Akzeptieren");
        });
    });

    describe("Spanish", function() {
        before(function() {
            bootbox.setLocale('es');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Cancelar");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Aceptar");
        });
    });

    describe("Portuguese", function() {
        before(function() {
            bootbox.setLocale('br');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Cancelar");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Sim");
        });
    });

    describe("Dutch", function() {
        before(function() {
            bootbox.setLocale('nl');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Annuleren");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Accepteren");
        });
    });

    describe("Russian", function() {
        before(function() {
            bootbox.setLocale('ru');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Отмена");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Применить");
        });
    });
    
    describe("Italian", function() {
        before(function() {
            bootbox.setLocale('it');

            box1 = bootbox.alert("foo");
            box2 = bootbox.confirm("bar");
        });

        it("shows the correct OK translation", function() {
            assert.equal(box1.find("a:first").text(), "OK");
        });

        it("shows the correct CANCEL translation", function() {
            assert.equal(box2.find("a:last").text(), "Annulla");
        });

        it("shows the correct CONFIRM translation", function() {
            assert.equal(box2.find("a:first").text(), "Conferma");
        });
    });
});
