/*! @preserve
 * bootbox.locales.js
 * version: 5.1.1
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
(function (global, factory) {  
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['bootbox'], factory);
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./bootbox'));
  } else {
    factory(global.bootbox);
  }
}(this, function (bootbox) {
  'use strict';
  (function () {
    bootbox.addLocale('ar', {
      OK: 'موافق',
      CANCEL: 'الغاء',
      CONFIRM: 'تأكيد'
    });
  })();
  
  (function () {
    bootbox.addLocale('az', {
      OK: 'OK',
      CANCEL: 'İmtina et',
      CONFIRM: 'Təsdiq et'
    });
  })();

  (function () {
    bootbox.addLocale('bg_BG', {
      OK: 'Ок',
      CANCEL: 'Отказ',
      CONFIRM: 'Потвърждавам'
    });
  })();

  (function () {
    bootbox.addLocale('br', {
      OK: 'OK',
      CANCEL: 'Cancelar',
      CONFIRM: 'Sim'
    });
  })();

  (function () {
    bootbox.addLocale('cs', {
      OK: 'OK',
      CANCEL: 'Zrušit',
      CONFIRM: 'Potvrdit'
    });
  })();

  (function () {
    bootbox.addLocale('da', {
      OK: 'OK',
      CANCEL: 'Annuller',
      CONFIRM: 'Accepter'
    });
  })();

  (function () {
    bootbox.addLocale('de', {
      OK: 'OK',
      CANCEL: 'Abbrechen',
      CONFIRM: 'Akzeptieren'
    });
  })();

  (function () {
    bootbox.addLocale('el', {
      OK: 'Εντάξει',
      CANCEL: 'Ακύρωση',
      CONFIRM: 'Επιβεβαίωση'
    });
  })();

  (function () {
    bootbox.addLocale('en', {
      OK: 'OK',
      CANCEL: 'Cancel',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('es', {
      OK: 'OK',
      CANCEL: 'Cancelar',
      CONFIRM: 'Aceptar'
    });
  })();

  (function () {
    bootbox.addLocale('eu', {
      OK: 'OK',
      CANCEL: 'Ezeztatu',
      CONFIRM: 'Onartu'
    });
  })();

  (function () {
    bootbox.addLocale('et', {
      OK: 'OK',
      CANCEL: 'Katkesta',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('fa', {
      OK: 'قبول',
      CANCEL: 'لغو',
      CONFIRM: 'تایید'
    });
  })();

  (function () {
    bootbox.addLocale('fi', {
      OK: 'OK',
      CANCEL: 'Peruuta',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('fr', {
      OK: 'OK',
      CANCEL: 'Annuler',
      CONFIRM: 'Confirmer'
    });
  })();

  (function () {
    bootbox.addLocale('he', {
      OK: 'אישור',
      CANCEL: 'ביטול',
      CONFIRM: 'אישור'
    });
  })();

  (function () {
    bootbox.addLocale('hu', {
      OK: 'OK',
      CANCEL: 'Mégsem',
      CONFIRM: 'Megerősít'
    });
  })();

  (function () {
    bootbox.addLocale('hr', {
      OK: 'OK',
      CANCEL: 'Odustani',
      CONFIRM: 'Potvrdi'
    });
  })();

  (function () {
    bootbox.addLocale('id', {
      OK: 'OK',
      CANCEL: 'Batal',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('it', {
      OK: 'OK',
      CANCEL: 'Annulla',
      CONFIRM: 'Conferma'
    });
  })();

  (function () {
    bootbox.addLocale('ja', {
      OK: 'OK',
      CANCEL: 'キャンセル',
      CONFIRM: '確認'
    });
  })();

  (function () {
    bootbox.addLocale('ko', {
      OK: 'OK',
      CANCEL: '취소',
      CONFIRM: '확인'
    });
  })();

  (function () {
    bootbox.addLocale('lt', {
      OK: 'Gerai',
      CANCEL: 'Atšaukti',
      CONFIRM: 'Patvirtinti'
    });
  })();

  (function () {
    bootbox.addLocale('lv', {
      OK: 'Labi',
      CANCEL: 'Atcelt',
      CONFIRM: 'Apstiprināt'
    });
  })();

  (function () {
    bootbox.addLocale('nl', {
      OK: 'OK',
      CANCEL: 'Annuleren',
      CONFIRM: 'Accepteren'
    });
  })();

  (function () {
    bootbox.addLocale('no', {
      OK: 'OK',
      CANCEL: 'Avbryt',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('pl', {
      OK: 'OK',
      CANCEL: 'Anuluj',
      CONFIRM: 'Potwierdź'
    });
  })();

  (function () {
    bootbox.addLocale('pt', {
      OK: 'OK',
      CANCEL: 'Cancelar',
      CONFIRM: 'Confirmar'
    });
  })();

  (function () {
    bootbox.addLocale('ru', {
      OK: 'OK',
      CANCEL: 'Отмена',
      CONFIRM: 'Подтвердить'
    });
  })();

  (function () {
    bootbox.addLocale('sk', {
      OK: 'OK',
      CANCEL: 'Zrušiť',
      CONFIRM: 'Potvrdiť'
    });
  })();

  (function () {
    bootbox.addLocale('sl', {
      OK: 'OK',
      CANCEL: 'Prekliči',
      CONFIRM: 'Potrdi'
    });
  })();

  (function () {
    bootbox.addLocale('sq', {
      OK: 'OK',
      CANCEL: 'Anulo',
      CONFIRM: 'Prano'
    });
  })();

  (function () {
    bootbox.addLocale('sv', {
      OK: 'OK',
      CANCEL: 'Avbryt',
      CONFIRM: 'OK'
    });
  })();

  (function () {
    bootbox.addLocale('sw', {
      OK: 'Sawa',
      CANCEL: 'Ghairi',
      CONFIRM: 'Thibitisha'
    });
  })();

  (function () {
    bootbox.addLocale('ta', {
      OK      : 'சரி',
      CANCEL  : 'ரத்து செய்',
      CONFIRM : 'உறுதி செய்'
    });
  })();

  (function () {
    bootbox.addLocale('th', {
      OK: 'ตกลง',
      CANCEL: 'ยกเลิก',
      CONFIRM: 'ยืนยัน'
    });
  })();

  (function () {
    bootbox.addLocale('tr', {
      OK: 'Tamam',
      CANCEL: 'İptal',
      CONFIRM: 'Onayla'
    });
  })();

  (function () {
    bootbox.addLocale('uk', {
      OK: 'OK',
      CANCEL: 'Відміна',
      CONFIRM: 'Прийняти'
    });
  })();

  (function () {
    bootbox.addLocale('zh_CN', {
      OK: 'OK',
      CANCEL: '取消',
      CONFIRM: '确认'
    });
  })();

  (function () {
    bootbox.addLocale('zh_TW', {
      OK: 'OK',
      CANCEL: '取消',
      CONFIRM: '確認'
    });
  })();
}));