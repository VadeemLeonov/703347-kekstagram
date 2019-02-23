'use strict';

(function () {

  // Показываем большое фото
  var userPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');

  var getBigPicture = function (item) {
    userPicture.classList.remove('hidden');
    body.classList.add('.modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
    userPicture.querySelector('img').src = item.url;
    userPicture.querySelector('.likes-count').textContent = item.like;
    userPicture.querySelector('.comments-count').textContent = item.comments.length;
    userPicture.querySelector('.social__caption').textContent = item.description;
    window.comment.createElement(item.comments);
  };

  var addPictureClickHandler = function (pictureItem, dataCard) {
    pictureItem.addEventListener('click', function () {
      getBigPicture(dataCard);
    });
  };

  var onLoad = function (response) {
    window.util.response = response.slice();
    var pictureItems = document.querySelectorAll('.picture');
    for (var i = 0; i < pictureItems.length; i++) {
      addPictureClickHandler(pictureItems[i], response[i]);
    }
  };

  window.backend.load(onLoad, window.util.onError);
  // Закрываем большое фото

  var bigPictureCansel = document.querySelector('#picture-cancel');

  var onBigPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    userPicture.classList.add('hidden');
    userPicture.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  bigPictureCansel.addEventListener('click', function () {
    closeBigPicture();
  });
})();
