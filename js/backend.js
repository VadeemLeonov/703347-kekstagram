'use strict';

(function () {


  var Link = {
    URL: 'https://js.dump.academy/kekstagram',
    URL_DATA: 'https://js.dump.academy/kekstagram/data'
  };

  window.backend = {
    loading: function (method, url, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s
      xhr.open(method, url);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      window.backend.loading('GET', Link.URL_DATA, onLoad, onError);
    },
    upload: function (data, onLoad, onError) {
      window.backend.loading('POST', Link.URL, onLoad, onError, data);
    },
  };
})();
