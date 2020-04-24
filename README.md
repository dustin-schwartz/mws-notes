# Google Mobile Web Specialist Certification Notes
Here are my reference notes for the Google Mobile Web Specialist Certification test. These are mostly quick syntax references. A lot of super basic things that I don't have to use often, because of frameworks or plugins mostly.

## Resources

- [PWA Training Gitub](https://github.com/google-developer-training/pwa-training-labs)

## Legend

- [Basic website layout and styling](#basic-website-layout-and-styling)
- Front end networking
- Accessibility
- Progressive Web Apps
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

**Base html setup**

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

**[CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)**

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

**[Basic CSS Media Query](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)**

```css
@media screen and (min-width: 400px) {
  body {
    background-color: lightgreen;
  }
}
```

**[Responsive Image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)**

```html
<img srcset="img-480w.jpg 480w,
             img-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="img-800w.jpg"
     alt="Example Image">
```

### Performance optimization and caching

#### Web Workers

Has to be an external file. Message is used to pass data.

[Basic example from video.](https://github.com/dustin-schwartz/mws-notes#basic-website-layout-and-styling)

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