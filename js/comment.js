'use strict';

(function () {

  // Создаём элементы для комментариев

  var commentListItems = document.querySelector('.social__comments');

  var createCommentElement = function (comments) {

    var fragment = document.createDocumentFragment();
    var liForComment = document.querySelector('.social__comment');

    for (var i = 0; i < comments.length; i++) {
      var commentElement = liForComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comments[i].avatar;
      commentElement.querySelector('.social__text').textContent = comments[i].message;

      fragment.appendChild(commentElement);
    }
    commentListItems.appendChild(fragment);
  };
  window.comment = {
    createElement: createCommentElement
  };
})();
