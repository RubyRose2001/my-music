const version = '1.0.5';
const HREF = location.origin;
const dayaName = 'MY_MUSIC' + version;
console.log(1);
const file = [
  HREF + '/0.js',
  HREF +'/1.js',
  HREF + '/2.js',
  HREF + '/3.js',
  HREF + '/4.js',
  HREF + '/5.js',
  HREF + '/6.js',
  HREF + '/7.js',
  HREF + '/app.js',
]
console.log(1);
this.addEventListener('install', function (event) {
  self.skipWaiting()
  event.waitUntil(
    // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
    caches.open(dayaName).then(function (cache) {
      // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
      return cache.addAll(file);
    })
  );
});
self.addEventListener('activate', function (event) {
  // event.waitUntil(self.clients.claim());
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),
      // 清理旧版本
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== dayaName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});
this.addEventListener('fetch', function (event) {
  // console.log(navigator.onLine);
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function (response) {
      // 来来来，代理可以搞一些代理的事情
      // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
      const current = file.findIndex (v => v === event.request.url);
      if (response && current !== -1 && navigator.onLine) {
        return response;
      } else if (response && !navigator.onLine) {
        return response;
      } else if (response && event.request.headers.get('accept').includes('image/*')) {
        return response;
      }
      // if (response) {
      //   return response;
      // }
      // console.log(event.request.url, response);
      // 如果 service worker 没有返回，那就得直接请求真实远程服务
      var request = event.request.clone(); // 把原始请求拷过来
      return fetch(request).then(function (httpRes) {
        // http请求的返回已被抓到，可以处置了。
        // 请求失败了，直接返回失败的结果就好了。。
        var responseClone = httpRes.clone();
        // console.log(httpRes, event.request.url, event.request.headers.get('states'));        
        if ((!httpRes || httpRes.status !== 200) && !event.request.opaque) {
          return httpRes;
        }
        console.log(event.request.url, response)        
        // 请求成功的话，将请求缓存起来。
        caches.open(dayaName).then(function (cache) {
          if (httpRes && !event.request.headers.get('accept').includes('text/html')) {
            cache.put(event.request.url, responseClone);            
          }
        });
        return httpRes;
      });
    })
  );
});