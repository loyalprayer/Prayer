const CACHE_NAME = 'guanyin-prayer-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './state1.png', // ⚠️ 改成你的第一張圖檔名
  './state2.png', // ⚠️ 改成你的第二張圖檔名
  './state3.png'  // ⚠️ 改成你的第三張圖檔名
];

// 安裝時：把所有圖片跟網頁強制下載到手機深層快取裡
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 攔截請求：在電梯沒網路時，直接從手機快取拿圖片出來，秒開！
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});