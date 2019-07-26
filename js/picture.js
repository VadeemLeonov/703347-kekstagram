'use strict';

(function () {

  var AMOUNT_NEW_PICTURE = 10;

  // Создаем элементы для маленьких фото в разметке и отрисовываем их
  // функции с разной сортировкой фото

  var sortFoto = {
    pictureListElement: document.querySelector('.pictures'),
    fragment: document.createDocumentFragment(),
    picture: document.querySelector('#picture')
    .content
    .querySelector('.picture'),
    loadPopularPicture: function (data) {
      for (var i = 0; i < data.length; i++) {
        var pictureElement = sortFoto.picture.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = data[i].url;
        pictureElement.querySelector('.picture__likes').textContent = data[i].likes;
        pictureElement.querySelector('.picture__comments').textContent = data[i].comments.length;
        sortFoto.fragment.appendChild(pictureElement);
      }
      sortFoto.pictureListElement.appendChild(sortFoto.fragment);
      window.preview.reload(data);
    },
    loadNewPicture: function (data) {
      while (data.length !== AMOUNT_NEW_PICTURE) {
        data.splice(window.random.getInt(0, data.length), 1);
      }
      sortFoto.loadPopularPicture(data);
      window.preview.reload(data);
    },
    loadDiscussedPicture: function (data) {
      data.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
      sortFoto.loadPopularPicture(data);
      window.preview.reload(data);
    },
  };

  var filterListMap = {
    'filter-popular': sortFoto.loadPopularPicture,
    'filter-new': sortFoto.loadNewPicture,
    'filter-discussed': sortFoto.loadDiscussedPicture
  };

  // Вешаем обработчик на кнопки фильтра,
  // и при нажатии на них обновляем фотографии с соответствущей сортировкой

  var updateFoto = {
    imgFiltersBtn: document.querySelectorAll('.img-filters__button'),
    removePictures: function () {
      var pictureItems = document.querySelectorAll('.picture');
      for (var i = 0; i < pictureItems.length; i++) {
        pictureItems[i].remove();
      }
    },
    addBtnClickHandler: function () {
      updateFoto.imgFiltersBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var activeFilter = document.querySelector('.img-filters__button--active');
          activeFilter.classList.remove('img-filters__button--active');
          updateFoto.removePictures();
          this.classList.add('img-filters__button--active');
          var responseCopy = window.util.response.slice();
          filterListMap[this.id](responseCopy);
        });
      });
    }
  };

  updateFoto.addBtnClickHandler();
  window.backend.load(filterListMap['filter-popular'], window.util.onError);
})();
