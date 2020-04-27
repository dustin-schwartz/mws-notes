# Google Mobile Web Specialist Certification Notes
Here are my reference notes for the Google Mobile Web Specialist Certification test. These are mostly quick syntax references. A lot of super basic things that I don't have to use often, because of frameworks or plugins mostly.

## Resources

- [Study Guide: Mobile Web Specialist Certification](https://developers.google.com/certification/mobile-web-specialist/study-guide)
- [PWA Training Gitub](https://github.com/google-developer-training/pwa-training-labs)
- [Yahya Elharony Guide](https://github.com/elharony/google-mobile-web-specialist-certification-guide)

## Legend

- [Basic website layout and styling](#basic-website-layout-and-styling)
- [Front end networking - Fetch](#front-end-networking)
- [Accessibility](#accessibility)
- [Progressive Web Apps](#progressive-web-apps)
- [Performance optimization and caching](#performance-optimization-and-caching)
    - [Web Workers](#web-workers)
- Testing and debugging
- ES2015 concepts and syntax
- Mobile web forms

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
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <meta charset="utf-8">
    <title>Basic Example</title>
    <link rel="stylesheet" href="styles/main.css">
  </head>
  <body>
  </body>
</html>
```

##### [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

```css
/* Autofit Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}
/* Grid Layout */
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px 1fr;
}
```
##### [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}
.item {
  flex: 1 1 fit-content;
}
```

##### [Basic CSS Media Query](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)

```css
@media screen and (min-width: 400px) {
  body {
    background-color: lightgreen;
  }
}
```

##### [Responsive Image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

```html
<img srcset="img-480w.jpg 480w,
             img-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="img-800w.jpg"
     alt="Example Image">
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

### Front end networking

##### [Fetch JSON](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#2)
```js
function fetchJSON() {
  fetch('examples/non-existent.json')
    .then(validateResponse)
    .then(logResult)
    .catch(logError);
}
```

##### [Head Request](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#5)
```js
function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}
```

##### [Post Form, No CORS](https://codelabs.developers.google.com/codelabs/pwa-fetch/index.html?index=..%2F..dev-pwa-training#7)
```js
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5001/', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
    .then(logResult)
    .catch(logError);
}
```

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

### Performance optimization and caching

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