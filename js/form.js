'use strict';

(function () {

  var WIDTH_SCALE = 453;
  var BORDERS_OF_BRIGHTNESS = 2;
  var BORDERS_OF_BLUR = 3;
  var PERCENT = 100;
  var EFFECT_LEVEL_MAX = 1;
  var ORIGINAL = 'none';

  // открываем и закрываем форму редактирования изображения

  var textDescription = document.querySelector('.text__description');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadFileClose = uploadOverlay.querySelector('#upload-cancel');

  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы

  var onUploadPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      if (window.util.hashTagsInput !== document.activeElement && textDescription !== document.activeElement) {
        closeUploadPopup();
      }
    }
  };

  var openUploadPopup = function () {
    uploadOverlay.classList.remove('hidden');
    slider.classList.add('hidden');
    getNone();
    document.addEventListener('keydown', onUploadPopupEscPress);
  };

  var closeUploadPopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPopupEscPress);
    uploadFile.value = '';
    window.util.hashTagsInput.value = '';
    document.querySelector('.text__description').value = '';
  };

  uploadFile.addEventListener('change', function () {
    openUploadPopup();
  });

  uploadFileClose.addEventListener('click', function () {
    closeUploadPopup();
  });

  // Применение эффекта для изображения

  // Функции для эффектов (ползунок)

  var getNone = function () {
    preview.style.filter = ORIGINAL;
    effectItems[0].checked = true;
  };

  var getChrome = function (grayScale) {
    preview.style.filter = 'grayscale(' + grayScale + ')';
  };

  var getSepia = function (sepia) {
    preview.style.filter = 'sepia(' + sepia + ')';
  };

  var getMarvin = function (invert) {
    preview.style.filter = 'invert(' + invert * PERCENT + '%)';
  };

  var getPhobos = function (blur) {
    preview.style.filter = 'blur(' + blur * BORDERS_OF_BLUR + 'px)';
  };

  var getHeat = function (brightness) {
    preview.style.filter = 'brightness(' + (brightness * BORDERS_OF_BRIGHTNESS + 1) + ')';
  };

  // Объект с вызовами фенкций для эффектов

  var effectsDirectory = {
    none: getNone,
    chrome: getChrome,
    sepia: getSepia,
    marvin: getMarvin,
    phobos: getPhobos,
    heat: getHeat
  };

  // Применение эффекта для изображения (иконки)

  var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var preview = document.querySelector('.img-upload__preview');
  var effectItems = document.querySelectorAll('.effects__radio');
  var currentFilter;
  var sliderEffectLevel = document.querySelector('.effect-level__pin');
  var sliderEffectDepth = document.querySelector('.effect-level__depth');
  var sliderEffectValue = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.effect-level');
  var effectsDirectoryFilter;

  // функция которая записывает значения для отображения ползунка

  var getSliderValue = function (value) {
    sliderEffectLevel.style.left = value + '%';
    sliderEffectDepth.style.width = value + '%';
    sliderEffectValue.value = Math.round(value);
  };

  // функция которая устанавливает значения для эффектов по перетаскиванию ползунка

  var getEffectLevl = function (level) {
    effectsDirectory[effectsDirectoryFilter](level / 100);
  };

  // функция устанавливает значения для эффектов по переключению иконок

  var addEffectListClickHandler = function (effects, effectName) {
    effects.addEventListener('click', function () {
      getSliderValue(PERCENT);
      preview.classList.remove(currentFilter);
      currentFilter = 'effects__preview--' + effectName;
      preview.classList.add(currentFilter);
      effectsDirectoryFilter = effectName;
      slider.classList.toggle('hidden', effectsDirectoryFilter === ORIGINAL);
      effectsDirectory[effectsDirectoryFilter](EFFECT_LEVEL_MAX);
    });
  };

  for (var i = 0; i < effectItems.length; i++) {
    addEffectListClickHandler(effectItems[i], effectNames[i]);
  }

  // Перетаскивание ползунка

  sliderEffectLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var movePin = sliderEffectLevel.offsetLeft - shift.x;

      if (movePin >= 0 && movePin <= WIDTH_SCALE) {
        var effectLevel = movePin / WIDTH_SCALE;
        var valuePin = effectLevel * PERCENT;
        getSliderValue(valuePin);
        getEffectLevl(valuePin);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      closeUploadPopup();
      window.util.successMassage();
    }, window.util.errorMassage);
    evt.preventDefault();
  });

  window.form = {
    preview: preview
  };
})();
