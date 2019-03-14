'use strict';

(function () {

  var QUANTITY_HASH_TAG = 5;
  var HASH_TAG_LENGTH = 20;

  // Валидация формы
  // Хэш-тэги
  // Функция считающая хэш-тэги

  var getCountHashTag = function (text) {
    var count = 0;
    var pos = text.indexOf('#');

    while (pos !== -1) {
      count++;
      pos = text.indexOf('#', pos + 1);
    }
    return count;
  };

  // Функция которая удаляет похожие хэш-тэги

  var removeSameElement = function (elements) {
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      obj[element] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(obj);
  };

  window.util.hashTagsInput.addEventListener('input', function () {
    var hashTagText = window.util.hashTagsInput.value.trim();
    var hashTags = hashTagText.toLowerCase().split(' ');
    var errorMessage = '';
    window.util.hashTagsInput.style.borderColor = '';

    if (getCountHashTag(hashTagText) > QUANTITY_HASH_TAG) {
      errorMessage = 'Нельзя указать больше пяти хэш-тегов';
    }

    if (removeSameElement(hashTags).length < hashTags.length) {
      errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
    }

    for (var i = 0; i < hashTags.length; i++) {
      var hashTag = hashTags[i];

      switch (true) {
        case hashTag[0] !== '#':
          errorMessage = 'Хэш-тег должен начинаться с решетки #';
          break;
        case hashTag.length === 1:
          errorMessage = 'Хеш-тег не может состоять только из одной решётки';
          break;
        case hashTag.length > HASH_TAG_LENGTH:
          errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
          break;
        case hashTag.indexOf('#', 1) > 1:
          errorMessage = 'Хэштеги должны разделяться пробелами';
          break;
      }
    }
    if (hashTag === '') {
      errorMessage = '';
    }

    window.util.hashTagsInput.setCustomValidity(errorMessage);
  });

  window.util.hashTagsInput.addEventListener('change', function () {
    window.util.result = window.util.hashTagsInput.checkValidity();
    if (window.util.result === false) {
      window.util.hashTagsInput.style.borderColor = '#ff0000';
    }
  });
})();
