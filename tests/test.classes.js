describe("classes", function() {
    var box;

    after(function() {
        $(".bootbox")
        .remove();
    });

    describe("when single class applied globally", function() {
        before(function() {
            bootbox.classes("globalTestClass");   
            box = bootbox.dialog("foo");
        });

        it("should apply the class to the modal", function() {
            assert.isTrue(box.hasClass("globalTestClass"));
        });

        describe("but when passed as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"classes": "localTestClass"});
            });

            it("should only apply the option specified class to the modal", function() {
                assert.isFalse(box.hasClass("globalTestClass"));
                assert.isTrue(box.hasClass("localTestClass"));                   
            });
        });
    });

    describe("when multiple classes applied globally", function() {
        before(function() {
            bootbox.classes("globalTestClass globalTestClass2");
            box = bootbox.dialog("foo");
        });

        it("should apply the classes to the modal", function() {
            assert.isTrue(box.hasClass("globalTestClass"));
            assert.isTrue(box.hasClass("globalTestClass2"));
        });

        describe("but when passed as an option", function() {
            before(function() {
                box = bootbox.dialog("foo", [], {"classes": "localTestClass localTestClass2"});
            });

            it("should only apply the option specified classes to the modal", function() {
                assert.isFalse(box.hasClass("globalTestClass"));
                assert.isFalse(box.hasClass("globalTestClass2"));
                assert.isTrue(box.hasClass("localTestClass"));
                assert.isTrue(box.hasClass("localTestClass2"));
            });
        });
    });

});
