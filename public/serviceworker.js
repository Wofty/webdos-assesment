// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'my-site-v1';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/',
  'cssdemo.css',
  'cssdemo.html',
  'demos.html',
  'holding.html',
  'index.html',
  'qualifications.html',
  'interest.html',
  'styles.css',
  'icons/manifest.json',
  '404.html',
  //incons folder
  "icons/browserconfig.xml",
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-16x16.png',
  'icons/favicon-32x32.png',
  'icons/favicon.ico',
  'icons/mstile-70x70.png',
  'icons/mstile-144x144.png',
  'icons/mstile-150x150.png',
  'icons/mstile-310x150.png',
  'icons/mstile-310x310.png',

  //images folder

  "images/icons8-github.svg",
  "images/icons8-linkedin.svg",
  "images/icons8-twitter.svg",

  "images/star-600x121.jpg",
  "images/star-300.webp",
  "images/star-600.webp",
  "images/star-1200.webp",






  //images/avatar subfolder
  'images/avatar/300-avatar.webp',
  'images/avatar/500-avatar.webp',
  'images/avatar/700-avatar.webp',


  //images/background subfolder
  'images/background/binary.svg',


  //images/cssdemo_img subfolder
  'images/cssdemo_img/300xhtml.jpg',
  'images/cssdemo_img/300xhtml.webp',
  'images/cssdemo_img/600xhtml.webp',
  'images/cssdemo_img/832xhtml.webp',
  'images/cssdemo_img/html-css.png',














  'images/logo/sm_logo.svg',


  // add all your images in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
