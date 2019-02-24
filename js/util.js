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
      var messageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', messageElm);
      var remMessageElm = function () {
        messageElm.remove();
        document.removeEventListener('click', remMessageElm);
      };
      document.addEventListener('click', remMessageElm);
    },
    response: [],
    result: '',
    errorMessage: function () {
      var node = document.querySelector('#error')
        .content
        .querySelector('.error');

      var messageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', messageElm);
      messageElm.style = 'z-index: 99';
      var errorBtn = document.querySelector('.error__button');
      errorBtn.addEventListener('click', function () {
        messageElm.remove();
      });

      var remMessageElm = function () {
        messageElm.remove();
        document.removeEventListener('click', remMessageElm);
      };
      document.addEventListener('click', remMessageElm);

      var closeMessege = function (evt) {
        if (window.util.isEscEvent(evt)) {
          messageElm.remove();
          document.removeEventListener('keydown', closeMessege);
        }
      };
      document.addEventListener('keydown', closeMessege);
    },
    successMessage: function () {
      var node = document.querySelector('#success')
        .content
        .querySelector('.success');

      var messageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', messageElm);
      var successBtn = document.querySelector('.success__button');
      successBtn.addEventListener('click', function () {
        messageElm.remove();
      });

      var remMessageElm = function () {
        messageElm.remove();
        document.removeEventListener('click', remMessageElm);
      };
      document.addEventListener('click', remMessageElm);

      var closeMessege = function (evt) {
        if (window.util.isEscEvent(evt)) {
          messageElm.remove();
          document.removeEventListener('keydown', closeMessege);
        }
      };
      document.addEventListener('keydown', closeMessege);
    },
    uploadMessage: function () {
      var node = document.querySelector('#messages')
        .content
        .querySelector('.img-upload__message');

      var messageElm = node.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', messageElm);
    }
  };
})();
