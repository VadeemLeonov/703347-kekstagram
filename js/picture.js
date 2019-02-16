'use strict';

(function () {


  // Создаем элементы для маленьких фото в разметке

  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var loadPictureElement = function (data) {

    for (var i = 0; i < data.length; i++) {

      var pictureElement = picture.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = data[i].url;
      pictureElement.querySelector('.picture__likes').textContent = data[i].like;
      pictureElement.querySelector('.picture__comments').textContent = data[i].comments.length;

      fragment.appendChild(pictureElement);
    }
    pictureListElement.appendChild(fragment);
  };

  window.backend.load(loadPictureElement, window.util.onError);


})();
