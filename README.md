# Google Mobile Web Specialist Certification Notes
Here are my reference notes for the Google Mobile Web Specialist Certification test. These are mostly quick syntax references. A lot of super basic things that I don't have to use often, because of frameworks or plugins mostly.

## Resources

- [Mobile Web Specialist Home](https://developers.google.com/certification/mobile-web-specialist)
- [Study Guide: Mobile Web Specialist Certification](https://developers.google.com/certification/mobile-web-specialist/study-guide)
- [PWA Training Gitub](https://github.com/google-developer-training/pwa-training-labs)
- [Yahya Elharony Guide](https://github.com/elharony/google-mobile-web-specialist-certification-guide)

## Legend

- [Basic website layout and styling](#basic-website-layout-and-styling)
- [Front end networking - Fetch](#front-end-networking)
- [Accessibility](#accessibility)
- [Progressive Web Apps](#progressive-web-apps)
    - [Workbox](#workbox)
    - [Service Worker](#service-worker)
- [Performance optimization and caching](#performance-optimization-and-caching)
    - [IndexDB API](#indexdb-api)
    - [Resource Prioritization](#resource-prioritization)
    - [Web Workers](#web-workers)
- Testing and debugging
- [ES2015 concepts and syntax](#es2015)
    - [Promises](#promises)
- [Mobile web forms](#mobile-web-forms)

## Notes

### To Learn

- Fetch image from different domain, cors and get response.
- Setup service worker to cache shell files and make offline accessible. Get from cache first, only network if no cache.
- With SPA have service worker show 404 page on error.
- Basically all these things [service worker](https://developers.google.com/certification/mobile-web-specialist/study-guide/pwas).
- IndexAPI save form data and fill in form in future.
- Create web worker to run complicated computation, then return result.
- Add skip navigation button using tab for accessibility.
- Make inline links accessible.
- Inline critical css. [Example](https://web.dev/defer-non-critical-css/)
- Inline JavaScript files for initial rendering only where necessary (or otherwise eliminated, deferred, or marked as async)

### Did

- Use CSS media queries.
- Use video tag with file type fallbacks.
- Make button play and pause video.
- Used picture tag for specific image sizes at specific sizes.
- Render fetch data to page.
- Handle fetch errors.
- Preload resource heavy next page assets.
- Form best practices.
    - Add datalist to input.
    - Add labels to inputs.
    - Add appropriate type, name, pattern(regex), maxlength, and autocomplete attributes.

## Study Guide Sections

### Basic website layout and styling

**Get elements with vanilla js.**

```js
const element = document.getElementById('id');
const elements = document.getElementsByClassName('class');
```

##### Base html setup

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>Basic Example</title>
    <link rel="stylesheet" href="styles/main.css">
  </head>
  <body>
  </body>
</html>
```

##### CSS

- [Basic Examples](basic-layout/styles.css)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Basic CSS Media Query](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)


##### [Responsive Image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

Srcset & Sizes
```html
<img srcset="img-480w.jpg 480w,
             img-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="img-800w.jpg"
     alt="Example Image">
```

Picture
```html
<picture>
    <source media="(max-width: 799px)" srcset="example-480w-portrait.jpg">
    <source media="(min-width: 800px)" srcset="example-800w.jpg">
    <img src="example-800w.jpg" alt="Example">
</picture>
```

##### [Video Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

```html
<!-- Single Source -->
<video src="file.mp4" type="video/mp4" height="600" width="800" poster="image.png" preload="auto" controls autoplay muted loop />
<!-- Mulitple Source -->
<video controls>
    <source src="video.mp4" type="video/mp4" />
    <source src="video.avi" type="video/avi"/>
</video>
```

##### [Audio Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

```html
<figure>
    <figcaption>Listen to the T-Rex:</figcaption>
    <audio
        controls
        src="/media/examples/t-rex-roar.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>
```

##### [Touch](https://developers.google.com/web/fundamentals/design-and-ux/input/touch)

Touch CSS
```css
.btn {
  background-color: #4285f4;
}

.btn:hover {
  background-color: #296CDB;
}

.btn:focus {
  background-color: #0F52C1;

  /* The outline parameter suppresses the border
  color / outline when focused */
  outline: 0;
}

.btn:active {
  background-color: #0039A8;
}
```

Event Listeners
```js
// Check if pointer events are supported.
if (window.PointerEvent) {
  // Add Pointer Event Listener
  swipeFrontElement.addEventListener('pointerdown', this.handleGestureStart, true);
  swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
  swipeFrontElement.addEventListener('pointerup', this.handleGestureEnd, true);
  swipeFrontElement.addEventListener('pointercancel', this.handleGestureEnd, true);
} else {
  // Add Touch Listener
  swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
  swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
  swipeFrontElement.addEventListener('touchend', this.handleGestureEnd, true);
  swipeFrontElement.addEventListener('touchcancel', this.handleGestureEnd, true);

  // Add Mouse Listener
  swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
}
```

### Front end networking

- [Examples](front-end-networking/scripts.js)
- [Fetch JSON](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#2)
- [Head Request](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#5)
- [Post Form, No CORS](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#7)

### Accessibility

##### ARIA

- [ARIA Docs](https://developers.google.com/web/fundamentals/accessibility/semantics-aria)
- [aria-live="off/polite/assertive"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

##### [Skip Navigation](https://webaim.org/techniques/skipnav/)

```html
<a href="#maincontent">Skip to main content</a>
```

### Progressive Web Apps

#### Service Worker

Register service worker.
```js
// Script to register the service worker goes here
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('SW registered with scope:', registration.scope);
    })
    .catch(err => {
      console.error('Registration failed:', err);
    });

    // Set scope for service worker
    // navigator.serviceWorker.register('/service-worker.js', {
    //   scope: '/kitten/'
    // });
  });
}
```

Install and activate service worker in sw.js.
```js
self.addEventListener('install', event => {
    
    // Will automatically activate the new service worker whenever present
    self.skipWaiting();

    console.log('Service worker installing...');
    // Add a call to skipWaiting here
});
  
self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});
```

Cache files and show offline page if offline.
```js
const filesToCache = [
  '/',
  'style/main.css',
  'images/still_life_medium.jpg',
  'index.html',
  'pages/offline.html',
  'pages/404.html'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
      .then(response => {
        if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return caches.open(staticCacheName)
        .then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    }).catch(error => {
      // Show offline page
      console.log('Error, ', error);
      return caches.match('pages/offline.html');
    })
  );
});
```

#### Web App Shell

##### Manifest.json
```json
{
  "name": "Space Missions",
  "short_name": "Space Missions",
  "lang": "en-US",
  "start_url": "/index.html",
  "display": "standalone",
  "theme_color": "#FF9800",
  "background_color": "#FF9800",
  "icons": [
    {
      "src": "images/touch/icon-128x128.png",
      "sizes": "128x128"
    },
    {
      "src": "images/touch/icon-192x192.png",
      "sizes": "192x192"
    },
    {
      "src": "images/touch/icon-256x256.png",
      "sizes": "256x256"
    },
    {
      "src": "images/touch/icon-384x384.png",
      "sizes": "384x384"
    },
    {
      "src": "images/touch/icon-512x512.png",
      "sizes": "512x512"
    }
  ]
}
```

##### Head Tags
```html
<link rel="manifest" href="manifest.json">

<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="application-name" content="Space Missions">
<meta name="apple-mobile-web-app-title" content="Space Missions">
<meta name="theme-color" content="#FF9800">
<meta name="msapplication-navbutton-color" content="#FF9800">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="msapplication-starturl" content="/index.html">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="icon" sizes="128x128" href="/images/touch/icon-128x128.png">
<link rel="apple-touch-icon" sizes="128x128" href="/images/touch/icon-128x128.png">
<link rel="icon" sizes="192x192" href="icon-192x192.png">
<link rel="apple-touch-icon" sizes="192x192" href="/images/touch/icon-192x192.png">
<link rel="icon" sizes="256x256" href="/images/touch/icon-256x256.png">
<link rel="apple-touch-icon" sizes="256x256" href="/images/touch/icon-256x256.png">
<link rel="icon" sizes="384x384" href="/images/touch/icon-384x384.png">
<link rel="apple-touch-icon" sizes="384x384" href="/images/touch/icon-384x384.png">
<link rel="icon" sizes="512x512" href="/images/touch/icon-512x512.png">
<link rel="apple-touch-icon" sizes="512x512" href="/images/touch/icon-512x512.png">
```

##### Cache App Shell

Manually
```js
var cacheName = 'shell-content';
var filesToCache = [
  '/css/styles.css',
  '/js/scripts.js',
  '/images/logo.svg',

  '/offline.html',

  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

Pre-Cache
```js
gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});
```

#### [Workbox](https://developers.google.com/web/tools/workbox)

```js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
  /(.*)articles(.*)\.(?:png|gif|jpg)/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })

  workbox.routing.registerRoute(
    /(.*)icon(.*)/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'icon-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 5,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );
);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
```

##### Build manifest with gulp
```js
const buildSw = () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.css',
      'index.html',
      'js\/animation.js',
      'images\/home\/*.jpg',
      'images\/icon\/*.svg',
      'pages/offline.html',
      'pages/404.html'
    ]
  }).then(resources => {
    console.log(`Injected ${resources.count} resources for precaching, ` +
        `totaling ${resources.size} bytes.`);
  }).catch(err => {
    console.log('Uh oh 😬', err);
  });
}
gulp.task('build-sw', buildSw);
```

##### Network First
```js
const articleHandler = workbox.strategies.networkFirst({
  cacheName: 'articles-cache',
  plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 50,
    })
  ]
});

workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
  return articleHandler.handle(args);
});
```

### Performance optimization and caching

#### IndexDB API

- [Google PWA Example](https://codelabs.developers.google.com/codelabs/pwa-indexed-db/index.html?index=..%2F..dev-pwa-training#3)
- [IndexDB Library](https://github.com/jakearchibald/idb)
- [createObjectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore)

// Basic example
```js
// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // Handle errors.
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };
};
```

#### [Resource Prioritization](https://developers.google.com/web/fundamentals/performance/resource-prioritization)
In general, try to use preload wherever you can, as it’s a more comprehensive performance tweak, but do keep preconnect in your toolbelt for the edge cases. Let’s look at a couple of them.

Preload Resources - Critical Path CSS and JavaScript
```html
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
<link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
```

Preconnect - Informs the browser that your page intends to establish a connection to another origin, and that you’d like the process to start as soon as possible. Use dns-prefetch as fallback, less effective but better support.
```html
<link rel="preconnect" href="https://example.com">
```

Prefetch - Resources the user doesn't need yet, but probably will soon.
```html
<link rel="prefetch" href="page-2.html">
```

#### Web Workers

Has to be an external file. Message is used to pass data.

[Basic example from video.](https://github.com/GoogleChromeLabs/ui-element-samples/tree/gh-pages/web-workers)

```js
/* Set and use worker */
const worker = new Worker('worker.js');
worker.postMessage(imageData, [imageData.data.buffer]); // first value is the data, second transfers ownership (must be array)
worker.addEventListener('message', (d) => {
  const imageData = d.data;
});
/* Worker file */
addEventListener('message', (d) => {
  const imageData = d.data;
  postMessage(imageData, [imageData.data.buffer])
});
```

### ES2015

#### Promises

Example Fucntion
```js
function getImageName(country) {
  country = country.toLowerCase();
  const promiseOfImageName = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (country === 'spain' || country === 'chile' || country === 'peru') {
        resolve(country + '.png');
      } else {
        reject(Error('Didn\'t receive a valid country name!'));
      }
    }, 1000);
  });
  console.log(promiseOfImageName);
  return promiseOfImageName;    
}
```

Then/Catch Example
```js
var jsonPromise = new Promise(function(resolve, reject) {
  // JSON.parse throws an error if you feed it some
  // invalid JSON, so this implicitly rejects:
  resolve(JSON.parse("This ain't JSON"));
});

jsonPromise.then(function(data) {
  // This never happens:
  console.log("It worked!", data);
}).catch(function(err) {
  // Instead, this happens:
  console.log("It failed!", err);
})
```

##### Signature	Description
- Promise.resolve(promise); -	Returns promise (only if promise.constructor == Promise)
- Promise.resolve(thenable); -	Make a new promise from the thenable. A thenable is promise-like in as far as it has a `then()` method.
- Promise.resolve(obj); -	Make a promise that fulfills to obj. in this situation.
- Promise.reject(obj); -	Make a promise that rejects to obj. For consistency and debugging (e.g. stack traces), obj should be an instanceof Error.
- Promise.all(array); -	Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects. Each array item is passed to Promise.resolve, so the array can be a mixture of promise-like objects and other objects. The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
- Promise.race(array); - Make a Promise that fulfills as soon as any item fulfills, or rejects as soon as any item rejects, whichever happens first.

### Mobile Web Forms

[Forms Info](https://developers.google.com/web/fundamentals/design-and-ux/input/forms)

- [HTML5 Inputs](https://developers.google.com/web/fundamentals/design-and-ux/input/forms#html5_input_types)
- [Sample Form](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html)

##### Example
```html
<form role="form">
  <fieldset>
    <legend>Contact Info</legend>

      <label for="frmFullName">Full Name</label>
      <input type="text" name="name" id="frmFullName" placeholder="Full Name" required autocomplete="name" pattern="[A-Za-z]+">

      <label for="frmEmail">Email</label>
      <input type="email" name="email" id="frmEmail" placeholder="name@example.com" required autocomplete="email">

      <label for="frmPhone">Phone</label>
      <input type="tel" name="phone" id="frmPhone" placeholder="+1-555-555-1212" required autocomplete="tel">
  </fieldset>

  <fieldset>
    <legend>Other Info</legend>

    <label for="frmBirthday">Birthday</label>
    <input type="datetime-local" name="birthday" id="frmBirthday">

    <label for="frmFavColor">Favorite Color</label>
    <input type="text" name="fav-color" id="frmFavColor" list="frmColorList">
    <datalist id="frmColorList">
      <option value="blue">
      <option value="red">
      <option value="green">
    </datalist>
  </fieldset>

  <button>Submit</button>
</form>
<style>
input:not(:focus):invalid {
  background-color: #FFD9D9;
}
input:not(:focus):valid {
  background-color: #D9FFD9;
}
</style>
```
