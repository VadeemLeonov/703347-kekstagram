'use strict';

(function () {

  // Создаём элементы для комментариев

  var commentListItems = document.querySelector('.social__comments');
  var liForComment = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
  var createCommentElement = function (info) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < info.length; i++) {
      var commentElement = liForComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = info[i].avatar;
      commentElement.querySelector('.social__text').textContent = info[i].message + '  - ' + info[i].name;
      fragment.appendChild(commentElement);
    }
    commentListItems.appendChild(fragment);
  };

  // удаляем прдыдущие комментарии

  window.comment = {
    createElement: createCommentElement,
    delCommentElement: function () {
      var commentElements = document.querySelectorAll('.social__comment');
      for (var i = 0; i < commentElements.length; i++) {
        commentElements[i].remove();
      }
    }
  };
})();
