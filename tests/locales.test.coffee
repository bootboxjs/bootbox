describe "bootbox locales", ->
  beforeEach ->

    @setLocale = (locale) ->
      bootbox.setDefaults locale: locale

      d1 = bootbox.alert "foo"
      d2 = bootbox.confirm "foo", -> true

      @labels =
        ok: d1.find(".btn:first").text()
        cancel: d2.find(".btn:first").text()
        confirm: d2.find(".btn:last").text()

  describe "Invalid locale", ->
    beforeEach ->
      @setLocale "xx"

    it "shows the default OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the default CANCEL translation", ->
      expect(@labels.cancel).to.equal "Cancel"

    it "shows the default CONFIRM translation", ->
      expect(@labels.confirm).to.equal "OK"

  describe "English", ->
    beforeEach ->
      @setLocale "en"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Cancel"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "OK"

  describe "French", ->
    beforeEach ->
      @setLocale "fr"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Annuler"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "D'accord"

  describe "German", ->
    beforeEach ->
      @setLocale "de"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Abbrechen"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Akzeptieren"

  describe "Spanish", ->
    beforeEach ->
      @setLocale "es"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Cancelar"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Aceptar"

  describe "Portuguese", ->
    beforeEach ->
      @setLocale "br"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Cancelar"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Sim"

  describe "Dutch", ->
    beforeEach ->
      @setLocale "nl"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Annuleren"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Accepteren"

  describe "Russian", ->
    beforeEach ->
      @setLocale "ru"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Отмена"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Применить"

  describe "Italian", ->
    beforeEach ->
      @setLocale "it"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Annulla"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Conferma"

  describe "Polish", ->
    beforeEach ->
      @setLocale "pl"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Anuluj"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Potwierdź"

  describe "Danish", ->
    beforeEach ->
      @setLocale "da"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Annuller"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Accepter"

  describe "Chinese", ->
    describe "Taiwan", ->
      beforeEach ->
        @setLocale "zh_TW"

      it "shows the correct OK translation", ->
        expect(@labels.ok).to.equal "OK"

      it "shows the correct CANCEL translation", ->
        expect(@labels.cancel).to.equal "取消"

      it "shows the correct CONFIRM translation", ->
        expect(@labels.confirm).to.equal "確認"

    describe "China", ->
      beforeEach ->
        @setLocale "zh_CN"

      it "shows the correct OK translation", ->
        expect(@labels.ok).to.equal "OK"

      it "shows the correct CANCEL translation", ->
        expect(@labels.cancel).to.equal "取消"

      it "shows the correct CONFIRM translation", ->
        expect(@labels.confirm).to.equal "确认"

  describe "Norwegian", ->
    beforeEach ->
      @setLocale "no"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Avbryt"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "OK"

  describe "Swedish", ->
    beforeEach ->
      @setLocale "sv"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "OK"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Avbryt"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "OK"

  describe "Latvian", ->
    beforeEach ->
      @setLocale "lv"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "Labi"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Atcelt"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Apstiprināt"

  describe "Lithuanian", ->
    beforeEach ->
      @setLocale "lt"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "Gerai"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "Atšaukti"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Patvirtinti"

  describe "Turkish", ->
    beforeEach ->
      @setLocale "tr"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "Tamam"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "İptal"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "Onayla"

  describe "Hebrew", ->
    beforeEach ->
      @setLocale "he"

    it "shows the correct OK translation", ->
      expect(@labels.ok).to.equal "אישור"

    it "shows the correct CANCEL translation", ->
      expect(@labels.cancel).to.equal "ביטול"

    it "shows the correct CONFIRM translation", ->
      expect(@labels.confirm).to.equal "אישור"
