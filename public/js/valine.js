  (function () {
    document.write('<div id="valine"></div>');
    var loadJs = (function () {
      var script = document.createElement('script');
      if (script.readyState) {
        return function (url) {
          return new Promise(function (res, rej) {
            script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
            script.onreadystatechange = function () {
              if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null; //解除引用
                res();
              }
            };
          })
        }
      } else {
        return function (url) {
          return new Promise(function (res, rej) {
            script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
            script.onload = function () {
              res();
            };
          })
        }
      }
    })();
    loadJs('//cdn.jsdelivr.net/npm/valine')
      .then(function () {
        new Valine({
          appId: '1YGzAgOfmy3CDakvmRhWunLK-gzGzoHsz',
          appKey: 'KGVDBxvNhIHMdR8APxVlO09j',
          avatar: 'identicon',
          placeholder: '在这里评论吧！',
          notify: 'true',
          verify: 'true',
          highlight: 'true',
          avatarForce: 'false',
          visitor: 'true',
          recordIP: 'true',
          el: '#valine'
        });
      });
  })();
