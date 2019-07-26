'use strict';

(function () {

  // Показываем большое фото

  var openFoto = {
    userPicture: document.querySelector('.big-picture'),
    getBigPicture: function (item) {
      window.comment.delCommentElement();
      openFoto.userPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('.modal-open');
      document.addEventListener('keydown', closeFoto.onBigPictureEscPress);
      openFoto.userPicture.querySelector('img').src = item.url;
      openFoto.userPicture.querySelector('.likes-count').textContent = item.like;
      openFoto.userPicture.querySelector('.comments-count').textContent = item.comments.length;
      openFoto.userPicture.querySelector('.social__caption').textContent = item.description;
      window.comment.createElement(item.comments);
    },
    addPictureClickHandler: function (pictureItem, dataCard) {
      pictureItem.addEventListener('click', function () {
        openFoto.getBigPicture(dataCard);
      });
    },
    onLoad: function (response) {
      var pictureItems = document.querySelectorAll('.picture');
      for (var i = 0; i < pictureItems.length; i++) {
        openFoto.addPictureClickHandler(pictureItems[i], response[i]);
      }
    }
  };

  window.backend.load(openFoto.onLoad, window.util.onError);

  // Закрываем большое фото

  var closeFoto = {
    bigPictureCansel: document.querySelector('#picture-cancel'),
    onBigPictureEscPress: function (evt) {
      if (window.util.isEscEvent(evt)) {
        closeFoto.closeBigPicture();
      }
    },
    closeBigPicture: function () {
      window.comment.delCommentElement();
      openFoto.userPicture.classList.add('hidden');
      openFoto.userPicture.classList.remove('modal-open');
      document.removeEventListener('keydown', closeFoto.onBigPictureEscPress);
    }
  };

  closeFoto.bigPictureCansel.addEventListener('click', function () {
    closeFoto.closeBigPicture();
  });

  window.preview = {
    reload: openFoto.onLoad
  };
})();
