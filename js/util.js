'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var hashTagsInput = document.querySelector('.text__hashtags');

  window.util = {
    hashTagsInput: hashTagsInput,
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    onError: function (onErrorMessage) {
      var node = document.querySelector('#error')
        .content
        .querySelector('.error');

      node.textContent = onErrorMessage;
      var massageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', massageElm);
      var remMassageElm = function () {
        massageElm.remove();
        document.removeEventListener('click', remMassageElm);
      };
      document.addEventListener('click', remMassageElm);
    },
    response: [],
    result: '',
    errorMassage: function () {
      var node = document.querySelector('#error')
        .content
        .querySelector('.error');

      var massageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', massageElm);
      massageElm.style = 'z-index: 99';
      var errorBtn = document.querySelector('.error__button');
      errorBtn.addEventListener('click', function () {
        massageElm.remove();
      });

      var remMassageElm = function () {
        massageElm.remove();
        document.removeEventListener('click', remMassageElm);
      };
      document.addEventListener('click', remMassageElm);

      var closeMassege = function (evt) {
        if (window.util.isEscEvent(evt)) {
          massageElm.remove();
          document.removeEventListener('keydown', closeMassege);
        }
      };
      document.addEventListener('keydown', closeMassege);
    },
    successMassage: function () {
      var node = document.querySelector('#success')
        .content
        .querySelector('.success');

      var massageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', massageElm);
      var successBtn = document.querySelector('.success__button');
      successBtn.addEventListener('click', function () {
        massageElm.remove();
      });

      var remMassageElm = function () {
        massageElm.remove();
        document.removeEventListener('click', remMassageElm);
      };
      document.addEventListener('click', remMassageElm);

      var closeMassege = function (evt) {
        if (window.util.isEscEvent(evt)) {
          massageElm.remove();
          document.removeEventListener('keydown', closeMassege);
        }
      };
      document.addEventListener('keydown', closeMassege);
    }
  };
})();
