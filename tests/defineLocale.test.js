describe("bootbox.defineLocale", function() {
    "use strict";

    describe("basic usage", function() {
        beforeEach(function() {
            bootbox.defineLocale("xy", { OK: "BTN1", CANCEL: "BTN2", CONFIRM: "BTN3" });
            bootbox.setDefaults("locale", "xy");

            var d1 = bootbox.alert("foo");
            var d2 = bootbox.confirm("foo", function() { return true; });
            this.labels = {
                ok: d1.find(".btn:first").text(),
                cancel: d2.find(".btn:first").text(),
                confirm: d2.find(".btn:last").text()
            }
        });

        it("shows the default OK translation", function() {
            expect(this.labels.ok).to.equal("BTN1");
        });
        it("shows the default CANCEL translation", function() {
            expect(this.labels.cancel).to.equal("BTN2");
        });
        it("shows the default PROMPT translation", function() {
            expect(this.labels.confirm).to.equal("BTN3");
        });
    });

    describe("delete locale", function () {
        beforeEach(function () {
            bootbox.defineLocale("xy");
            bootbox.setDefaults("locale", "xy");

            var d1 = bootbox.alert("foo");
            var d2 = bootbox.confirm("foo", function () { return true; });
            this.labels = {
                ok: d1.find(".btn:first").text(),
                cancel: d2.find(".btn:first").text(),
                confirm: d2.find(".btn:last").text()
            }
        });

        it("shows the default OK translation", function () {
            expect(this.labels.ok).to.equal("OK");
        });
        it("shows the default CANCEL translation", function () {
            expect(this.labels.cancel).to.equal("Cancel");
        });
        it("shows the default PROMPT translation", function () {
            expect(this.labels.confirm).to.equal("OK");
        });
    });
});
